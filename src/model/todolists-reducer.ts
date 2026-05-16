import {TodolistType} from "../App.tsx";

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>

export const todolistsReducer = (todolists: TodolistType[], action: DeleteTodolistAT): TodolistType[] => {
    switch (action.type) {
        case 'delete_todolist':
            return todolists.filter(tl => tl.id !== action.payload.id)

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

//TODO AT - Action Type, AC - Action Creator