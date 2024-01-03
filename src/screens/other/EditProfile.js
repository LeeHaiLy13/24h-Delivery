import React, { useState, useEffect } from "react";
import { Alert, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FIREBASE_AUTH, FIREBASE_DB } from '../../../FirebaseConfig';
import { updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { Button, Input } from 'react-native-elements';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import SeperatorLine from '../../components/SeperatorLine';

export default function EditProfile() {
  const [newUsername, setNewUsername] = useState("");
  const [isEditingName, setIsEditingName] = useState(false);

  const [newPwd, setNewPwd] = useState("");
  const [currentPassword, setCurrentPassword] = useState('');
  const [isEditingPwd, setIsEditingPwd] = useState(false);

  const [userDetails, setUserDetails] = useState({});

  const handleSaveName = async () => {
    try {
      if (newUsername.trim() === "") {
        Alert.alert("Lỗi", "Vui lòng nhập tên mới.");
        return;
      }
      await updateProfile(FIREBASE_AUTH.currentUser, { displayName: newUsername });
      const userID = FIREBASE_AUTH.currentUser.uid;
      const docRef = doc(FIREBASE_DB, 'users', userID);
      await updateDoc(docRef, { username: newUsername });
      setUserDetails({ ...userDetails, username: newUsername });
      Alert.alert("Thông báo", "Tên đã được cập nhật thành công.");
    } catch (error) {
      Alert.alert("Lỗi", "Đã có lỗi xảy ra khi cập nhật tên. Vui lòng thử lại.");
    } finally {
      setIsEditingName(false);
    }
  };
  // console.log(EmailAuthProvider.credential(FIREBASE_AUTH.currentUser.email, currentPassword))
  const handleSavePwd = async () => {
    try {
      if (newPwd.trim() === "") {
        Alert.alert("Lỗi", "Vui lòng nhập mật khẩu mới.");
        return;
      }
  
      await updatePassword(FIREBASE_AUTH.currentUser, newPwd);
  
      Alert.alert("Thông báo", "Mật khẩu đã được cập nhật thành công.");
    } catch (error) {
      console.error('Error updating password:', error);
      Alert.alert("Lỗi", "Đã có lỗi xảy ra khi cập nhật mật khẩu. Vui lòng thử lại.");
    } finally {
      setIsEditingPwd(false);
    }
  };
  
  

  const handleCancelEditingName = () => {
    setIsEditingName(false);
    setNewUsername(userDetails.username);
  };

  const handleCancelEditingPwd = () => {
    setIsEditingPwd(false);
    setNewPwd("");
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userUID = FIREBASE_AUTH.currentUser.uid;
        const docRef = doc(FIREBASE_DB, 'users', userUID);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching user details:', error.message);
      }
    };

    fetchUserDetails();
  }, []);

  return (
    <View style={styles.editProfileContainer}>
      <TouchableOpacity
        style={styles.editProfileItem}
        onPress={() => setIsEditingName(true)}
        disabled={isEditingName}
      >
        <Text>Tên</Text>
        {isEditingName ? (
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
            <Text>{userDetails.username}</Text>
          </View>
        )}
      </TouchableOpacity>
      {isEditingName && (
        <View style={styles.editButtons}>
          <TouchableOpacity onPress={handleSaveName}>
            <Text style={styles.saveText}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelEditingName}>
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* <TouchableOpacity
        style={styles.editProfileItem}
        onPress={() => setIsEditingPwd(true)}
        disabled={isEditingPwd}
      >
        <Text>Mật khẩu</Text>
        {isEditingPwd ? (
          <Input
            placeholder="Nhập mật khẩu mới"
            leftIcon={{ name: "edit", type: "font-awesome" }}
            value={newPwd}
            autoCapitalize="none"
            onChangeText={(text) => setNewPwd(text)}
            inputContainerStyle={styles.inputField}
            secureTextEntry
          />
        ) : (
          <></>
        )}
      </TouchableOpacity>
      {isEditingPwd && (
        <View style={styles.editButtons}>
          <TouchableOpacity onPress={handleSavePwd}>
            <Text style={styles.saveText}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCancelEditingPwd}>
            <Text style={styles.cancelText}>Hủy</Text>
          </TouchableOpacity>
        </View>
      )}
      <SeperatorLine /> */}
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
