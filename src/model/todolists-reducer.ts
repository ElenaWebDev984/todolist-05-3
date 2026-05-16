import {TodolistType} from "../App.tsx";

export type DeleteTodolistActionType = {
    type: 'delete_todolist'
    payload: {
        id: TodolistType['id']
    }
}

export const todolistsReducer = (todolists: TodolistType[], action: DeleteTodolistActionType): TodolistType[] => {
    if (action.type === 'delete_todolist') {
        return todolists.filter(tl => tl.id !== action.payload.id)
    }
    return todolists
}