import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
    getTemplates,
    setPage,
    setTemplates,
    setSearch,
    setToggleIsFetching,
    addTemplate
} from "../../redux/reducers/templatesReducer.ts";
import Preloader from "../common/Preloader/Preloader.js";
import Templates from './Templates.tsx';
import { State, TemplatesContainerProps } from "../../types/templates.types.ts";


function TemplatesContainer({
    page,
    totalPages,
    search,
    templates,
    isFetching,
    getTemplates,
    setSearch,
    addTemplate
}: TemplatesContainerProps) {
    const location = useLocation();
    const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const prevPage = useRef<number | undefined>(undefined);
    const prevSearch = useRef<string | undefined>(undefined);
    const navigate = useNavigate();

    useEffect(() => {
        const { page, search } = parseUrlParams();
        setSearch(search);
        getTemplates(page, search);
    }, [location]);

    useEffect(() => {
        if (page !== prevPage.current || search !== prevSearch.current) {
            const newUrl = `${window.location.origin}${window.location.pathname}?page=${page}&search=${search}`;
            window.history.pushState({ path: newUrl }, "", newUrl);
        }

        prevPage.current = page;
        prevSearch.current = search;
    }, [page, search]);

    const parseUrlParams = (): { page: number; search: string } => {
        const urlParams = new URLSearchParams(location.search);

        const search = urlParams.get("search") || "";
        const page = parseInt(urlParams.get("page") || "1", 10);

        return {
            page,
            search,
        };
    };

    const onPageChanged = (page: number) => {
        getTemplates(page, search);
        const container = document.querySelector(".scroll-container");
        if (container) container.scrollTo(0, 0);
    };

    const onSearch = (page: number, search: string) => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        setSearch(search);
        searchTimeout.current = setTimeout(() => {
            getTemplates(page, search);
        }, 500);
    };

    const onAddNewTemplate = async () => {
        try {
            const newTemplateId = await addTemplate();
            if (newTemplateId) {
                navigate(`/templates/${newTemplateId}`);
            }
        } catch (error) {
            console.error("Failed:", error);
        }
    }

    return (
        <div>
            {isFetching ? <Preloader /> : null}
            <Templates
                templates={templates}
                totalPages={totalPages}
                search={search}
                onPageChanged={onPageChanged}
                onAddNewTemplate={onAddNewTemplate}
                onSearch={onSearch}
            />
        </div>
    );
}

let mapStateToProps = (state: State) => {
    return {
        templates: state.templates.items,
        search: state.templates.search,
        page: state.templates.page,
        totalPages: state.templates.totalPages,
        isFetching: state.templates.isFetching,
    };
};

export default compose(
    connect(mapStateToProps, {
        getTemplates,
        setTemplates,
        setSearch,
        setPage,
        setToggleIsFetching,
        addTemplate
    })
)(TemplatesContainer);
