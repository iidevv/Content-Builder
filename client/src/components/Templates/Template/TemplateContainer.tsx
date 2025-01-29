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
import Preloader from "../../common/Preloader/Preloader.js";
import Template from "./Template.tsx";


function TemplateContainer({
    page,
    totalPages,
    search,
    templates,
    isFetching,
    getTemplates,
    setSearch,
}: TemplatesContainerProps) {
    

    return (
        <div>
            {isFetching ? <Preloader /> : null}
            <Template />
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
    })
)(TemplateContainer);
