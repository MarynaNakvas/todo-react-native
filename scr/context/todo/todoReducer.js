import React from 'react';

import { ADD_TODO, UPDATE_TODO, REMOVE_TODO, SHOW_LOADER, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS } from '../types';

const handlers = {
    [ADD_TODO]: (state, action) => ({
        ...state,
        todos: [
            ...state.todos,
            {
                id: action.id,
                title: action.title,
            },
        ],
    }),
    [UPDATE_TODO]: (state, action) => ({
        ...state,
        todos: state.todos.map((todo) => {
            if (todo.id === action.id) {
                todo.title = action.title
            }
            return todo;
        }),
    }),
    [REMOVE_TODO]: (state, action) => ({
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.id),
    }),
    [SHOW_LOADER]: (state) => ({
        ...state,
        loading: true,
    }),
    [HIDE_LOADER]: (state) => ({
        ...state,
        loading: false,
    }),
    [SHOW_ERROR]: (state, action) => ({
        ...state,
        error: action.error,
    }),
    [CLEAR_ERROR]: (state) => ({
        ...state,
        error: null,
    }),
    [FETCH_TODOS]: (state, action) => ({
        ...state,
        todos: action.todos,
    }),
    DEFAULT: (state) => state,
}

export const todoReducer = (state, action) => {
    const handler= handlers[action.type] || handlers.DEFAULT;
    return handler(state, action);
}
