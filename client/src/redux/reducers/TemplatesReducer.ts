import { templatesAPI } from "../../api/index";

const SET_TEMPLATES = "SET_TEMPLATES";
const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
const SET_SEARCH = "SET_SEARCH";
const SET_PAGE = "SET_PAGE";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  search: "",
  page: 1,
  totalPages: 1,
  templates: [],
  isFetching: true,
};

const templatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMPLATES:
      return {
        ...state,
        templates: [...action.templates],
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        meta: action.totalPages,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.search,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case TOGGLE_IS_FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    default:
      return state;
  }
};

export const setTemplates = (templates) => {
  return {
    type: SET_TEMPLATES,
    templates,
  };
};

export const setTotalPages = (totalPages) => {
  return {
    type: SET_TOTAL_PAGES,
    totalPages,
  };
};

export const setSearch = (search) => {
  return {
    type: SET_SEARCH,
    search,
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

export const setToggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  };
};

export const getTemplates = (page, search) => {
  return (dispatch) => {
    dispatch(setToggleIsFetching(true));
    templatesAPI.getTemplates(page, search).then((data) => {
      dispatch(setTemplates(data.templates));
      dispatch(setTotalPages(data.totalPages));
      dispatch(setPage(page));
      dispatch(setToggleIsFetching(false));
    });
  };
};

export default templatesReducer;
