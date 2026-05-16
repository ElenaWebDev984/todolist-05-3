import {TodolistType} from "../App.tsx";

export type DeleteTodolistAT = {
    type: 'delete_todolist'
    payload: {
        id: TodolistType['id']
    }
}

export const todolistsReducer = (todolists: TodolistType[], action: DeleteTodolistAT): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist':
            return todolists.filter(tl => tl.id !== action.payload.id)

        default:
            return todolists
    }
}