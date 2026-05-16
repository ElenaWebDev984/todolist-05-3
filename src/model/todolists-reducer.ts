import {FilterValues, TodolistType} from "../App.tsx";
import {v1} from "uuid";

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAT = ReturnType<typeof createTodolistAC>
export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

type ActionType = DeleteTodolistAT | CreateTodolistAT | changeTodolistTitleAT | changeTodolistFilterAT

export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {
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

        case 'change_todolist_title':
            return todolists.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)

        case 'change_todolist_filter':
            return todolists.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)

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

export const changeTodolistTitleAC = (payload: {title: TodolistType['title'], id: TodolistType['id']}) => ({
    type: 'change_todolist_title',
    payload: payload
} as const)

export const changeTodolistFilterAC = (payload: {filter: FilterValues, id: TodolistType['id']}) => ({
    type: 'change_todolist_filter',
    payload: payload
} as const)

//TODO AT - Action Type, AC - Action Creator