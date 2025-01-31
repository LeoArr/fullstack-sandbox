import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'
import { CustomTextField } from '../../shared/FormFields'
import TextField from '@material-ui/core/TextField';
import { Checkbox } from '@material-ui/core';
import { addTodo, updateTodo, removeTodo} from '../../shared/Resources';

const useStyles = makeStyles({
  card: {
    margin: '1rem'
  },
  todoLine: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    flexGrow: 1,
  },
  soonDue: {
    color: 'yellow',
  },
  overDue: {
    color: 'red',
  },
  standardSpace: {
    margin: '8px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  }
})

const isTodoDue = (todo, daysLeft) => {
  if (todo.done || !todo.dueDate) return false;
  let dueDate = new Date(todo.dueDate);
  return dueDate.setDate(dueDate.getDate() - daysLeft) < new Date();
}

export const ToDoListForm = ({ toDoList, onUpdate }) => {
  const classes = useStyles();
  const setTodos = onUpdate;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='headline' component='h2'>
          {toDoList.title}
        </Typography>
        <form className={classes.form}>
          {toDoList.todos.map((todo, index) => (
            <div key={index} className={classes.todoLine}>
              <Typography className={classes.standardSpace} variant='title'>
                {index + 1}
              </Typography>
              <CustomTextField
                label='What to do?'
                value={todo.title}
                onChange={event => { 
                  updateTodo({ ...todo, title: event.target.value }) // TODO: Should be debounced 
                  setTodos([ // immutable update
                    ...toDoList.todos.slice(0, index),
                    { ...todo, title: event.target.value },
                    ...toDoList.todos.slice(index + 1)
                  ]);
                }}
                className={classes.textField}
              />
              <TextField
                label="Due date:"
                className={classes.textField}
                className={isTodoDue(todo, 7) ? (isTodoDue(todo, 0) ? classes.overDue : classes.soonDue) : ''}
                value={todo.dueDate}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={event => { 
                  updateTodo({ ...todo, dueDate: event.target.value })
                    .then((updatedTodo) =>
                      setTodos([ // immutable update
                        ...toDoList.todos.slice(0, index),
                        updatedTodo,
                        ...toDoList.todos.slice(index + 1)
                      ]))
                }}
              />
              <Checkbox
                checked={todo.done}
                onChange={event => {
                  updateTodo({ ...todo, done: event.target.checked })
                    .then((updatedTodo) =>
                      setTodos([ // immutable update
                        ...toDoList.todos.slice(0, index),
                        updatedTodo,
                        ...toDoList.todos.slice(index + 1)
                      ]))
                }}
              >
              </Checkbox>
              <Button
                size='small'
                color='secondary'
                className={classes.standardSpace}
                onClick={() => removeTodo(todo.id)
                  .then((removedTodo) =>
                    setTodos([...toDoList.todos].filter(todo => todo.id !== removedTodo.id)))}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type='button'
              color='primary'
              onClick={() => addTodo(toDoList.id).then((todo) =>
                            setTodos([...toDoList.todos, todo]))}
            >
                Add Todo < AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  )
}
