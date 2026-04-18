import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {TodolistItem} from './TodolistItem'

export type Task = {
    id: string
    title: string
    isDone: boolean
}

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

    const changeFilter = (filter: FilterValues, todolistId: string) => {
        setFilter(filter)
    }

    let filteredTasks = tasks
    if (filter === 'active') {
        filteredTasks = tasks.filter(task => !task.isDone)
    }
    if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.isDone)
    }


    const changeTaskStatus = (taskId: Task['id'], isDone: Task['isDone'], todolistId: string) => {
        const newState = tasks.map(task => task.id == taskId ? {...task, isDone} : task)
        setTasks(newState)
    }

    return (
        <div className="app">
            <TodolistItem title="What to learn"
                          tasks={filteredTasks}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                          createTask={createTask}
                          changeTaskStatus={changeTaskStatus}
                          filter={filter}/>
        </div>
    )
}
