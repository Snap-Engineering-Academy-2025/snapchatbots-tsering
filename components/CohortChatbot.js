import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { SafeAreaProvider } from "react-native-safe-area-context";

const questions = [
    {
        id: "0",
        question: "What are the little cat figurines on Tsering's desk called?",
        answer: "mofusand",
        hint: "fill in the stars: m*fus*nd"
    },
    {
        id: "1",
        question: "What are the green guys on Tiff's desk called?",
        answer: "smiski",
        hint: "fill in the stars: s**sk*"
    },
    {
        id: "2",
        question: "What franchise are the figures on Danny's desk from",
        answer: "pokemon",
        hint: "look at his desk"
    },
    // {
    //   id: "2",
    //   question: "Which Reality TV Show is Amaya Papaya from?",
    //   answer: "love island"
    // },
    {
        id: "3",
        question: "Who is the goat at recursion?",
        answer: "christine",
        hint: "she sent a video to everyone of her professors lecture on this"
    },
    {
        id: "4",
        question: "Who recently ran a half marathon?",
        answer: "nicole",
        hint: "she mentioned it in counsel and has a nike necklace from it"
    },
    {
        id: "5",
        question: "Who is 'Ascendant' in Valorant?",
        answer: "adan",
        hint: "he made a trivia game show website about this game"
    },
    {
        id: "6",
        question: "Who has a rubik's cube on their desk?",
        answer: "elijah",
        hint: "look at all the desks"
    },
    {
        id: "7",
        question: "Who doordashed a pink sweatshirt because they got FOMO?",
        answer: "vanessa",
        hint: "she has mini flowers on her desk"
    },
    {
        id: "8",
        question: "Who has all the stamps?",
        answer: "jo",
        hint: "she's a musical fanatic"
    },
    {
        id: "9",
        question: "Who made a website about JPOP?",
        answer: "ricardo",
        hint: "he wears a full uniqlo outfit daily"
    },
    {
        id: "10",
        question: "Who was a farmer :P",
        answer: "jake",
        hint: "he didn't have a chillah cribz"
    },
    {
        id: "11",
        question: "Who loves the spicy milanese sandwich from Porto's",
        answer: "chanho",
        hint: "he mentioned this at counsel"
    },
    {
        id: "12",
        question: "Who made Pho last weekend?",
        answer: "gev",
        hint: "she mentioned this at counsel + went to anime con"
    },
    {
        id: "13",
        question: "Who made a game show website text adventure game?",
        answer: "alejandro",
        hint: "it's more of a cat detective type game"
    },
    {
        id: "14",
        question: "Who has Hello Kitty hanging on their rearview mirror?",
        answer: "audrey",
        hint: "she almost ran over adan and danny in her car"
    }
]


const CHATBOT_USER_OBJ = {
    _id: 2,
    name: "SEA Cool Guy Ghost",
    avatar: "https://www.citypng.com/public/uploads/preview/snapchat-cute-emoji-cartoon-ghost-with-sunglasses-tongue-png-image-701751694951507sncoaylkpj.png",
};

export default function CohortChatbot() {
    const [messages, setMessages] = useState([]);
    const [triviaQ, setTriviaQ] = useState(0);

    useEffect(() => {
        console.log("App mounted, initializing chat...");
        if (messages.length < 1) {
            // Add a "starting message" when chat UI first loads
            addBotMessage(
                "Hello, welcome to SEA trivia! How well do you know the cohort??? Say 'Yes' when you're ready to play!"
            );
        }
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

    const respondToUser = (userMessages) => {

        console.log("Recent user msg:", userMessages[0].text);


        //starting game loop
        if (triviaQ == 0) {

            if (userMessages[0].text.toLowerCase() == "yes") {
                addBotMessage(questions[0].question);
                setTriviaQ(1);
            } else {
                addBotMessage("Please say yes to start");
            }
            return;

        }

        if (userMessages[0].text.toLowerCase() == "h") {
            addBotMessage(questions[triviaQ - 1].hint);
            return;
        }

        //game loop
        while (triviaQ < questions.length) {

            if (userMessages[0].text.toLowerCase() == questions[triviaQ - 1].answer) {
                addBotMessage("Correct!");
                addBotMessage(questions[triviaQ].question);
                setTriviaQ(triviaQ + 1);
            }
            else {
                addBotMessage("WRONG! try again...");
                addBotMessage("Press 'h' for a hint!");
            }
            return;
        }

        //end of game loop
        if (triviaQ == questions.length) {
            if (userMessages[0].text.toLowerCase() == questions[questions.length - 1].answer) {
                addBotMessage("Correct! Game Over, play again?");
                setTriviaQ(0);
            }
            else {
                addBotMessage("WRONG! try again...");
                addBotMessage("Press 'h' for a hint!");
            }
            return;
        }
    };

    const onSend = useCallback((messages = []) => {
        addNewMessage(messages);
    }, []);

    return (
        <SafeAreaProvider style={{ marginBottom: 50 }}>
            <GiftedChat
                messages={messages}
                onSend={(messages) => {
                    onSend(messages);
                    // Wait a sec before responding
                    setTimeout(() => respondToUser(messages), 1000);
                }}
                user={{
                    _id: 1,
                    name: "SEA",
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
