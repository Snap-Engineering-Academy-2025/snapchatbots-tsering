import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaProvider } from "react-native-safe-area-context";
import triviaBank from "./AnimalTriviaBank.json";


const CHATBOT_USER_OBJ = {
    _id: 2,
    name: "Inky the Trivia Master",
    avatar: "https://www.johnschwegel.com/wp-content/uploads/2016/08/octopus-cover.png",
};
export default function ChristineChatbot() {
    const [messages, setMessages] = useState([]);
    const [answer, setAnswer] = useState([]);
    const [qCount, setCount] = useState(0)
    const [beginMessage, setBeginMessage] = useState(true)
    useEffect(() => {
        if (messages.length < 1) {
            // Add a "starting message" when chat UI first loads
            addBotMessage(
                "Hi I'm Inky! Welcome to the silly animal trivia game. Say 'Yes' when you're ready to play!"
            );
        }
    }, []);
    const addNewMessage = (newMessages) => {
        setMessages((previousMessages) => {
            //console.log("PREVIOUS MESSAGES:", previousMessages);
            //console.log("NEW MESSAGE:", newMessages);
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
    const getQuestion = (qCount) => {
        if (qCount <= triviaBank.trivia.length - 1) {
            setAnswer(triviaBank.trivia[qCount].check)
            return triviaBank.trivia[qCount].question
        }
        else {
            return triviaBank.end[0].message
        }
    }
    const checkAnswer = (msg) => {
        if (msg != answer)
            return triviaBank.trivia[qCount].IncorrectAnswer
        else
            return "Correct! Next Question"
    }
    const respondToUser = (userMessages) => {
        console.log("Recent user msg:", userMessages[0].text);
        cleanedUserMessage = userMessages[0].text.toLowerCase()
        if (beginMessage == true) {
            if (cleanedUserMessage != "yes")
                addBotMessage("Please say 'Yes' to start playing trivia!")
            else {
                setBeginMessage(false)
                addBotMessage(getQuestion(qCount))
            }
        }
        if (beginMessage == false) {
            addBotMessage(checkAnswer(cleanedUserMessage))
            const nextCount = qCount + 1
            setCount(nextCount)
            addBotMessage(getQuestion(nextCount))
        }
    };
    const onSend = useCallback((messages = []) => {
        addNewMessage(messages);
    }, []);
    return (
        <SafeAreaProvider>
            <GiftedChat
                messages={messages}
                onSend={(messages) => {
                    onSend(messages);
                    // Wait a sec before responding
                    setTimeout(() => respondToUser(messages), 1000);
                }}
                user={{
                    _id: 1,
                    name: "Chilla",
                }}
                renderUsernameOnMessage={true}
            />
        </SafeAreaProvider>
    );
}
// Workaround to hide an unnessary warning about defaultProps
const error = console.error;
console.error = (...args) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
};