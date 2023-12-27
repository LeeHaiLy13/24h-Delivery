import { View, Text, StyleSheet, Image, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import { Input, Button } from "react-native-elements";
import {} from "../../FirebaseConfig";
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, phonenum, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed in:", user);
      } else {
        console.log("User signed out");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ width: 180, height: 180 }}
        />
      </View>
      <Input
        placeholder="Email"
        leftIcon={{ name: "email", type: "material" }}
        value={email}
        onChangeText={(text) => setEmail(text)}
        inputContainerStyle={styles.inputContainer}
      />
      <Input
        placeholder=" Số điện thoại"
        leftIcon={{ name: "phone", type: "material" }}
        value={phonenum}
        onChangeText={(text) => setPhonenum(text)}
        inputContainerStyle={styles.inputContainer}
      />

      <Input
        placeholder=" Mật Khẩu"
        leftIcon={{ name: "lock", type: "material" }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        inputContainerStyle={styles.inputContainer}
      />

      <Button
        title="Đăng nhập"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("HomeScreen")}
      />

      <Button
        title="Đăng ký"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate("RegisterScreen")}
      />
      <Text style={styles.or}> Hoặc </Text>
      <View style={styles.other}>
        <Entypo name="facebook" size={40} color="black" />
        <FontAwesome
          name="google-plus-square"
          size={40}
          color="black"
          style={styles.icon}
        />
        <FontAwesome name="apple" size={40} color="black" />
      </View>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    marginTop: 15,
  },
  img: {},
  button: {
    width: 150,
    marginTop: 10,
    borderRadius: 30,
    backgroundColor: "#FF4500",
  },
  inputContainer: {
    borderBottomWidth: 0, // Remove the underline
    borderRadius: 30,
    backgroundColor: "white", // Background color of the input container
    paddingHorizontal: 15,
  },
  other: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 20,
  },
  or: {
    marginTop: 30,
    fontSize: 16,
  },
});
