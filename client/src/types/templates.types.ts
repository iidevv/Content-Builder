export const SET_TEMPLATES = "SET_TEMPLATES";
export const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
export const SET_SEARCH = "SET_SEARCH";
export const SET_PAGE = "SET_PAGE";
export const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";

export interface TemplateState {
  search: string;
  page: number;
  totalPages: number;
  items: Array<Template>;
  isFetching: boolean;
}

export interface SetTemplatesAction {
  type: typeof SET_TEMPLATES;
  templates: Array<Template>;
}

export interface SetTotalPagesAction {
  type: typeof SET_TOTAL_PAGES;
  totalPages: number;
}

export interface SetSearchAction {
  type: typeof SET_SEARCH;
  search: string;
}

export interface SetPageAction {
  type: typeof SET_PAGE;
  page: number;
}

export interface ToggleIsFetchingAction {
  type: typeof TOGGLE_IS_FETCHING;
  isFetching: boolean;
}

export type TemplateAction =
  | SetTemplatesAction
  | SetTotalPagesAction
  | SetSearchAction
  | SetPageAction
  | ToggleIsFetchingAction;


export interface Template {
  id: number;
  name: string;
}

export interface State {
    templates: {
        items: Array<Template>;
        search: string;
        page: number;
        totalPages: number;
        isFetching: boolean;
    };
}

export interface TemplatesContainerProps {
  page: number;
  totalPages: number;
  search: string;
  templates: Array<Template>;
  isFetching: boolean;
  getTemplates: (page: number, search: string) => void;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
}
