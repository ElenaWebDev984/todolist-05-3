import {FilterValues, TodolistType} from "../App.tsx";
import {v1} from "uuid";

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>
export type CreateTodolistAT = ReturnType<typeof createTodolistAC>
export type changeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>
export type changeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>

type ActionType = DeleteTodolistAT | CreateTodolistAT | changeTodolistTitleAT | changeTodolistFilterAT

export const todolistsReducer = (todolists: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist': {
            const id = action.payload.id
            return todolists.filter(tl => tl.id !== id)
        }

        case 'create_todolist': {
            const {id, title} = action.payload
            const newTodo: TodolistType = {
                id,
                title,
                filter: 'all',
            }
            return [...todolists, newTodo]
        }

        case 'change_todolist_title': {
            const {id, title} = action.payload
            return todolists.map(tl => tl.id === id ? {...tl, title} : tl)
        }

        case 'change_todolist_filter': {
            const {id, filter} = action.payload
            return todolists.map(tl => tl.id === id ? {...tl, filter} : tl)
        }

        default:
            return todolists
    }
}

export const deleteTodolistAC = (id: TodolistType['id']) => ({
    type: 'delete_todolist',
    payload: {id}
} as const)

export const createTodolistAC = (title: TodolistType['title']) => ({
    type: 'create_todolist',
    payload: {title, id: v1()}
} as const)

export const changeTodolistTitleAC = (payload: {title: TodolistType['title'], id: TodolistType['id']}) => ({
    type: 'change_todolist_title',
    payload
} as const)

export const changeTodolistFilterAC = (payload: {filter: FilterValues, id: TodolistType['id']}) => ({
    type: 'change_todolist_filter',
    payload
} as const)

//TODO AT - Action Type, AC - Action Creator