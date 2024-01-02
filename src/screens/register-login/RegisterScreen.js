import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { Input, Button } from "react-native-elements";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import Checkbox from 'expo-checkbox';
import color from '../../constants/color';
import { FIREBASE_AUTH } from "../../../FirebaseConfig";


export default function RegisterScreen({ navigation }) {
  const [isChecked, setChecked] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    setLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      const userID = userCredentials.user.uid;
      const docRef = doc(getFirestore(), 'users', userID);
      await setDoc(docRef, {
        // avatarUrl: avatar ? avatar : 'https://thumbs.dreamstime.com/b/businessman-avatar-line-icon-vector-illustration-design-79327237.jpg',
        username,
        password,
        userID,
        email
      });
      // Alert.alert(null, 'Đăng kí thành công', [
      //   { text: 'Đăng nhập ngay', onPress: () => navigation.replace("LoginScreen") },
      // ]);
    } catch (error) {
      Alert.alert(null, 'Email hoặc mật khẩu không hợp lệ')
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, []);

  // const registerUser = async () => {
  //   try {
  //     const auth = getAuth();
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       email,
  //       password
  //     );

  //     const user = userCredential.user;
  //     const userId = user.uid;

  //     // Lưu dữ liệu vào Realtime Database
  //     const database = getDatabase();
  //     const userRef = ref(database, "users/" + userId);
  //     const userDataForRealtimeDB = {
  //       name: username,
  //       email: email,
  //       password: password,
  //     };
  //     set(userRef, userDataForRealtimeDB);

  //     // Lưu dữ liệu vào Cloud Firestore
  //     const firestore = getFirestore();
  //     const userDocRef = doc(firestore, "users", userId);
  //     const userDataForFirestore = {
  //       name: username,
  //       email: email,
  //       password: password,
  //     };
  //     await setDoc(userDocRef, userDataForFirestore);
  //     Alert.alert(null, 'Đăng kí thành công', [
  //       {text: 'Đăng nhập ngay', onPress: () => navigation.replace("LoginScreen")},
  //     ]);
  //   } catch (error) {
  //     Alert.alert(null, 'Email hoặc mật khẩu không hợp lệ')
  //   }
  // };
  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <Image source={require('../../../assets/images/logo.png')} style={{ width: 150, height: 150 }} />
      </View>
      <View style={styles.title}>
        <Text style={{ fontWeight: 'bold', fontSize: 28, }}>
          Tạo tài khoản
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Tên người dùng"
          leftIcon={{ name: "people", type: "material" }}
          value={username}
          onChangeText={(text) => setUsername(text)}
          inputContainerStyle={styles.inputField}
        />
        <Input
          placeholder="Email"
          leftIcon={{ name: "email", type: "material" }}
          value={email}
          onChangeText={(text) => setEmail(text)}
          inputContainerStyle={styles.inputField}
        />
        <Input
          placeholder="Mật khẩu"
          leftIcon={{ name: "lock", type: "material" }}
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          inputContainerStyle={styles.inputField}
        />
      </View>
      {/* <View style={styles.textinputGroup}>
        <View style={styles.textinput}>
          <TextInput placeholder="Email (tùy chọn)" style={{ fontSize: 18 }}></TextInput>
        </View>
        <View style={styles.textinput}>
          <TextInput placeholder="Mật khẩu" style={{ fontSize: 18 }}></TextInput>
        </View>
        <View style={styles.textinput}>
          <TextInput placeholder="Nhập lại mật khẩu" style={{ fontSize: 18 }}></TextInput>
        </View>
      </View> */}
      {/* <View style={styles.section}>
        <Checkbox
          style={styles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? color.PRIMARY_COLOR : undefined}
        />
        <Text style={styles.paragraph}>Đồng ý với điền khoản sử dụng dịch vụ và chính sách bảo mật của chúng tôi</Text>
      </View> */}
      {/* <Button title="Đăng kí" buttonStyle={styles.button} onPress={() => navigation.navigate('LoginScreen')} /> */}
      {loading
        ? <ActivityIndicator size={'large'} color={color.SECONDARY_COLOR} />
        : <Button title="Đăng kí" buttonStyle={styles.button} onPress={registerUser} />
      }
      <TouchableOpacity style={{ marginVertical: marginSmall / 2, }} onPress={() => navigation.navigate('LoginScreen')}>
        <Text style={{ color: color.PRIMARY_COLOR, letterSpacing: 0, }}>Đã có tài khoản? Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  );
};

const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);
const marginSmall = Math.round((deviceWidth * 0.05) / 2);
const paddingSmall = marginSmall;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: deviceHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginVertical: marginSmall,
  },
  inputContainer: {
    marginTop: 12,
    marginBottom: 0,
  },
  inputField: {
    width: deviceWidth * 0.8,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginVertical: -6,
  },
  button: {
    width: deviceWidth * 0.8,
    borderRadius: 30,
    backgroundColor: color.PRIMARY_COLOR,
    padding: paddingSmall,
  },
  section: {
    // backgroundColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    width: deviceWidth * 0.8,
    marginLeft: -16,

  },
  paragraph: {
    // backgroundColor: '#ccc',
    width: 310,
    marginVertical: marginSmall / 2,
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
