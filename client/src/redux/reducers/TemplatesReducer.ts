import { templatesAPI } from "../../api/index";

const SET_TEMPLATES = "SET_TEMPLATES";
const SET_META = "SET_META";
const SET_SEARCH = "SET_SEARCH";
const SET_OFFSET = "SET_OFFSET";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

let initialState = {
  search: "",
  offset: 0,
  templates: [],
  meta: {
    current: "",
    next: "",
    prev: "",
    total: null,
  },
  isFetching: true,
};

const TemplatesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TEMPLATES:
      return {
        ...state,
        templates: [...action.templates],
      };
    case SET_META:
      return {
        ...state,
        meta: action.meta,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.search,
      };
    case SET_OFFSET:
      return {
        ...state,
        offset: action.offset,
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

export const setMeta = (meta) => {
  return {
    type: SET_META,
    meta,
  };
};

export const setSearch = (search) => {
  return {
    type: SET_SEARCH,
    search,
  };
};

export const setOffset = (offset) => {
  return {
    type: SET_OFFSET,
    offset,
  };
};

export const setToggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching,
  };
};

export const getTemplates = (offset, search) => {
  return (dispatch) => {
    dispatch(setToggleIsFetching(true));
    templatesAPI.getTemplates(offset, search).then((data) => {
      dispatch(setTemplates(data.data));
      dispatch(setMeta(data.meta));
      dispatch(setOffset(offset));
      dispatch(setToggleIsFetching(false));
    });
  };
};

export default TemplatesReducer;
