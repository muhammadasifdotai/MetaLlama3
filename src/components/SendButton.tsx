import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import useKeyboardOffsetHeight from '../helpers/useKeyboardOffsetHeight';
import {useDispatch, useSelector} from 'react-redux';
import {
  addMessage,
  createNewChat,
  selectChats,
  selectCurrentChatId,
} from '../redux/reducers/chatSlice';
import {PaperAirplaneIcon} from 'react-native-heroicons/solid';
import uuid from 'react-native-uuid';

// Dimension: is ki madat say hum device ki heigh check kr lain gay.
const windowHeight = Dimensions.get('window').height;

export default function SendButton({
  isTyping,
  setIsTyping,
  setCurrentChatId,
  length,
  setHeightOfMessageBox,
  messages,
}): JSX.Element {
  const dispatch = useDispatch();
  const currentChatId = useSelector(selectCurrentChatId);
  const animationValue = useRef(new Animated.Value(0)).current;
  const chats = useSelector(selectChats);

  const [message, setMessage] = useState('');
  const keyboadOffsetHeight = useKeyboardOffsetHeight();

  const handleTextChange = text => {
    setIsTyping(!!text); // is ka matlab hay kay initially ap kush type nhi kr rhay ho or send button show nhi ho rha hay.
    setMessage(text);
  };

  const handleContentSizeChange = event => {
    setHeightOfMessageBox(event.nativeEvent.contentSize.height);
  };

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isTyping ? 1 : 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [isTyping]);

  const sendButtonStyle = {
    opacity: animationValue,
    transform: [
      {
        scale: animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
  };

  const addChat = async newId => {
    let selectedChatId = newId ? newId : currentChatId;
    await dispatch(
      addMessage({
        chatId: selectedChatId,
        message: {
          content: message,
          time: new Date().toString(),
          role: 'user',
          id: length + 1,
          isMessageRead: false, // blue tick false hoga.
        },
      }),
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          bottom:
            Platform.OS === 'android'
              ? windowHeight * 0.02
              : Math.max(keyboadOffsetHeight, windowHeight * 0.02),
        },
      ]}>
      <View style={styles.subContainer}>
        <View
          style={[styles.inputContainer, {width: isTyping ? '87%' : '100%'}]}>
          <TextInput
            editable
            multiline
            placeholder="Message"
            placeholderTextColor="#fff"
            onChangeText={handleTextChange}
            onContentSizeChange={handleContentSizeChange}
            style={styles.textInput}
          />
          {isTyping && (
            <Animated.View style={[styles.sendButtonWrapper, sendButtonStyle]}>
              <TouchableOpacity
                style={styles.SendButton}
                onPress={async () => {
                  const chatIndex = chats.findIndex(
                    chat => chat.id == currentChatId,
                  ); // neechay code ka matlab hay kay, jub chat nhi to new chat create kro , (-1) ka yahi matlab hay.
                  if (chatIndex === -1) {
                    let newId = uuid.v4();
                    setCurrentChatId(newId);
                    await dispatch(
                      createNewChat({
                        chatId: newId,
                        messages: [],
                        summary: 'New Chat',
                      }),
                    );
                    addChat(newId)
                    return
                  }
                }}>
                <PaperAirplaneIcon color="#000" />
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: windowHeight * 0.06,
    maxHeight: windowHeight * 0.4,
    paddingHorizontal: '1%',
    padding: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    width: '98%',
    alignContent: 'center',
  },
  inputContainer: {
    maxHeight: windowHeight * 0.2,
    backgroundColor: '#232623',
    margin: '1%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '1%',
    borderRadius: 20,
  },
  textInput: {
    width: '98%',
    padding: 10,
    marginHorizontal: '2%',
    fontSize: 13,
    color: '#fff',
  },
  subContainer: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  sendButtonWrapper: {
    position: 'absolute',
    right: 0,
    bottom: 6,
    width: '11%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  SendButton: {
    backgroundColor: '#22c063',
    borderRadius: 42,
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
