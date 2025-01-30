import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import Templates from "./Templates";
import {
    getTemplates,
    setSearch,
} from "../../redux/reducers/templatesSlice";

const TemplatesContainer = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const searchTimeout = useRef(null);

    // Select state from Redux store
    const { templates, meta, search, isFetching } = useSelector(
        (state) => state.templates
    );

    // Parse URL params and fetch templates on mount or URL change
    useEffect(() => {
        const { page, search } = parseUrlParams();
        dispatch(getTemplates({ page, search }));
    }, [location, dispatch]);

    // Update URL when meta or search changes
    useEffect(() => {
        const newUrl = `${window.location.origin}${window.location.pathname}?page=${meta.current}&search=${search}`;
        window.history.pushState({ path: newUrl }, "", newUrl);
    }, [meta, search]);

    // Parse URL params
    const parseUrlParams = () => {
        const queryString = location.search;
        const urlParams = new URLSearchParams(queryString);
        const page = urlParams.get("page") || 1;
        const searchFromUrl = urlParams.get("search") || "";

        if (searchFromUrl !== null) dispatch(setSearch(searchFromUrl));

        return { page: Number(page), search: searchFromUrl };
    };

    // Handle page change
    const onPageChanged = (page) => {
        dispatch(getTemplates({ page, search }));
        const container = document.querySelector(".scroll-container");
        if (container) container.scrollTo(0, 0);
    };

    // Handle search with debounce
    const onSearch = (search) => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        dispatch(setSearch(search));
        searchTimeout.current = setTimeout(() => {
            dispatch(getTemplates({ page: 1, search }));
        }, 500);
    };

    return (
        <div>
            {isFetching ? <Preloader /> : null}
            <Templates
                templates={templates}
                meta={meta}
                search={search}
                onPageChanged={onPageChanged}
                onSearch={onSearch}
            />
        </div>
    );
};

export default TemplatesContainer;