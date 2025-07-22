import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { getChat } from "../utils/getChatGPT";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "Valorant",
  avatar: "https://static.wikia.nocookie.net/valorant/images/8/80/Valorant_Cover_Art.jpg/revision/latest?cb=20220827194300",
  role: "assistant"
};

const prompt = [
  {
    role: "system",
    content: `
`
  },
];

export default function BasicChatbot() {
  const [messages, setMessages] = useState([]);

  let APIFriendlyMessages = messages.map(msg => ({
    role: msg.user.role,
    content: msg.text
  }));

  APIFriendlyMessages.reverse();

  const convo = [...prompt, ...APIFriendlyMessages];

  async function fetchInitialMessage() {
    const response = await getChat(prompt);
    const message = response.choices[0].message;
    // console.log("message: ", message);
    const content = response.choices[0].message.content;
    // console.log("content: ", content);
    addBotMessage(content);
  }

  useEffect(() => {
    fetchInitialMessage();
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  async function fetchMessage() {
    const response = await getChat(convo);

    const content = response.choices[0].message.content;
    addBotMessage(content);
  }

  const respondToUser = (userMessages) => {
    console.log("User message text:", userMessages[0].text);
    let userMsgReform = {
      role: userMessages[0].user.role,
      content: userMessages[0].text
    }

    convo.push(userMsgReform);
    fetchMessage();
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);



  // console.log("this is the correct array:", APIFriendlyMessages);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "Username",
        role: "user"
      }}
      renderUsernameOnMessage={true}
    />
  );
}
