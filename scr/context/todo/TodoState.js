import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';

import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { ADD_TODO, REMOVE_TODO, SHOW_LOADER, HIDE_LOADER, UPDATE_TODO, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS } from '../types';
import { ScreenContext } from '../screen/screenContext';
import { Http } from '../../http';

export const TodoState = ({ children }) => {
    const { changeScreen } = useContext(ScreenContext);
    const initialState = {
        todos: [],
        loading: false,
        error: null,
    };
    const [state, dispatch] = useReducer(todoReducer, initialState);

    const addTodo = async (title) => {
        clearError();
        try {
            const data = await Http.post(
                'https://todo-app-react-native-62c8c-default-rtdb.firebaseio.com/todos.json',
                { title },
            );
            dispatch({ type: ADD_TODO, title, id: data.name });
        } catch (e) {
            console.log(e);
            showError('Something was wrong...');
        }
    }

    const removeTodo = (id) => {
        const todo = state.todos.find((todo) => todo.id === id);
        Alert.alert('Remove item', `Are you sure you want to remove ${todo.title} item?`, [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Remove',
                style: 'destructive',
                onPress: async () => {
                    changeScreen(null);
                    clearError();
                    try {
                        await Http.delete(`https://todo-app-react-native-62c8c-default-rtdb.firebaseio.com/todos/${id}.json`)
                        dispatch({ type: REMOVE_TODO, id });  
                    } catch (e) {
                        console.log(e);
                        showError('Something was wrong...');
                    }
                }
            },
        ], 
        { cancelable: false });
    };

    const fetchTodos = async () => {
        clearError();
        showLoader();
        try {
            const data = await Http.get('https://todo-app-react-native-62c8c-default-rtdb.firebaseio.com/todos.json');
            const todos = Object.keys(data).map((key) => ({ ...data[key], id: key }));
            dispatch({ type: FETCH_TODOS, todos });
        } catch (e) {
            showError('Something was wrong...');
            console.log('error', e);
        } finally {
            hideLoader();
        }
    }

    const updateTodo = async (id, title) => {
        clearError();
        try {
            await Http.patch(
                `https://todo-app-react-native-62c8c-default-rtdb.firebaseio.com/todos/${id}.json`,
                { title },
            )
        } catch (e) {
            console.log('error', e);
            showError('Something was wrong...');
        }
        dispatch({ type: UPDATE_TODO, id, title });
    };

    const showLoader = () => dispatch({ type: SHOW_LOADER });
    const hideLoader = () => dispatch({ type: HIDE_LOADER });

    const showError = (error) => dispatch({ type: SHOW_ERROR, error});
    const clearError = () => dispatch({ type: CLEAR_ERROR });

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                loading: state.loading,
                error: state.error,
                addTodo,
                removeTodo,
                updateTodo,
                fetchTodos,
            }}
        >
            {children}
        </TodoContext.Provider>
    )
}
