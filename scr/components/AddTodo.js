import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Keyboard } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { THEME } from '../theme';

export const AddTodo = ({ onSubmit }) => {
    const [value, setValue] = useState('');

    const pressHandler = () => {
        if (value.trim()) {
            onSubmit(value);
            setValue('');
            Keyboard.dismiss();
        } else {
            Alert.alert('Todo name cannot be empty');
        } 
    }

    return (
        <View style={styles.block}>
            <TextInput
                style={styles.textInput}
                value={value}
                placeholder='Enter todo name'
                onChangeText={(text) => setValue(text)}
                autoCorrect={false}
                autoCapitalize='none'
            />
            <AntDesign.Button onPress={pressHandler} name='pluscircleo' >
                Add
            </AntDesign.Button>
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    textInput: {
        width: '70%',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
        padding: 10,
    },
})