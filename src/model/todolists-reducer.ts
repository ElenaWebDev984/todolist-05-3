import {TodolistType} from "../App.tsx";
import {v1} from "uuid";

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>

export type CreateTodolistAT = ReturnType<typeof createTodolistAC>

export const todolistsReducer = (todolists: TodolistType[], action: DeleteTodolistAT | CreateTodolistAT): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist':
            return todolists.filter(tl => tl.id !== action.payload.id)

        case 'create_todolist':
            const newTodolistId = v1()

            const newTodo: TodolistType = {
                id: newTodolistId,
                title: action.payload.title,
                filter: 'all',
            }
            return [...todolists, newTodo]

        default:
            return todolists
    }
}

export const deleteTodolistAC = (id: TodolistType['id']) => ({
    type: 'delete_todolist',
    payload: {
        id: id
    }
} as const)

export const createTodolistAC = (title: TodolistType['title']) => ({
    type: 'create_todolist',
    payload: {
        title: title
    }
} as const)

//TODO AT - Action Type, AC - Action Creator