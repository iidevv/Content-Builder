import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import Templates from "./Templates";
import {
    addTemplate,
    getTemplates,
    setSearch,
} from "../../redux/reducers/templatesSlice";

const TemplatesContainer = () => {
    const dispatch = useDispatch<typeof store.dispatch>();
    const location = useLocation();
    const searchTimeout = useRef<null | ReturnType<typeof setTimeout>>(null);

    const { templates, page, search, isFetching } = useSelector(
        (state) => state.templates
    );

    useEffect(() => {
        const { page, search } = parseUrlParams();
        dispatch(getTemplates({ page, search }));
    }, [location, dispatch]);

    useEffect(() => {
        const newUrl = `${window.location.origin}${window.location.pathname}?page=${page}&search=${search}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
    }, [page, search]);

    const parseUrlParams = () => {
        const queryString = location.search;
        const urlParams = new URLSearchParams(queryString);
        const page = urlParams.get("page") || 1;
        const searchFromUrl = urlParams.get("search") || "";

        if (searchFromUrl !== null) dispatch(setSearch(searchFromUrl));

        return { page: Number(page), search: searchFromUrl };
    };

    const onPageChanged = (page: string) => {
        dispatch(getTemplates({ page, search }));
        const container = document.querySelector(".scroll-container");
        if (container) container.scrollTo(0, 0);
    };

    const onSearch = (search: string) => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        dispatch(setSearch(search));
        searchTimeout.current = setTimeout(() => {
            dispatch(getTemplates({ page: 1, search }));
        }, 500);
    };

    const onAddNewTemplate = () => {
        dispatch(addTemplate());
    }

    return (
        <div>
            {isFetching ? <Preloader /> : null}
            <Templates
                templates={templates}
                page={page}
                search={search}
                onPageChanged={onPageChanged}
                onSearch={onSearch}
                onAddNewTemplate={onAddNewTemplate}
            />
        </div>
    );
};

export default TemplatesContainer;