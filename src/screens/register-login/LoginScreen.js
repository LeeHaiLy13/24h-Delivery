import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { Input, Button } from "react-native-elements";
import { } from "../../../FirebaseConfig";
import color from '../../constants/color';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((error) => {
        Alert.alert(null, 'Email hoặc Mật khẩu không đúng! Vui lòng thử lại', [
          { text: 'Đăng nhập lại', },
        ]);
      });
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigation.replace('MainTabNavigator');
      } else {
        // console.log("User signed out");
      }
    });
    navigation.setOptions({ headerShown: false });
    return unsubscribe;
  });

  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../../../assets/images/logo.png')} style={{ width: 150, height: 150 }} />
      </View>
      <View style={styles.title}>
        <Text style={{ fontWeight: 'bold', fontSize: 28, letterSpacing: 1, }}>
          Giao hàng 24h
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          placeholder="Email"
          leftIcon={{ name: "email", type: "material" }}
          value={email}
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          inputContainerStyle={styles.inputField}
        />
        {/* <Input
          placeholder=" Số điện thoại"
          leftIcon={{ name: "phone", type: "material" }}
          value={phonenum}
          onChangeText={(text) => setPhonenum(text)}
          inputContainerStyle={styles.inputField}
        /> */}
        <Input
          placeholder="Mật Khẩu"
          leftIcon={{ name: "lock", type: "material" }}
          value={password}
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          inputContainerStyle={styles.inputField}
        />
      </View>
      <Button title="Đăng nhập" buttonStyle={styles.button} onPress={signIn} />
      {/* <Button title="Vô tạm" buttonStyle={styles.button} onPress={() => navigation.navigate('MainTabNavigator')} /> */}
      {/* <Text style={{ fontSize: 16, marginVertical: marginSmall, }}>
        Hoặc
      </Text>
      <View style={{ flexDirection: 'row', gap: 60, margin: 15, }}>
        <FontAwesome5 name="facebook" size={40} color="black" />
        <FontAwesome5 name="google" size={40} color="black" />
        <AntDesign name="apple1" size={40} color="black" />
      </View> */}
      {/* <View style={{ marginTop: marginSmall * 2, }}>
        <Text style={{ color: color.PRIMARY_COLOR }}>Quên mật khẩu</Text>
      </View> */}
      <TouchableOpacity style={{ marginVertical: marginSmall / 2, }} onPress={() => navigation.navigate('RegisterScreen')}>
        <Text style={{ color: color.PRIMARY_COLOR, letterSpacing: 0, }}>Chưa có tài khoản? Đăng kí ngay</Text>
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
  title: {
    margin: 15,
  },
});
