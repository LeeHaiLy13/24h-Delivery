import React, { useState, useEffect } from "react";
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View, } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { updateProfile } from 'firebase/auth';
import { Button, Input, Overlay } from 'react-native-elements';
import SeperatorLine from '../../components/SeperatorLine';

export default function EditProfile() {
  const [isEditing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [currentUsername, setCurrentUsername] = useState(
    FIREBASE_AUTH.currentUser?.displayName || "Tên người dùng"
  );
  console.log(FIREBASE_AUTH.currentUser)

  useEffect(() => {
    setCurrentUsername(FIREBASE_AUTH.currentUser?.displayName || "Tên người dùng");
  }, [isEditing]);

  const handleSave = async () => {
    try {
      if (newUsername.trim() === "") {
        Alert.alert("Lỗi", "Vui lòng nhập tên mới.");
        return;
      }
      if (newPwd.trim() === "") {
        Alert.alert("Lỗi", "Vui lòng nhập mật khẩu mới.");
        return;
      }

      await updateProfile(FIREBASE_AUTH.currentUser, { displayName: newUsername });
      await updateProfile(FIREBASE_AUTH.currentUser, { displayName: newPwd });
      setEditing(false);
      setCurrentUsername(newUsername);
      setNewUsername("");
      Alert.alert("Thông báo", "Tên đã được cập nhật thành công.");
    } catch (error) {
      console.error("Lỗi cập nhật tên:", error.message);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra khi cập nhật tên. Vui lòng thử lại.");
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setNewUsername("");
  };

  return (
    <View style={styles.editProfileContainer}>
      <TouchableOpacity style={styles.editProfileItem} onPress={() => setEditing(true)} disabled={isEditing}>
        <Text>Tên</Text>
        {isEditing ? (
          <Input
            placeholder="Nhập tên mới"
            leftIcon={{ name: "edit", type: "font-awesome" }}
            value={newUsername}
            autoCapitalize="none"
            onChangeText={(text) => setNewUsername(text)}
            inputContainerStyle={styles.inputField}
          />
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{currentUsername}</Text>
          </View>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.editProfileItem} onPress={() => setEditing(true)} disabled={isEditing}>
        <Text>Tên</Text>
        {isEditing ? (
          <Input
            placeholder="Nhập mật khẩu mới"
            leftIcon={{ name: "edit", type: "font-awesome" }}
            value={newUsername}
            autoCapitalize="none"
            onChangeText={(text) => setNewUsername(text)}
            inputContainerStyle={styles.inputField}
          />
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>{currentUsername}</Text>
          </View>
        )}
      </TouchableOpacity>
      {isEditing && (
        <View style={styles.editButtons}>
          <TouchableOpacity onPress={handleSave}>
            <Text style={styles.saveText}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancel}>
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      )}
      <SeperatorLine />
    </View>
  );
}

const deviceWidth = Math.round(Dimensions.get('window').width);
const deviceHeight = Math.round(Dimensions.get('window').height);
const marginSmall = Math.round((deviceWidth * 0.05) / 2);
const paddingSmall = marginSmall;

const styles = StyleSheet.create({
  editProfileContainer: {
    backgroundColor: "white",
    marginTop: 15,
  },
  editProfileItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: marginSmall * 2,
  },
  inputField: {
    width: deviceWidth * 0.8,
    paddingHorizontal: 8,
    marginTop: 0,
    marginBottom: -26.75,
    alignContent: "center",
    padding: 0,
  },
  editButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    // marginHorizontal: marginSmall * 2,
    marginVertical: marginSmall,
  },
  saveText: {
    fontSize: 16,
    color: "green",
  },
  cancelText: {
    fontSize: 16,
    color: "red",
  },
});
