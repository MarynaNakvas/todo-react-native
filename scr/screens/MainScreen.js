import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

import { THEME } from '../theme';
import { AddTodo } from '../components/AddTodo';
import { Todo } from '../components/Todo';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from '../components/ui/AppLoader';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';

export const MainScreen = () => {
    const { todos, loading, error, addTodo, removeTodo, fetchTodos } = useContext(TodoContext);
    const { changeScreen } = useContext(ScreenContext);

    const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
    const [deviceWidth, setDeviceWidth] = useState(width);

    const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos]);

    useEffect(() => {
        loadTodos()
    }, []);

    useEffect(() => {
        const update = () => {
            const newWidth = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
            setDeviceWidth(newWidth);
        }
        const subscription = Dimensions.addEventListener('change', update);

        return () => subscription.remove();
    });

    if (loading) {
        return <AppLoader/>
    }

    if (error) {
        return (
        <View style={styles.center}>
            <AppText style={styles.error}>
                {error}
            </AppText>
            <AppButton onPress={loadTodos}>
                Repeat
            </AppButton>
        </View>
        )
    }
     
    let content = (
        <View style={{ width: deviceWidth }}>
            <FlatList
                keyExtractor={(item) => item.id}
                data={todos}
                renderItem={({ item }) => (
                    <Todo
                        todo={item}
                        onRemove={removeTodo}
                        onOpen={changeScreen}
                    />
                )}
            />
        </View>
    );

    if (todos.length === 0) {
        content = 
        <View style={styles.imageWrap}>
            <Image
                source={require('../../assets/no-items.png')}
                style={styles.image}
            />
        </View>
    }

    return (
        <View>
            <AddTodo onSubmit={addTodo}/>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    imageWrap: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR,
    },
})
