import { configureStore } from "@reduxjs/toolkit";
import templatesReducer from "./reducers/templates/templatesSlice";
import userReducer from "./reducers/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    templates: templatesReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
