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
import Checkbox from '@mui/material/Checkbox';
import {Box, List, ListItem, Typography} from "@mui/material";
import {containerSx, getListItemSx} from "./Todolist.styles.ts";


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
        <Box>
            <Typography align={'center'}
                        variant={'h5'}
                        sx={{fontWeight: 'bold'}}
            >
                <Box>
                    <EditableSpan title={title}
                                  createItemTitle={changeTodolistTitleHandler}
                    />

                    <IconButton
                        size={'large'}
                        onClick={() => deleteTodolist(id)}
                    >
                        <DeleteForeverIcon/>
                    </IconButton>
                </Box>
            </Typography>

            <CreateItemTitleForm createTitle={createTaskHandler}/>

            {tasksForRender.length === 0 ? (
                <p>Тасок нет</p>
            ) : (
                <List>
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
                            <ListItem key={task.id}
                                      sx={containerSx}
                                      className={task.isDone ? 'is-done' : ''}
                                      disablePadding
                            >
                                <Box sx={{display: 'flex', alignItems: 'center'}}>
                                    <Checkbox
                                        size={'small'}
                                        checked={task.isDone}
                                        onChange={changeTaskStatusHandler}
                                    >

                                    </Checkbox>
                                    <Box sx={getListItemSx(task.isDone)}>
                                        <EditableSpan title={task.title}
                                                      createItemTitle={changeTaskTitleHandler}
                                        />
                                    </Box>
                                </Box>
                                <IconButton
                                    onClick={deleteTaskHandler}
                                >
                                    <CancelIcon/>
                                </IconButton>
                            </ListItem>
                        )
                    })}
                </List>
            )}
            <Box sx={containerSx}>
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
            </Box>
        </Box>
    )
}
