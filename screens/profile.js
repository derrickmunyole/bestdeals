import React, { useContext } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { EvilIcons } from "@expo/vector-icons";
import { Button, Divider } from "react-native-paper";
import ItemCardComponent from "../components/ItemCardComponent";
import ReviewComponent from "../components/ReviewComponent";
import ButtonComponent from "../components/ButtonComponent";
import AuthContext from "../auth/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

function ProfileScreen(props) {
  const { token } = useContext(AuthContext);

  const logOutUser = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            { name: "AuthStack" }, // name of your Auth stack
          ],
        })
      );
    } catch (error) {
      console.log("Failed to log out", error);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*Profile section*/}
        <View style={styles.profilecontainer}>
          <EvilIcons
            style={styles.placeholder}
            name="user"
            size={128}
            color="grey"
          />
          <Text>John Doe</Text>
          <Text>@testuser</Text>
          <Text>test@testemail.com</Text>
          <TouchableOpacity>
            <Button>Edit Profile</Button>
          </TouchableOpacity>
        </View>
        {/*Recent Saves*/}
        <View style={styles.SavedItems}>
          <Text style={styles.profileHeaderText}>Recent Saves</Text>
          <View style={styles.recentsaves}>
            <ItemCardComponent />
            <ItemCardComponent />
          </View>
        </View>

        {/*Recent Review*/}
        <View style={styles.recentreviews}>
          <Text style={styles.profileHeaderText}>Recent Reviews</Text>
          <ReviewComponent
            text={
              "The ABC Smartwatch has completely transformed my daily routine! Its sleek design looks fantastic on my wrist, and the customizable watch faces are a fun way to express my style. The fitness tracking features are accurate, and the heart rate monitor has encouraged me to stay on top of my health goals. Plus, I can receive notifications and make calls without taking out my phone. This smartwatch has become an essential part of my life, making it easier to stay connected and healthy."
            }
            numberOfLines={2}
          />
          <ReviewComponent
            text={
              "I had high expectations for the EFG Coffee Maker, but I'm left feeling underwhelmed. The coffee it brews is okay, but it lacks the depth and richness I was hoping for. The water reservoir is small, so I have to refill it frequently when making coffee for guests. The machine also tends to be quite noisy during the brewing process, which can be disruptive in the morning. Considering the price, I was expecting a superior coffee experience, and this falls short of that."
            }
            numberOfLines={2}
          />
        </View>
        <Divider />
        <View style={styles.otherControls}>
          <Text style={[styles.profileHeaderText, styles.UserSettingsHeader]}>
            User settings
          </Text>
          <View style={styles.toggleElements}>
            <Text>Enable notifications</Text>
            <Switch style={styles.switchelement} />
          </View>
          <Divider />
          <View style={[styles.toggleElements, styles.socials]}>
            <Text>Enable socials</Text>
            <Switch style={styles.switchelement} />
          </View>
          <TouchableOpacity onPress={() => logOutUser()}>
            <ButtonComponent text={"Logout"} style={styles.logoutButton} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ProfileScreen;

const styles = StyleSheet.create({
  profilecontainer: {
    marginTop: 24,
    alignItems: "center",
    gap: 12,
  },
  logoutButton: {
    marginBottom: 24,
  },
  SavedItems: {
    marginTop: 24,
    paddingHorizontal: 20,
    gap: 8,
  },
  profileHeaderText: {
    fontWeight: "600",
  },
  recentreviews: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  recentsaves: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  toggleElements: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otherControls: {
    paddingHorizontal: 20,
  },
  socials: {
    marginTop: 16,
    marginBottom: 24,
  },
  switchelement: {
    marginTop: -16,
  },
  UserSettingsHeader: {
    marginTop: 24,
    marginBottom: 16,
  },
});
