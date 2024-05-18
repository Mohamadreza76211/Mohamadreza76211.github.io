import { createStore } from "redux";
import tasksReducer from "./reducers/tasksReducers";

const store = createStore(tasksReducer);

export default store;
