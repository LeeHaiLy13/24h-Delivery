import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const AddressPicker = () => {
  const [address, setaddress] = useState('');
  const [note, setnote] = useState('');
  
  const handle = () => {
    // Thực hiện xử lý đăng nhập tại đây
    console.log('Địa chỉ:', address);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}> Nhập địa chỉ</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Nhập địa chỉ "
        onChangeText={text => setaddress(text)}
      />
       <View style={styles.line}></View>
      <TextInput
        style={styles.input}
        placeholder="Ghi chú"
        secureTextEntry={true}
        onChangeText={text => setnote(text)}
      />
      <View style={styles.line}></View>
      
      <Button style={styles.submit}
        title="Xác nhận"
        onPress={handle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
   
  },
  header:{
    height:40,
    backgroundColor: '#ddd',
    marginVertical: 5,
  },
  label:{
    marginTop: 10,
  },
  
  input: {
    height: 40,
    borderColor: '#ddd',
    marginBottom: 5,
    paddingHorizontal: 8,
    width: '100%',
  },
  line: {
    height: 1,
    width: "100%",
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  submit:{
    width: 50,
    height: 40,
    backgroundColor: 'blue',
    color: "#ffff",
  },
});

export default AddressPicker;
