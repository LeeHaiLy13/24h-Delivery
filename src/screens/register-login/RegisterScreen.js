import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  Text,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phonenum, setPhonenum] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      const userId = user.uid;

      // Lưu dữ liệu vào Realtime Database
      const database = getDatabase();
      const userRef = ref(database, "users/" + userId);
      const userDataForRealtimeDB = {
        name: name,
        phone: phonenum,
        email: email,
        password: password,
      };
      set(userRef, userDataForRealtimeDB);

      // Lưu dữ liệu vào Cloud Firestore
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", userId);
      const userDataForFirestore = {
        name: name,
        phone: phonenum,
        email: email,
        password: password,
      };
      await setDoc(userDocRef, userDataForFirestore);

      navigation.replace("LoginScreen");
    } catch (error) {
      console.error("Lỗi trong quá trình đăng ký:", error);
      alert(
        "Đăng ký thất bại. Vui lòng kiểm tra thông tin của bạn và thử lại."
      );
    }
  };
  const data = [];
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.img}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={{ width: 180, height: 180 }}
        />
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text>{item.value}</Text>}
        keyExtractor={(item) => item.key}
      />
      <Input
        placeholder="Tên đăng ký"
        leftIcon={{ name: "people", type: "material" }}
        value={name}
        onChangeText={(text) => setName(text)}
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
        placeholder="Email"
        leftIcon={{ name: "email", type: "material" }}
        value={email}
        onChangeText={(text) => setEmail(text)}
        inputContainerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Mật khẩu"
        leftIcon={{ name: "lock", type: "material" }}
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        inputContainerStyle={styles.inputContainer}
      />
      <Button title="Register" buttonStyle={styles.button} onPress={register} />
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
    marginTop: 10,
  },
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
  img: {
    marginBottom: 20,
  },
});
