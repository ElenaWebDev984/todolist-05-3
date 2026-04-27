import {type ChangeEvent} from 'react'
import {FilterValues, TodolistType} from './App'
import {getTasksForRender} from "./utils.ts";
import {CreateItemTitleForm} from "./CreateItemTitleForm.tsx";
import {EditableSpan} from "./EditableSpan.tsx";
// import {Button} from './Button'
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';



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
    changeTodolistTitle: (title: TodolistType['title'], todolistId: string) => void
    changeTaskTitle: (taskId: Task['id'], title: Task['title'], todolistId: string) => void
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
        changeTodolistTitle,
        changeTaskTitle,
    } = props


    const tasksForRender = getTasksForRender(tasks, filter)

    const createTaskHandler = (taskTitle: Task['title']) => {
        createTask(taskTitle, id)
    }

    const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(title, id)


    return (
        <div>
            <h3>
                <EditableSpan title={title}
                              createItemTitle={changeTodolistTitleHandler}
                />
                <IconButton
                    size={'large'}
                    onClick={() => deleteTodolist(id)}
                >
                    <DeleteForeverIcon/>
                </IconButton>
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

                        const changeTaskTitleHandler = (title: string) => changeTaskTitle(task.id, title, id)

                        return (
                            <li key={task.id}
                                className={task.isDone ? 'is-done' : ''}
                            >
                                <input type="checkbox"
                                       checked={task.isDone}
                                       onChange={changeTaskStatusHandler}
                                />
                                <EditableSpan title={task.title}
                                              createItemTitle={changeTaskTitleHandler}
                                />

                                <IconButton
                                    onClick={deleteTaskHandler}
                                >
                                    <CancelIcon/>
                                </IconButton>
                            </li>
                        )
                    })}
                </ul>
            )}
            <div>
                <Button variant={'contained'}
                        size={'small'}
                        onClick={() => changeTodolistFilter('all', id)}
                        disableElevation
                        color={filter === 'all' ? 'secondary' : 'primary'}
                >
                    All
                </Button>
                <Button variant={'contained'}
                        size={'small'}
                        onClick={() => changeTodolistFilter('active', id)}
                        disableElevation
                        color={filter === 'active' ? 'secondary' : 'primary'}
                >
                    Active
                </Button>
                <Button variant={'contained'}
                        size={'small'}
                        onClick={() => changeTodolistFilter('completed', id)}
                        disableElevation
                        color={filter === 'completed' ? 'secondary' : 'primary'}
                >
                    Completed
                </Button>
            </div>
        </div>
    )
}
