import { combineReducers } from "redux";
import TemplatesReducer from "./TemplatesReducer";

export default combineReducers({
  templates: TemplatesReducer,
});
