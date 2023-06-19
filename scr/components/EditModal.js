import React, { useState } from 'react';
import { Modal, View, StyleSheet, TextInput, Alert } from 'react-native';
import { THEME } from '../theme';
import { AppButton } from './ui/AppButton';

export const EditModal = ({ value, visible, onCancel, onSave }) => {
    const [title, setTitle] = useState(value);

    const saveHandler = () => {
        if (title.trim().length < 3) {
            Alert.alert('Error',
            `Minimal title length is 3 letters.
            Title has ${title.trim().length} letters now.`)
        } else {
            onSave(title)
        }
    }

    const cancelHandler = () => {
        setTitle(value);
        onCancel();
    }

    return (
        <Modal
            visible={visible}
            animationType='slide'
            transparent={false}
        >
            <View style={styles.wrap}>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    style={styles.input}
                    placeholder='Enter name'
                    autoCapitalize='none'
                    autoCorrect={false}
                    maxLength={64}
                />
                <View style={styles.buttons}>
                    <AppButton
                        onPress={cancelHandler}
                        color={THEME.DANGER_COLOR}
                    >
                        Cancel
                    </AppButton>
                    <AppButton
                        onPress={saveHandler}
                    >
                        Save
                    </AppButton>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%',
    },
    buttons: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
})
