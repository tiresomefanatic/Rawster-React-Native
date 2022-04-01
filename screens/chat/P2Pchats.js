import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
    ScrollView,
    Text,
    View,
    KeyboardAvoidingView,
    StyleSheet,
    FlatList,
    Button,
    ActivityIndicator,
    Alert
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';

import { useFocusEffect } from '@react-navigation/native';


import Input from '../../components/UI/Input';
import ChatCard from '../../components/UI/ChatCard';

import Card from '../../components/UI/Card';
import COLORS from '../../constants/theme';;
import * as chatActions from '../../store/actions/chats';








const ChatListScreen = props => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const userId = useSelector(state => state.verifyauth.currentUserId)
    const myChats = useSelector(state => state.chats.byId[userId]);
    const messages = useSelector(state => state.messages)
    const dispatch = useDispatch();


    // //console.log(" fetching chats ", myChats)


    //const messagesList = messages.sort(message => message.timetoken);

    const uuidChannels = useSelector(state => {
        const membershipIds = (state.chats.byId[userId] || []).map(m => m.id);
        return Object.values(state.channel.byId).filter((c) => membershipIds.includes(c.id));
    });



    // const ChatList = uuidChannels?.sort(function (a, b) {
    //     return (a.updated < b.updated) ? -1 : ((a.updated > b.updated) ? 1 : 0);
    // });

    // const Channelswithoutevents = 


    const ChatList = uuidChannels.sort((a, b) => -a.updated.localeCompare(b.updated))

    // const ChatLists = ChatList.filter((c) => ChatList.includes(c.description === "Team Chat"))

    // //console.log("CHATLISSSTTT", ChatLists)

    const filterChats = (taskArray, obj) => taskArray.filter(task => Object.keys(task).some(key => obj[key] && obj[key] == task[key]));

    const TeamChats = filterChats(ChatList, { description: "Team Chat" })


    ////console.log(" Filter ", TeamChats)



    // const chats = useSelector(state => state.channel.byId)

    // //console.log(" channel list memberships", chats)


    ////console.log(" HAIl MARY ", uuidChannels)







    const loadMyChats = useCallback(async () => {
        setError(null);


        //setIsRefreshing(true);
        try {
            await dispatch(chatActions.getChats());

            //setIsRefreshing(false);


        } catch (err) {
            setError(err);
        }

        // try {
        //     await dispatch(chatActions.getmessage());


        // } catch (err) {
        //     setError(err);
        // }





    }, [dispatch, setIsLoading, setError]);





    // useEffect(() => {
    //     const unsubscribe = props.navigation.addListener('focus', loadMyChats);



    //     return () => {
    //         unsubscribe();
    //     };
    // }, [loadMyChats]);



    // useFocusEffect(
    //     useCallback(() => {
    //         props.navigation.addListener('focus', loadMyChats);
    //         if (myChats.length === 0) {
    //             return () => unsubscribe();
    //         }
    //     }, [loadMyChats])
    // );


    useEffect(() => {
        setIsLoading(true);
        loadMyChats().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadMyChats]);

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>An error occurred!</Text>
                <Button
                    title="Try again"
                    onPress={loadMyChats}
                    color={COLORS.primary}
                />
            </View>
        );
    }

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color={COLORS.primary} />
            </View>
        );
    }

    if (!isLoading) {
        return (
            <View style={styles.centered}>
                <Text>No Chats found</Text>
            </View>
        );
    }




    const selectItemHandler = (id, name) => {
        props.navigation.navigate('Chat', {
            // screen: 'Team',
            ChannelId: id,
            ChannelName: name
        });
    };







    return (


        <View style={{
            backgroundColor: 'white',
            flex: 1,
            flexDirection: "column",



        }}>

            <FlatList
                onRefresh={loadMyChats}
                refreshing={isRefreshing}
                data={ChatList} // ------------------>>>>>>> state object of the array 
                keyExtractor={item => item.id}
                renderItem={itemData => (
                    <ChatCard
                        // image={itemData.item.imageUrl}
                        name={itemData.item.name}
                        //acronym={itemData.item.acronym}
                        onSelect={() => {
                            selectItemHandler(itemData.item.id, itemData.item.name);
                        }}


                    >
                        {/* <Button
                        color={COLORS.primary}
                        title="View Details"
                        onPress={() => {
                            selectItemHandler(itemData.item.id, itemData.item.title);
                        }}
                    /> */}

                    </ChatCard>
                )}
            />
        </View>









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

export default ChatListScreen;
