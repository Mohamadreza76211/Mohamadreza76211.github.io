import {
  ADD_TASK,
  DELETE_TASK,
  EDIT_TASK,
  MARK_TASK_AS_DONE,
} from "../actions/tasks.Actions";

const initialState = {
  tasks: [],
};

const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { ...action.payload, isDone: false }],
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter((_, i) => i !== action.payload),
      };
    case EDIT_TASK:
      const { index, newValue } = action.payload;
      const updatedTasks = [...state.tasks];
      updatedTasks[index] = newValue;
      return {
        ...state,
        tasks: updatedTasks,
      };
    case MARK_TASK_AS_DONE:
      return {
        ...state,
        tasks: state.tasks.map((task, index) =>
          index === action.payload ? { ...task, isDone: true } : task
        ),
      };
    default:
      return state;
  }
};

export default tasksReducer;
