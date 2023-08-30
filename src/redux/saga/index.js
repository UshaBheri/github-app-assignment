import { all } from "redux-saga/effects";
import { sagaRepo } from "./sagaRepo";
import { sagaActivity } from "./sagaActivity";

export default function* rootSaga() {
  yield all([sagaRepo(), sagaActivity()]);
}
