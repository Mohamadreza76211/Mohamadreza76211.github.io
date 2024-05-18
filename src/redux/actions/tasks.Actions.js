//Redux Action
export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const EDIT_TASK = "EDIT_TASK";
export const MARK_TASK_AS_DONE = "MARK_TASK_AS_DONE";

export const addTask = (task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (index) => ({
  type: DELETE_TASK,
  payload: index,
});

export const editTask = (index, newValue) => ({
  type: EDIT_TASK,
  payload: { index, newValue },
});

export const markTaskAsDone = (index) => ({
  type: MARK_TASK_AS_DONE,
  payload: index,
});

export const OPEN_REMINDER_MODAL = "OPEN_REMINDER_MODAL";

export const openReminderModal = (index) => ({
  type: OPEN_REMINDER_MODAL,
  payload: index,
});
