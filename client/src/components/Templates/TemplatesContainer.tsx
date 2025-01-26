import { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { useLocation } from "react-router-dom";
import {
    getTemplates,
    setPage,
    setTemplates,
    setSearch,
    setToggleIsFetching,
} from "../../redux/reducers/templatesReducer.ts";
import Preloader from "../common/Preloader/Preloader.js";
import Templates from './Templates.tsx';

function TemplatesContainer({
    page,
    totalPages,
    search,
    templates,
    isFetching,
    getTemplates,
    setSearch,
}) {
    const location = useLocation();
    const searchTimeout = useRef(null);
    const prevPage = useRef();
    const prevSearch = useRef();

    useEffect(() => {
        const { page, search } = parseUrlParams();
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

    const parseUrlParams = () => {
        const queryString = location.search;
        const urlParams = new URLSearchParams(queryString);
        const page = urlParams.get("page");
        const searchFromUrl = urlParams.get("search");

        if (searchFromUrl !== null) setSearch(searchFromUrl);

        return { page, search: searchFromUrl };
    };

    const onPageChanged = (page: Number) => {
        getTemplates(page, search);
        const container = document.querySelector(".scroll-container");
        if (container) container.scrollTo(0, 0);
    };

    const onSearch = (page: Number, search: String) => {
        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }
        setSearch(search);
        searchTimeout.current = setTimeout(() => {
            getTemplates(page, search);
        }, 500);
    };

    const onAddNewTemplate = () => {
        
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

let mapStateToProps = (state) => {
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
    })
)(TemplatesContainer);
