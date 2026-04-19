import {type ChangeEvent} from 'react'
import type {FilterValues} from './App'
import {Button} from './Button'
import {getTasksForRender} from "./utils.ts";
import {CreateItemTitleForm} from "./CreateItemTitleForm.tsx";

export type Task = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    id: string
    title: string
    tasks: Task[]
    deleteTask: (taskId: Task['id'], todolistId: string) => void
    changeTodolistFilter: (filter: FilterValues, todolistId: string) => void
    createTask: (title: Task['title'], todolistId: string) => void
    changeTaskStatus: (taskId: Task['id'], isDone: Task['isDone'], todolistId: string) => void
    filter: FilterValues
    deleteTodolist: (todolistId: string) => void
}

export const TodolistItem = (props: Props) => {
    const {
        id,
        title,
        tasks,
        deleteTask,
        changeTodolistFilter,
        createTask,
        changeTaskStatus,
        filter,
        deleteTodolist,
    } = props


    const tasksForRender = getTasksForRender(tasks, filter)

    const createTaskHandler = (taskTitle: Task['title']) => {
            createTask(taskTitle, id)
    }


    return (
        <div>
            <h3>
                {title}
                <Button title='X'
                        onClick={() => deleteTodolist(id)}
                />
            </h3>

            <CreateItemTitleForm createTitle={createTaskHandler}/>

            {tasksForRender.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <ul>
                    {tasks.map(task => {
                        const deleteTaskHandler = () => {
                            deleteTask(task.id, id)
                        }

                        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            const newStatusValue = e.currentTarget.checked
                            changeTaskStatus(task.id, newStatusValue, id)
                        }

                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={task.isDone}
                                       onChange={changeTaskStatusHandler}/>
                                <span>{task.title}</span>
                                <Button title={'x'} onClick={deleteTaskHandler}/>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button className={filter === 'all' ? 'active-filter' : ''}
                        title={'All'}
                        onClick={() => changeTodolistFilter('all', id)}/>
                <Button className={filter === 'active' ? 'active-filter' : ''}
                        title={'Active'}
                        onClick={() => changeTodolistFilter('active', id)}/>
                <Button className={filter === 'completed' ? 'active-filter' : ''}
                        title={'Completed'}
                        onClick={() => changeTodolistFilter('completed', id)}/>
            </div>
        </div>
    )
}
