import { templatesAPI } from "../../api/api";
import {
  SET_TEMPLATES,
  SET_TOTAL_PAGES,
  SET_SEARCH,
  SET_PAGE,
  TOGGLE_IS_FETCHING,
  TemplateState,
  TemplateAction,
  SetTemplatesAction,
  SetTotalPagesAction,
  SetSearchAction,
  SetPageAction,
  ToggleIsFetchingAction,
  Template,
} from "../../types/templates.types";

const initialState: TemplateState = {
  search: "",
  page: 1,
  totalPages: 1,
  items: [],
  isFetching: false,
};

export const templatesReducer = (
  state = initialState,
  action: TemplateAction
): TemplateState => {
  switch (action.type) {
    case SET_TEMPLATES:
      return { ...state, items: action.templates };
    case SET_TOTAL_PAGES:
      return { ...state, totalPages: action.totalPages };
    case SET_SEARCH:
      return { ...state, search: action.search };
    case SET_PAGE:
      return { ...state, page: action.page };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    default:
      return state;
  }
};

// Action Creators
export const setTemplates = (
  templates: Array<Template>
): SetTemplatesAction => ({
  type: SET_TEMPLATES,
  templates,
});

export const setTotalPages = (totalPages: number): SetTotalPagesAction => ({
  type: SET_TOTAL_PAGES,
  totalPages,
});

export const setSearch = (search: string): SetSearchAction => ({
  type: SET_SEARCH,
  search,
});

export const setPage = (page: number): SetPageAction => ({
  type: SET_PAGE,
  page,
});

export const setToggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingAction => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

// Thunk Action
export const getTemplates =
  (page: number, search: string) => async (dispatch: any) => {
    dispatch(setToggleIsFetching(true));
    const data = await templatesAPI.getTemplates(page, search);
    dispatch(setTemplates(data.templates));
    dispatch(setTotalPages(data.totalPages));
    dispatch(setPage(data.currentPage));
    dispatch(setToggleIsFetching(false));
  };

export const addTemplate = () => async (dispatch: any) => {
  dispatch(setToggleIsFetching(true));
  try {
    const data = await templatesAPI.addTemplate();
    const templateId = data.template.id;

    dispatch(setToggleIsFetching(false));
    return templateId;
  } catch (error) {
    dispatch(setToggleIsFetching(false));
    throw error;
  }
};

export default templatesReducer;
