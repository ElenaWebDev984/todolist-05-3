import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {Task, TodolistItem} from './TodolistItem'
import {getTasksForRender} from "./utils.ts";
import {CreateItemTitleForm} from "./CreateItemTitleForm.tsx";
import {AppBar, Container, Grid, Paper, Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
import MenuIcon from '@mui/icons-material/Menu';
import {NavButton} from "./NavButton.ts";

export type FilterValues = 'all' | 'active' | 'completed'

export type TodolistType = {
    id: string
    title: string
    filter: FilterValues
}

export type TasksStateType = {
    [todolistId: string]: Task[]
}


export const App = () => {
    const todolistId_1 = v1()
    const todolistId_2 = v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistId_1, title: 'What to learn', filter: 'all'},
        {id: todolistId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TasksStateType>({
        [todolistId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistId_2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Meat', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
        ],
    })


    const deleteTask = (taskId: Task['id'], todolistId: string) => {
        // const tasksForDelete = tasks[todolistId]
        // const tasksForTodolist = tasksForDelete.filter(t => t.id !== taskId)
        // const nextState = {...tasks, [todolistId]: tasksForTodolist}
        // setTasks(nextState)
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }

    const createTask = (title: Task['title'], todolistId: string) => {
        const newTask = {id: v1(), title, isDone: false}
        // const tasksForCreate = tasks[todolistId]
        // const tasksForTodolists = [...tasksForCreate, newTask]
        // const nextState = {...tasks, [todolistId]: tasksForTodolists}
        // setTasks(nextState)
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeTaskStatus = (taskId: Task['id'], isDone: Task['isDone'], todolistId: string) => {
        // const tasksForUpdate = tasks[todolistId]
        // const tasksForTodolists = tasksForUpdate.map(t => t.id === taskId ? {...t, isDone } : t)
        // const nextState = {...tasks, [todolistId]: tasksForTodolists}
        // setTasks(nextState)
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }

    const changeTaskTitle = (taskId: Task['id'], title: Task['title'], todolistId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: title} : t)})
    }

    const changeTodolistFilter = (filter: FilterValues, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
    }

    const changeTodolistTitle = (title: TodolistType['title'], todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl))
    }

    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        const copyTasksState = {...tasks}
        delete copyTasksState[todolistId]
        setTasks(copyTasksState)
    }

    const createTodolist = (title: TodolistType['title']) => {
        const newTodolistId = v1()

        const newTodo: TodolistType = {
            id: newTodolistId,
            title: title,
            filter: 'all',
        }
        setTodolists([...todolists, newTodo])
        setTasks({...tasks, [newTodo.id]: []})
    }


    const todolistsComponents = todolists.map(tl => {
        return (
            <Grid key={tl.id}>
                <Paper elevation={6} sx={{padding: '20px'}}>
                    <TodolistItem id={tl.id}
                                  title={tl.title}
                                  tasks={getTasksForRender(tasks[tl.id], tl.filter)}
                                  deleteTask={deleteTask}
                                  changeTodolistFilter={changeTodolistFilter}
                                  createTask={createTask}
                                  changeTaskStatus={changeTaskStatus}
                                  filter={tl.filter}
                                  deleteTodolist={deleteTodolist}
                                  changeTodolistTitle={changeTodolistTitle}
                                  changeTaskTitle={changeTaskTitle}
                    />
                </Paper>
            </Grid>
        )
    })


    return (
        <div className="app">
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton color={'inherit'}
                                size={'large'}
                                edge={'start'}
                                aria-label={'menu'}
                                sx={{mr: 2}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography align={'center'} variant={'h6'} component={'div'} sx={{flexGrow: 1}}>
                        TODOLISTS
                    </Typography>
                    <NavButton background={'#dc148f'}>FAQ</NavButton>
                    <NavButton>Login</NavButton>
                    <NavButton>Logout</NavButton>
                </Toolbar>
            </AppBar>
            <Container maxWidth={'lg'}>
                <Grid container sx={{p: '20px 0'}}>
                    <CreateItemTitleForm createTitle={createTodolist}
                                         maxTitleLength={10}
                                         minTitleLength={3}/>
                </Grid>
                <Grid container spacing={4}>
                    {todolistsComponents}
                </Grid>
            </Container>

        </div>
    )
}
