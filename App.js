import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Themes } from "./assets/Themes";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ChatScreen, { CHATBOTS } from "./screens/ChatScreen";
import ChatList from "./components/ChatList";

const Stack = createStackNavigator();

export default function App() {

  // const chatNames = <ChatList chats={Object.values(CHATBOTS.name)} />

  // console.log(CHATBOTS);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    // <HomeScreen />
  );
}
