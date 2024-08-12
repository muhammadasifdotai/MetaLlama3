import React, {useState} from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import WABG from './assets/w_bg.png';
import CustomHeader from './components/CustomHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  changeCurrentChatId,
  selectChats,
  selectCurrentChatId,
} from './redux/reducers/chatSlice';
import SendButton from './components/SendButton';

// MetaAI: navigation ki tarah work kray ga sub yahi control kray ga.

export default function MetaAI(): JSX.Element {
  const dispatch = useDispatch();
  const chats = useSelector(selectChats);
  // const chats = useSelector(state => state)
  const currentChatId = useSelector(selectCurrentChatId);
  //console.log(chats, currentChatId) // for checking Redux setup or not

  const [isTyping, setIsTyping] = useState(false);
  const [heightOfMessageBox, setHeightOfMessageBox] = useState(0);

  const setCurrentChatId = id => {
    dispatch(changeCurrentChatId({chatId: id}));
  };

  console.log(JSON.stringify(chats));

  return (
    <ImageBackground source={WABG} style={styles.container} resizeMode="cover">
      <CustomHeader />
      <SendButton
        isTyping={isTyping}
        setHeightOfMessageBox={setHeightOfMessageBox}
        heightOfMessageBox={heightOfMessageBox}
        setIsTyping={setIsTyping}
        currentChatId={currentChatId}
        setCurrentChatId={id => setCurrentChatId(id)} // jo child `sendButton` hay us say humay mili gi Id, or us ko parent component Meta Ai may set kr dain gay.
        length={
          chats?.find(chat => chat.id == currentChatId)?.messages?.length ||
          [].length
        }
        messages={chats?.find(chat => chat.id == currentChatId)?.messages || []}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
});
