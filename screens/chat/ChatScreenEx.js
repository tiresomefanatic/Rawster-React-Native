import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Button,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  SafeAreaView,
  BackHandler
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import ChatCard from "../../components/UI/ChatCard";
import { GiftedChat } from "react-native-gifted-chat";
import { v4 as uuidv4 } from "uuid";
import {pubnub} from '../../App'
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from "../../components/UI/InputToolBar";
import {
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
} from "../../components/UI/MessageContainer";

import COLORS from "../../constants/theme";
import * as chatActions from "../../store/actions/chats";

const ChatScreen = (props) => {
  const chatId = props.route.params.ChannelId;
  const userName = useSelector((state) => state.verifyauth.firstname);
  const userId = useSelector((state) => state.verifyauth.currentUserId);

  const channelData = useSelector((state) => state.channel.byId[chatId]);
  const channelMessages = useSelector((state) => state.messages.byId[chatId] || [] );

  //const channelMessages = state.getState().messages.byId[chatId];

  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const refContainer = useRef();
  const dispatch = useDispatch();



  const channelDataTest = useSelector((state) => state.channel);

  ////console.log(" CHANNEL id", chatId)


    // Sort pubnub messages first by timetoken.
  const CHANNELMESSAGES =  channelMessages?.sort((a,b) => b.timetoken - a.timetoken)

    
  // map out the gifted chat message objects 
  const messsageList =  CHANNELMESSAGES?.map((message) => message.message[0])

  

  // sort gifted chat objects and provide to component        
  const MESSAGESLIST = messsageList?.sort((a, b) => b.createdAt - a.createdAt)


  

 
  


                              
   const lastTimeToken = channelMessages?.length && channelMessages[0].timetoken
 
                



   


 //console.log("messges", CHANNELMESSAGES);

 console.log(" last time token ", lastTimeToken)



 
 




  const loadChat = useCallback(async () => {
         setError(null);
                      
                          setIsRefreshing(true);
                         // setIsLoading(true)
                          try {
                            await dispatch(chatActions.getchat(chatId));
                          } catch (err) {
                            setError(err);
                            setIsLoading(true)
                          }
                      
                          try {
                            await dispatch(chatActions.getmessage(chatId))
                      
                          } catch (err) {
                            setError(err.message);
                            setIsLoading(true);
                          } 
                    
                      
                          // setIsRefreshing(false);
                          console.log("lod")
                        }, [dispatch, setIsLoading, setError]);



 
  useEffect(() => {
    setIsLoading(true);
    loadChat().then(() => {
      setIsLoading(false);
  
    });
  }, [dispatch, loadChat]);

 
  

  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", loadChat);

    return () => {
      unsubscribe();
    };
  }, [loadChat]);



  



  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
      

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
   
      const setTimeToken =  async () => {
          try {
            pubnub.objects.setMemberships({
             
              channels: [
                {
                  id: chatId,
                  custom: {
                    lastReadTimetoken: lastTimeToken
                  }
                }
              ]
              
            },
            (status, results) => {
              //handle status, response
           //console.log("from setting time token 2 ", status);
              if(status === !200){
                  throw err
              }
             console.log("from setting timetoken on blur", results);
            
              
            }
            
            );
          } catch (err) {
            //console.log('error from action ', err);
            // send to custom analytics server
            throw err;
          }
        };
        if(lastTimeToken !== 0) {
        setTimeToken()
        };
      }


      
    }, [lastTimeToken])
  );


  useFocusEffect(
    useCallback(() => {
      // Do something when the screen is focused
     
      const setTimeToken =  async () => {
        try {
          pubnub.objects.setMemberships({
            channels: [
              
              {
                id: chatId,
                custom: {
                  lastReadTimetoken: lastTimeToken
                }
              }
            ]
            
          },
          (status, results) => {
            //handle status, response
            //console.log("from setting time token 1 ", status);
            if(status === !200){
                throw err
            }
          console.log("from setting timetoken focus", results);
          
            
          }
          
          );
        } catch (err) {
          //console.log('error from action focus ', err);
          // send to custom analytics server
          throw err;
        }
      };
      if(lastTimeToken !== 0) {
      setTimeToken()
      };
      

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
   
     
      }


      
    }, [lastTimeToken])
  );





  
  
  
  
  
  const messageSendHandler = async (message) => {
    let action;

    action = chatActions.sendMessage(message, chatId);
    setError(null);
    setIsLoading(false);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(true);
    }
  };

 
 
 
  /**
   * This generates random ids like this: 6b33fce8-1745-f8de-4ad8-4ee42585oprf
   */
  const guidGenerator = () => {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  };

  return (
      <GiftedChat
        renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
       // ref={() => refContainer}
        messages={MESSAGESLIST}
        onSend={(message) => messageSendHandler(message)}
        messageIdGenerator={guidGenerator}
       // inverted={false} // glitches scroll do not use
       // scrollToBottom={true}
        renderInputToolbar={renderInputToolbar}
        renderActions={renderActions}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderUsernameOnMessage={true}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderMessage={renderMessage}
        renderMessageText={renderMessageText}
        renderUsernameOnMessage={true}
        isAnimated={false}
        renderCustomView={renderCustomView}
        user={{
          _id: userId,
          name: userName,
        }}
      />

      

  );
};

export const screenOptions = (navData) => {
  return {
    headerTitle: navData.route.params.ChannelName,
  };
};

export default ChatScreen;
