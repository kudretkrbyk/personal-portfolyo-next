import { configureStore } from "@reduxjs/toolkit";
import { projectApi } from "./src/services/projectApi";
import { contactApi } from "./src/services/contactApi";
import { blogApi } from "./src/services/blogApi";
import authReducer from "./src/services/auth/authSlice";
import themeReducer from "./src/slices/themeSlice"; // varsayalım ayrı dosyada

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    [projectApi.reducerPath]: projectApi.reducer,
    [contactApi.reducerPath]: contactApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(projectApi.middleware)
      .concat(contactApi.middleware)
      .concat(blogApi.middleware),
});
export default store;
