import React, { useState, useEffect } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, List, ListItem, ListItemText, Card, CardContent, ListItemSecondaryAction, IconButton, DialogActions, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Formik, Form, Field } from 'formik';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [editedTask, setEditedTask] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false); 

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const validateTask = (value) => {
    let error;
    if (!value.trim()) {
      error = 'Task description is required';
    }
    return error;
  };

  const handleTaskSubmit = (values, { resetForm }) => {
    if (values.task.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), description: values.task, completed: false }]);
      resetForm();
    }
  };

  const handleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleEditTask = (taskId) => {
    const taskToEdit = tasks.find(task => task.id === taskId);
    setEditedTask(taskToEdit);
    setEditDialogOpen(true);
  };

  const handleSaveEditedTask = (editedDescription) => {
    const updatedTasks = tasks.map(task =>
      task.id === editedTask.id ? { ...task, description: editedDescription } : task
    );
    setTasks(updatedTasks);
    setEditDialogOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <div style={{ marginTop: "70px" }}>
      <h1 style={{ textAlign: "center" }}>To-Do List Manager</h1>
      <Formik
        initialValues={{ task: '' }}
        onSubmit={handleTaskSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        {({ handleSubmit }) => (
          <Form onSubmit={handleSubmit} style={{display:"flex", alignItems:"center",  justifyContent:"space-between"}}>
            <Field name="task" validate={validateTask}>
              {({ field, meta }) => (
                <TextField
                  {...field}
                  label="Enter task"
                  variant="outlined"
                  fullWidth
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                  sx={{width:"80%", marginLeft:"12px"}}
                />
              )}
            </Field>
            <Button type="submit" variant="contained"  sx={{marginRight:"16px" , backgroundColor:"black" }}>
              Add Task
            </Button>
          </Form>
        )}
      </Formik>
      <List>
        {tasks.map(task => (
          <ListItem key={task.id}>
            <Card variant="outlined" sx={{ width: '100%', backgroundColor: task.completed ? '#90EE90' : 'none' }}>
              <CardContent>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={task.completed}
                      onChange={() => handleTaskCompletion(task.id)}
                      color="primary"
                    />
                  }
                  label={
                    <ListItemText primary={task.description} style={{ textDecoration: task.completed ? 'line-through' : 'none', }} />
                  }
                />
              </CardContent>
              <ListItemSecondaryAction>
                <Button variant="outlined" onClick={() => handleEditTask(task.id)} style={{marginRight:"10px"}}>Edit</Button>
                <Button variant="outlined" onClick={() => handleDeleteTask(task.id)}>Delete</Button>
              </ListItemSecondaryAction>
            </Card>
          </ListItem>
        ))}
      </List>
      
      <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="editedTask"
            label="Edit Task"
            type="text"
            fullWidth
            defaultValue={editedTask ? editedTask.description : ''}
            onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
          <Button onClick={() => handleSaveEditedTask(editedTask.description)} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Home;
