import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import repoSlice from "./slice/repoSlice";
import activitySlice from "./slice/activitySlice";
import rootSaga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    repos: repoSlice,
    activity: activitySlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export default store;
