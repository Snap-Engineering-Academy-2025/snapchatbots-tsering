import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import { Themes } from "../assets/Themes";
import { useNavigation } from "@react-navigation/native";

const DevName = ({ DevName }) => {
  return (
    <Text style={styles.devNames} numberOfLines={1}>
      {/* {DevName.map(({ name }) => `${name}`).join(", ")} */}
      {DevName}
    </Text>
  );
};

const Chat = ({
  index,
  imageUrl,
  chatTitle,
  devName,
  chatName,
}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() =>
        navigation.navigate("ChatScreen", {
          // this is a "quick and dirty" hack for the moment, we'll want to rename our properties later
          chatbotName: chatName,
        })
      }
    >
      <View style={styles.chat}>
        <Text style={styles.index}>{index + 1}</Text>
        <Image
          style={[styles.image, styles.chatImage]}
          source={{ uri: imageUrl }}
        />
        <View style={styles.devNameContainer}>
          <Text style={[styles.chatTitle]} numberOfLines={1}>
            {chatTitle}
          </Text>
          <DevName DevName={devName} />
        </View>
        <Text style={[styles.chatName]} numberOfLines={1}>
          {chatName}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chat: {
    display: "flex",
    flexDirection: "row",
    padding: 5,
    alignItems: "center",
    width: "100%",
    justifyContent: "flex-start",
  },
  index: {
    color: Themes.colors.gray,
    flex: 0.05,
    textAlign: "center",
    fontSize: 12,
    margin: 1,
  },
  chatImage: {
    resizeMode: "contain",
    flex: 0.2,
    width: 50,
    height: 50,
  },
  devNameContainer: {
    flex: 0.4,
    margin: 5,
  },
  chatTitle: {
    color: Themes.colors.white,
    fontSize: 12,
  },
  devNames: {
    color: Themes.colors.gray,
    fontSize: 12,
  },
  chatName: {
    color: Themes.colors.white,
    flex: 0.25,
    fontSize: 12,
    margin: 5,
  },
});

export default Chat;