import React, { useState, useEffect } from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Divider,
} from "@mui/material";

function DoneTasksPage() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const filteredCompletedTasks = storedTasks.filter((task) => task.isDone);
    setCompletedTasks(filteredCompletedTasks);
  }, []);

  return (
    <Container maxWidth="sm">
      <Typography
        style={{ fontStyle: "italic" }}
        variant="h4"
        align="center"
        gutterBottom
      >
        Completed Tasks
      </Typography>
      <List>
        {completedTasks.map((task, index) => (
          <React.Fragment key={index}>
            <ListItem
              disableGutters
              style={{
                borderRadius: "10px",
                padding: "10px",
                backgroundColor:
                  index % 2 === 0 ? "rgb(158, 208, 233)" : "inherit",
              }}
            >
              <ListItemText primary={task.task} />
            </ListItem>
            {index < completedTasks.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
}

export default DoneTasksPage;
