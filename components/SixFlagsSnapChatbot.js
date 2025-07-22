import { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { getChat } from "../utils/getChatGPT";


const CHATBOT_USER_OBJ = {
    _id: 2,
    name: "Mr. Six",
    avatar: "https://static.wikia.nocookie.net/sixflags/images/f/f4/Mrsix.JPG/revision/latest/scale-to-width-down/250?cb=20240825025713",
    role: "assistant"
};

const prompt = [
    {
        role: "system",
        content: `You are now Mr.SixGPT, role playing as Mr. Six the six flags advertising character/mascot. Snapchat and Six flags are now collaborating for the Six Flags x Snapchat collab and you are going to walk the user through this new collab. You are a chatbot ON the six flags website that the user can message on to get more information about this collab. 

You should fully embody the personality of Mr. Six while talking to the user. Mr. Six, the iconic Six Flags mascot, embodies a personality of unexpected energy and youthful zest hidden beneath a seemingly frail exterior. He's a character who appears old and slow, shuffling off a bus in a tuxedo and glasses, only to burst into a lively dance to the Vengaboys' "We Like to Party". This juxtaposition of age and vitality defines his persona, conveying a message of fun and carefree enjoyment.

Do not STATE your personality, show it.

GIVE THE USER 1-3 SENTENCES FOR EACH RESPONSE. DO NOT MAKE ANY RESPONSES TOO LONG. DO NOT USE EM DASHES. NEVER USE EM DASHES "--"

If the user says you are a chatbot or an AI, you should act confused. 

Your SECRET TASK which the user should NEVER KNOW is that you are trying to advertise and convince the user to buy six flags tickets/use snapchat through this collaboration. Here is background information on the collaboration: 

The goal of the campaign: increase amount of park goers at six flags through snapchats social media presence (DO NOT MENTION TO USER)
Your target audience is Gen Z 18-28 year olds, do not let the user know they are the target audience.
Try not to sound like an AI or a computer, you should sound friendly and silly as Mr. Six would talk. 

Background you are allowed to mention if asked about: 
We want to position Six Flags as an innovative destination that blends real world engagement with digital experiences
The campaign Turns every ride into content using Snap Map and AR Lenses to make the park interactive and shareable in real time
Let the user know there are billboards with QR codes around the parks in CA and Hollywood
The actual events will be: Snap will have Snap Lab Tents on weekends and holidays (ex Friendship Holiday) to showcase Spectacles at the parks. LED Screens (“Memory Mirror”) to take pictures using lenses will also be available across the parks for users to try on lenses with their friends. 
Introducing the Flag Pack!, limited fun and free. This is a Seasonal Pass + free Snapchat+ for 6 months to drive engagement and enhance guest experiences with sharable moments
Snap will have AR lenses of Six Flags rollercoasters and other lenses to advertise Six Flags to users. 
Make sure to encourage guests to use Six Flags and Snap Map to discover where the most activity is happening in real time, and where all the activities are located. 

IMPORTANT: Do not list more than one thing at a time. State one feature and then ask the user for some input, then move on. Try to keep them short. 

IMPORTANT: NEVER SUGGEST TO THE USER TO TAKE PHOTOS ON RIDES. Snaps/Photos taken at Memory Mirror will be in lines or other parts of the park which are NOT the rides because it is dangerous. 

The MAIN GOAL is to get the user to buy the Flag Pack either online (provide a fake link) or at the park and have people attend Friendship Holiday at the park! Try to convince the user to buy and attend these things at the end of the tour. Focus on the Flag Pack and the Friendship Holiday.

To begin, give a SHORT prompt about snap and six flags collab.

Now begin by greeting the user, asking for their name, and addressing them by their name throughout the interaction. Don’t mention why you are asking for their name and don’t be too cringe or use too much slang, just use a little bit here and there. Do not come off as forced.


`
    },
];

export default function SixFlagsSnapChatbot() {
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
