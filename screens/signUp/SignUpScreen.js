import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    ScrollView,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import COLORS from '../../constants/theme';;
import * as authActions from '../../store/actions/signUp';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        };
        let updatedFormIsValid = true;
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        };
    }
    return state;
};


const SignUpScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    //const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const currentPhone = useSelector(state => state.requestauth.phone);
    //console.log("am i getting the phone in signup", currentPhone)

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            firstname: '',
            lastname: '',
            email: '',
            phone: currentPhone

        },
        // inputValidities: {
        //     phone: false,
        // },

        formIsValid: false
    });

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
        }
    }, [error]);

    //console.log("signup otp form state ", formState)

    const authHandler = async () => {
        let action;
        // if (isSignup) {
        //     action = authActions.signup(
        //         formState.inputValues.email,
        //         formState.inputValues.password
        //     );
        // } else {
        //     action = authActions.login(
        //         formState.inputValues.email,
        //         formState.inputValues.password
        //     );
        // }
        action = authActions.signup(
            formState.inputValues.firstname,
            formState.inputValues.lastname,
            formState.inputValues.email,
            formState.inputValues.phone)
        setError(null);
        setIsLoading(false);
        try {
            await dispatch(action);
            // props.navigation.navigate("Verify");
        } catch (err) {
            setError(err.message);
            setIsLoading(true);
        }
    };

    const inputChangeHandler = useCallback(
        (inputIdentifier, inputValue, inputValidity) => {
            dispatchFormState({
                type: FORM_INPUT_UPDATE,
                value: inputValue,
                //isValid: inputValidity,
                input: inputIdentifier
            });
        },
        [dispatchFormState]
    );

    return (
        // <KeyboardAvoidingView
        //     behavior="padding"
        //     keyboardVerticalOffset={50}
        //     style={styles.screen}
        // >
        <LinearGradient colors={['#ffe3ff', '#2A2A2A',]} style={styles.gradient}>
            {/* <Card style={styles.authContainer}> */}
            <View style={styles.authContainer}>
                {/* <ScrollView > */}
                <Input
                    id="firstname"
                    label="First Name"
                    keyboardType="default"
                    //required
                    phone
                    //autoCapitalize="none"
                    errorText="Please Enter Your First Name."
                    onInputChange={inputChangeHandler}
                    initialValue=''

                />
                <Input
                    id="lastname"
                    label="Last Name"
                    keyboardType="default"
                    //required
                    phone
                    //autoCapitalize="none"
                    errorText="Please Enter Your First Name."
                    onInputChange={inputChangeHandler}
                    initialValue=''

                />
                <Input
                    id="email"
                    label="Email"
                    keyboardType="default"
                    // secureTextEntry
                    required
                    minLength={5}
                    autoCapitalize="none"
                    errorText="Please enter a valid Email."
                    onInputChange={inputChangeHandler}
                    initialValue=""
                />
                <View style={styles.buttonContainer}>

                    {isLoading}
                    <Button
                        title={'Enter'}
                        color={COLORS.primary}
                        onPress={authHandler}
                    />


                </View>
                {/* <View style={styles.buttonContainer}>
                            <Button
                                title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
                                color={COLORS.accent}
                                onPress={() => {
                                    setIsSignup(prevState => !prevState);
                                }}
                            />
                        </View> */}
                {/* </ScrollView> */}
            </View>
            {/* </Card> */}
        </LinearGradient>

    );
};

export const screenOptions = {
    headerTitle: "blah"
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    buttonContainer: {
        marginTop: 10
    }
});

export default SignUpScreen;
