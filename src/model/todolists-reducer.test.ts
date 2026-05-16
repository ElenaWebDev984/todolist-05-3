import {v1} from "uuid";
import {expect, test} from 'vitest'
import type {TodolistType} from "../App.tsx";
import {DeleteTodolistAT, todolistsReducer} from "./todolists-reducer.ts";

test('correct todolist should be deleted', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    // 1. Стартовый state
    const startState: TodolistType[] = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ]

    // 2. Действие
    // TODO variant 1 of typification
    const action: DeleteTodolistAT = {
        type: 'delete_todolist',
        payload: {
            id: todolistId1
        }
    }
    // TODO variant 2 of typification
    // const action = {
    //     type: 'delete_todolist' as const,
    //     payload: {
    //         id: todolistId1
    //     }
    // }
    const endState = todolistsReducer(startState, action)

    // 3. Проверка, что действие изменило state соответствующим образом
    // в массиве останется один тудулист
    expect(endState.length).toBe(1)
    // удалится нужный тудулист, не любой
    expect(endState[0].id).toBe(todolistId2)

})