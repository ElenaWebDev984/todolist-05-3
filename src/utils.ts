import {Task} from "./TodolistItem.tsx";
import {FilterValues} from "./App.tsx";


export const getTasksForRender = (tasks: Task[], filter: FilterValues) => {
    return filter === 'active'
        ? tasks.filter(t => !t.isDone)
        : filter === 'completed'
            ? tasks.filter(t => t.isDone)
            : tasks
}