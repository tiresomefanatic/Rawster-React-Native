import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {

    View,
    KeyboardAvoidingView,
    StyleSheet,
    ActivityIndicator,
    Alert,
    Text,
    Pressable,
    Image
} from 'react-native';

import LottieView from 'lottie-react-native'


import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import COLORS, { SIZES } from '../../constants/theme';
import * as authActions from '../../store/actions/requestOtp';
import { icons } from '../../constants';

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


const RequestOtpScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    //const [isSignup, setIsSignup] = useState(false);
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            phone: '',

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

    ////console.log("request otp formstate ", formState)

    const authHandler = async () => {
        let action;

        action = authActions.requestotpauth(
            formState.inputValues.phone)
        setError(null);
        setIsLoading(false);
        try {
            await dispatch(action);
            props.navigation.navigate("Verify");
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
        <KeyboardAvoidingView  style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={64}
        >
                    <View style={styles.top}>
                        <Text style={styles.topText}>Welcome to the beginning</Text>
                        <LottieView source={require('../../assets/hello.json')} autoPlay loop style={styles.lottie}/>
                    </View>
            <View style={styles.authContainer} 
                   
            >
                <Input
                    id="phone"
                    label="Phone Number"
                    keyboardType="number-pad"
                    required
                    phone
                    //autoCapitalize="none"
                    errorText="Please Enter Valid Mobile Number."
                    onInputChange={inputChangeHandler}
                    initialValue=''/>
                <Pressable onPress={authHandler} style={styles.buttonContainer}>
                    {isLoading}
                    <Text style={{
                        fontSize:16,
                        color:COLORS.COLORS.white,
                        fontWeight:'600'
                        }}>
                            Verify
                            </Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>

    );
};

export const screenOptions = {
    headerTitle: "blah"
};

const styles = StyleSheet.create({
    screen: {
        // flex: 1
    },
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.COLORS.white
    },
    top:{
        alignItems:'center',
        justifyContent:'space-around',
        // backgroundColor:'green'
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20,
        // backgroundColor:'red'
    },
    buttonContainer: {
        marginTop: 10,
        backgroundColor: COLORS.COLORS.black,
        height: 40,
        borderRadius:20,
        alignItems:"center",
        justifyContent:'center'
    },
    topText:{
        alignSelf:'center',
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 48
    },
    lottie:{
        height:100,
        width:100,
    }
});

export default RequestOtpScreen;
