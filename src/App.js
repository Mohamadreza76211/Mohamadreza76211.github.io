import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // تغییر اینجا
import { Provider } from "react-redux";
import store from "./redux/store";
import TodoList from "./components/TodoList";
import DoneTasksPage from "./components/DoneTasksPage";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          {" "}
          <Route path="/" element={<TodoList />} />
          <Route path="/done-tasks" element={<DoneTasksPage />} />{" "}
        </Routes>{" "}
      </Router>
    </Provider>
  );
}

export default App;
