import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  addTask,
  deleteTask,
  editTask,
  markTaskAsDone,
} from "../redux/actions/tasks.Actions";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCheck,
  faTimes,
  faEdit,
  faAdd,
  faBook,
  faClock,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import "./TodoList.scss";

function TodoList({ tasks, addTask, deleteTask, editTask, markTaskAsDone }) {
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [isCheckBoxChecked, setIsCheckBoxChecked] = useState(
    Array(tasks.length).fill(false)
  );
  const [reminderDateTime, setReminderDateTime] = useState(null);
  const [openReminderModal, setOpenReminderModal] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [dialogTask, setDialogTask] = useState("");
  const maxLength = 140;

  const currentDate = new Date().toLocaleString();
  const formattedReminderDateTime = dayjs(reminderDateTime).format(
    "YYYY-MM-DD HH:mm:ss"
  );

  useEffect(() => {
    const interval = setInterval(() => {
      tasks.forEach((task, index) => {
        if (
          task.reminderDateTime === formattedReminderDateTime &&
          !isAlertVisible
        ) {
          setDialogTask(task.task);
          setIsAlertVisible(true);
        }
      });
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [tasks, formattedReminderDateTime, isAlertVisible]);

  useEffect(() => {
    const tasksWithIndex = tasks.map((task, index) => ({ ...task, index }));
    localStorage.setItem("tasks", JSON.stringify(tasksWithIndex));
  }, [tasks]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setInputValue(value);
    }
  };

  const handleAddTask = () => {
    if (inputValue.trim() !== "") {
      addTask({
        task: inputValue,
        createdAt: currentDate,
        reminderDateTime: null,
      });
    } else {
      alert("please enter your task!");
    }
    setInputValue("");
  };

  const handleEditButton = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const handleSaveButton = (index) => {
    const editedTask = {
      ...tasks[index],
      task: editValue,
    };
    editTask(index, editedTask);
    setEditIndex(null);
  };

  const handleDiscardButton = () => {
    setEditIndex(null);
    setEditValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleCheckBoxChange = (e, index) => {
    const newChecked = [...isCheckBoxChecked];
    newChecked[index] = e.target.checked;
    setIsCheckBoxChecked(newChecked);
  };

  const handleReminderModalOpen = (index) => {
    setSelectedTaskIndex(index);
    setOpenReminderModal(true);
  };

  const handleReminderModalClose = () => {
    setOpenReminderModal(false);
  };

  const handleSetReminder = () => {
    editTask(selectedTaskIndex, {
      ...tasks[selectedTaskIndex],
      reminderDateTime: formattedReminderDateTime,
    });
    setOpenReminderModal(false);
    setIsAlertVisible(false);
  };

  const handleDialogClose = () => {
    setIsAlertVisible(false);
    setDialogTask("");
  };

  const handleDoneTask = (index) => {
    markTaskAsDone(index);
  };

  return (
    <div className="container">
      <h1>Todo List</h1>
      <div className="input-container">
        <TextField
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          variant="outlined"
          label="Enter Your Task"
          fullWidth
          placeholder="Enter Task"
          inputProps={{ maxLength: maxLength }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon style={{ color: "blue" }} icon={faBook} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          style={{ height: "43px" }}
          variant="contained"
          color="primary"
          onClick={handleAddTask}
        >
          <FontAwesomeIcon icon={faAdd} />
        </Button>
      </div>
      <FormControl
        className="FilterButtons"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          style={{ height: "43px", display: "flex" }}
          variant="contained"
          color="primary"
        >
          <span>ALL</span>
        </Button>{" "}
        <Link to="/done-tasks" style={{ textDecoration: "none" }}>
          <Button
            style={{ height: "43px", display: "flex" }}
            variant="contained"
            color="primary"
          >
            <span>DONE TASKS</span>
          </Button>
        </Link>
        <Button
          style={{ height: "43px", display: "flex" }}
          variant="contained"
          color="primary"
        >
          <span>HAVE TO DO</span>
        </Button>
      </FormControl>
      <ul>
        {tasks
          .filter((task) => !task.isDone)
          .map((task, index) => (
            <li key={index}>
              <div style={{ display: "flex" }} className="task-container">
                {editIndex === index ? (
                  <React.Fragment>
                    <TextField
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSaveButton(index);
                        }
                      }}
                    />
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#00ff37", height: "56px" }}
                      onClick={() => handleSaveButton(index)}
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </Button>
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "#ff0000", height: "56px" }}
                      onClick={handleDiscardButton}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </React.Fragment>
                ) : (
                  <span
                    style={{
                      fontWeight: "bold",
                      textDecoration: isCheckBoxChecked[index]
                        ? "line-through"
                        : "none",
                      color: isCheckBoxChecked[index] ? "#d71717" : "black",
                    }}
                  >
                    {task.task}
                    <br />
                    <FormControl>
                      <span style={{ color: "blue", marginLeft: "20px" }}>
                        Created Date:
                      </span>
                      <span style={{ color: "black", display: "inline-block" }}>
                        {task.createdAt}
                      </span>
                    </FormControl>
                    <FormControl>
                      <span style={{ color: "red", marginLeft: "20px" }}>
                        Reminder Date:
                      </span>
                      <span
                        style={{
                          color: "black",
                          display: "inline-block",
                          marginLeft: "20px",
                        }}
                      >
                        {task.reminderDateTime || "Not set"}{" "}
                      </span>
                    </FormControl>
                  </span>
                )}
              </div>
              <div className="button-container">
                <FormControlLabel
                  control={<Checkbox />}
                  label=""
                  style={{ marginRight: "10px" }}
                  onChange={(e) => handleCheckBoxChange(e, index)}
                />
                <Button
                  variant="contained"
                  title="Done Task"
                  className="done-button"
                  onClick={() => handleDoneTask(index)}
                >
                  <FontAwesomeIcon icon={faCheckCircle} />
                </Button>

                <Button
                  variant="contained"
                  title="Delete Task"
                  className="delete-button"
                  onClick={() => deleteTask(index)}
                >
                  <FontAwesomeIcon icon={faTrashAlt} />
                </Button>

                <Button
                  variant="contained"
                  title="Schedule Task"
                  className="schedule-button"
                  onClick={() => handleReminderModalOpen(index)}
                >
                  <FontAwesomeIcon icon={faClock} />
                </Button>
                {editIndex === index ? null : (
                  <Button
                    variant="contained"
                    title="Edit Task"
                    className="edit-button"
                    style={{ backgroundColor: "#007bff" }}
                    onClick={() => handleEditButton(index, task.task)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                )}
              </div>
            </li>
          ))}
      </ul>
      <Dialog open={isAlertVisible} onClose={handleDialogClose}>
        <DialogTitle>Task Reminder</DialogTitle>
        <DialogContent>
          <p
            style={{ fontWeight: "bold" }}
          >{`It's time to do task: ${dialogTask}`}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Dismiss</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openReminderModal} onClose={handleReminderModalClose}>
        <DialogTitle>Set Reminder</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer
              components={[
                "DateTimePicker",
                "MobileDateTimePicker",
                "DesktopDateTimePicker",
                "StaticDateTimePicker",
              ]}
            >
              <DemoItem label="Static variant">
                <StaticDateTimePicker
                  value={reminderDateTime}
                  onChange={(newValue) => setReminderDateTime(newValue)}
                  disablePast
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReminderModalClose}>Cancel</Button>
          <Button onClick={handleSetReminder}>Set Reminder</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = {
  addTask,
  deleteTask,
  editTask,
  markTaskAsDone,
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
