// import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform, Text } from "react-native";
import BasicChatbot from "../components/BasicChatbot";
import BakersChatbot from "../components/BakersChatbot";
import CohortChatbot from "../components/CohortChatbot";
import ChristineChatbot from "../components/ChristineChatbot";
import SixFlagsSnapChatbot from "../components/SixFlagsSnapChatbot";

// prettier-ignore
export const CHATBOTS = {
  "SixFlagsSnapChatbot": {
    id: "SixFlagsSnapChatbot",
    name: "SixFlags and Snap!",
    imageUrl: "https://drive.google.com/uc?export=view&id=1bIuA8zrvAigH1xJAE-cux82_qgkoahX8",
    developer: "Tsering and Alina",
    component: SixFlagsSnapChatbot,
  },
  "BasicChatbot": {
    id: "BasicChatbot",
    name: "Valorant",
    imageUrl: "https://i.pinimg.com/736x/51/d6/de/51d6def892f689d44a7ab1db6b090715.jpg",
    developer: "Developer",
    component: BasicChatbot,
  },
  "BakersChatbot": {
    id: "BakersChatbot",
    name: "Baker's Dog Trivia",
    imageUrl: "https://img.freepik.com/free-vector/cute-dog-robot-cartoon-character-animal-technology-isolated_138676-3143.jpg?w=150",
    developer: "Baker",
    component: BakersChatbot,
  },
  "CohortChatbot": {
    id: "CohortChatbot",
    name: "SEA 2025 Cohort Trivia",
    imageUrl: "https://cdn.prod.website-files.com/5ff8fc486c14537c168fc87d/6864180d7cc60b4eb8e4b1ff_SEA-Web.png",
    developer: "Tsering",
    component: CohortChatbot,
  },
  "ChristineChatbot": {
    id: "ChristineChatbot",
    name: "Animal Trivia!",
    imageUrl: "https://previews.123rf.com/images/azuzl/azuzl2205/azuzl220500064/185561606-underwater-world-simple-square-background-with-the-stones-sponges-corals-color-variation-for.jpg",
    developer: "Christine",
    component: ChristineChatbot,
  },
};

export default function ChatScreen({ route }) {
  const { chatbotName } = route.params;

  const makeChatbotComponent = (chatbotName) => {
    if (CHATBOTS[chatbotName]) {
      const Chatbot = CHATBOTS[chatbotName].component;
      return <Chatbot />;
    } else {
      return <Text>No Chatbot Found with name '{chatbotName}'</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {makeChatbotComponent(chatbotName)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
