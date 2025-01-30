import { configureStore } from "@reduxjs/toolkit";
import templatesReducer from './reducers/templatesSlice';

const store = configureStore({
  reducer: {
    templates: templatesReducer,
  }
});

export default store;
