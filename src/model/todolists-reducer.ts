import {TodolistType} from "../App.tsx";

export type DeleteTodolistAT = ReturnType<typeof deleteTodolistAC>

export type CreateTodolistAT = ReturnType<typeof createTodolistAC>

export const todolistsReducer = (todolists: TodolistType[], action: DeleteTodolistAT | CreateTodolistAT): TodolistType[] => {
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

export const createTodolistAC = (title: TodolistType['title']) => ({
    type: 'create_todolist',
    payload: {
        title: title
    }
} as const)

//TODO AT - Action Type, AC - Action Creator