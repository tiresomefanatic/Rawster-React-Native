import React, { useReducer, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

const inputReducer = (state, action) => {
    switch (action.type) {
        case INPUT_CHANGE:
            return {
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case INPUT_BLUR:
            return {
                ...state,
                touched: true
            };
        default:
            return state;
    }
};

const Input = props => {
    const [inputState, dispatch] = useReducer(inputReducer, {
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        touched: false
    });

    const { onInputChange, id } = props;

    useEffect(() => {
        if (inputState.touched) {
            onInputChange(id, inputState.value, inputState.isValid);
        }
    }, [inputState, onInputChange, id]);

    const textChangeHandler = text => {
        // const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        // if (props.required && text.trim().length === 0) {
        //     isValid = false;
        // }
        // if (props.email && !emailRegex.test(text.toLowerCase())) {
        //     isValid = false;
        // }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({ type: INPUT_CHANGE, value: text, isValid: isValid });
    };

    const lostFocusHandler = () => {
        dispatch({ type: INPUT_BLUR });
    };

    return (
        <View style={styles.container}>
            <View style={styles.formControl}>
                <Text style={styles.label}>{props.label}</Text>
                <TextInput
                    {...props}
                    style={styles.input}
                    value={inputState.value}
                    onChangeText={textChangeHandler}
                    onChange={lostFocusHandler}
                />
                {!inputState.isValid && inputState.touched && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{props.errorText}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    formControl: {
        width: '100%',
        marginBottom: 24,
        paddingHorizontal:20,
        // alignItems:'center',
        justifyContent:'center',
        // backgroundColor:'black'
    },
    label: {
        fontWeight:'400',
        marginVertical: 8,
        color: COLORS.black
    },
    input: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 1,
        color: 'black',
        backgroundColor: COLORS.lightGray,
        height: 40,
        borderRadius:12

    },
    errorContainer: {
        marginVertical: 5
    },
    errorText: {
        fontFamily: 'Inter-Regular',
        color: 'red',
        fontSize: 14
    },
    topText:{
        alignSelf:'center',
        fontSize: 24,
        fontWeight: '600',
    },
    container:{

    }
});

export default Input;
