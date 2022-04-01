import React, { useCallback, useState, useEffect, useRef } from 'react';
import {
    ScrollView,
    View,
    Text,
    Image,
    Button,
    FlatList,
    StyleSheet,
    KeyboardAvoidingView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import ChatCard from '../../components/UI/ChatCard';
import { GiftedChat } from 'react-native-gifted-chat';







import COLORS from '../../constants/theme';;
import * as chatActions from '../../store/actions/chats';

const ChatScreen = props => {
    const chatId = props.route.params.ChannelId;
    const userId = useSelector(state => state.verifyauth.currentUserId)

    const channelData = useSelector(state => state.channel.byId[chatId]);
    const channelMessages = useSelector(state => state.messages.byId[chatId]);
    const state = useState;
    //const channelMessages = state.getState().messages.byId[chatId];

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const refContainer = useRef(null);
    const dispatch = useDispatch();

    ////console.log("user ID", userId);

    ////console.log("channel id ", chatId);

    ////console.log("channel data", channelData);

   // //console.log("channel message", channelMessages)



    useEffect(() => {
        if (refContainer.current) {
            refContainer.current.scrollToIndex({ animated: true, index: 0 });

        }
    }, [])







    const loadChat = useCallback(async () => {
        setError(null);


        //setIsRefreshing(true);
        try {
            await dispatch(chatActions.getchat(chatId));


        } catch (err) {
            setError(err);
        }

        try {
            await dispatch(chatActions.getmessage(chatId));

            // Alert.alert(
            //     'Team Created Successfully',

            //     [

            //         { text: 'Okay', onPress: () => props.navigation.navigate("Home") },
            //     ],
            //     // { cancelable: false }
            // )

        } catch (err) {
            setError(err.message);
            setIsLoading(true);
        }


        // setIsRefreshing(false);



    }, [dispatch, setIsLoading, setError]);





    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', loadChat);



        return () => {
            unsubscribe();
        };
    }, [loadChat]);


    useFocusEffect(
        useCallback(() => {
            props.navigation.addListener('focus', loadChat);

            // if (myChats.length === 0) {
            //     return () => unsubscribe();




            // }



        }, [loadChat])
    );


    useEffect(() => {
        setIsLoading(true);
        loadChat().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadChat]);






    const messageSendHandler = async () => {
        let action;



        action = chatActions.sendmessage(
            message,

        )
        setError(null);
        setIsLoading(false);
        try {
            await dispatch(action);

            // Alert.alert(
            //     'Team Created Successfully',

            //     [

            //         { text: 'Okay', onPress: () => props.navigation.navigate("Home") },
            //     ],
            //     // { cancelable: false }
            // )

        } catch (err) {
            setError(err.message);
            setIsLoading(true);
        }

    };




    ////console.log("FROM ONE CHAT SCREEN ", teamId)

    return (


        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}

        >




            <FlatList
                style={styles.list}
                ref={() => refContainer}

                //inverted={true}
                onRefresh={loadChat}
                refreshing={isRefreshing}
                data={channelMessages} // ------------------>>>>>>> state object of the array 
                keyExtractor={item => item.timetoken}

                renderItem={itemData => (
                    <View>

                        <ChatCard
                            image={itemData.item.imageUrl}
                            name={itemData.item.message}
                            onSelect={() => {
                                //selectItemHandler(itemData.item.id);
                            }}>
                        </ChatCard>
                    </View>

                )}
            />


        </KeyboardAvoidingView >









        // <GiftedChat
        //     messages={channelMessages}
        //     onSend={messageSendHandler}
        // //user={{ userId }}
        // />








    )
}


export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params.ChannelName
    };
};

const styles = StyleSheet.create({

    // list: {
    //     flex: 1,
    //     flexDirection: "column-reverse",
    //     minHeight: '100%',
    //     flexGrow: 1


    // },

    screen: {
        flex: 1,
        //flexDirection: "column",

    },


    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20,
        fontFamily: 'Inter-Bold'
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default ChatScreen;
