import { templateAPI } from "../../api/api";

export const templatesReducer = (
  state = initialState,
  action: TemplateAction
): TemplateState => {
  switch (action.type) {
    case SET_TEMPLATES:
      return { ...state, templates: action.templates };
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

export const setTemplate = (template: Template): SetTemplateAction => ({
  type: SET_TEMPLATE,
  template,
});

export const setToggleIsFetching = (
  isFetching: boolean
): ToggleIsFetchingAction => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

export const setTemplate = (template) => {

}

// Thunk Action
export const getTemplates = () => async (dispatch: any) => {
  dispatch(setToggleIsFetching(true));
  const data = await templateAPI.addTemplate();
  dispatch(setTemplate(data.template));
  dispatch(setToggleIsFetching(false));
};

export default templatesReducer;
