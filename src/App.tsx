import './App.css'
import {useState} from 'react'
import {v1} from 'uuid'
import {Task, TodolistItem} from './TodolistItem'
import {getTasksForRender} from "./utils.ts";
import {CreateItemTitleForm} from "./CreateItemTitleForm.tsx";

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

    const changeFilter = (filter: FilterValues, todolistId: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter} : tl))
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
            <TodolistItem key={tl.id}
                          id={tl.id}
                          title={tl.title}
                          tasks={getTasksForRender(tasks[tl.id], tl.filter)}
                          deleteTask={deleteTask}
                          changeFilter={changeFilter}
                          createTask={createTask}
                          changeTaskStatus={changeTaskStatus}
                          filter={tl.filter}
                          deleteTodolist={deleteTodolist}/>
        )
    })


    return (
        <div className="app">
            <CreateItemTitleForm createTitle={createTodolist}
                                 maxTitleLength={10}
                                 minTitleLength={3}/>
            {todolistsComponents}
        </div>
    )
}
