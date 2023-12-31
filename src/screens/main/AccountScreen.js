import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, } from '@react-navigation/native';
import SeperatorLine from '../../components/SeperatorLine';
import { FontAwesome5 } from '@expo/vector-icons';

const accountSettingOptions = [
  {
    key: '1',
    option: "Chỉnh sửa thông tin",
    icon: <FontAwesome5 name="edit" size={24} color="black" />,
    nameScreen: "EditProfile",
  },
  {
    key: '2',
    option: "Trung tâm hỗ trợ",
    icon: <FontAwesome5 name="headphones-alt" size={24} color="black" />,
    nameScreen: "HelpCenter",

  },
  {
    key: '3',
    option: "Quản lí nhân viên yêu thích",
    icon: <FontAwesome5 name="user-alt" size={24} color="black" />,
    nameScreen: "Favourite",

  },
  {
    key: '4',
    option: "Cài đặt khác",
    icon: <FontAwesome5 name="cog" size={24} color="black" />,
    nameScreen: "OtherSetting",

  },
]

function RenderOptionList() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1, }}>
      <FlatList
        data={accountSettingOptions}
        keyExtractor={(item) => { return item.key; }}
        renderItem={({ item }) => {
          return (
            <View>
              <TouchableOpacity style={{
                width: deviceWidth * 0.9,
                marginHorizontal: marginSmall,
                marginVertical: marginSmall * 2,
              }}
                onPress={() => navigation.navigate(item.nameScreen)}>
                <Text style={{
                  fontSize: 18, fontWeight: '500',
                }}>{item.icon}  {item.option}</Text>
              </TouchableOpacity>
              <SeperatorLine />
            </View>
          )
        }} />
    </SafeAreaView>
  );
};


export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#45cfdd85', '#75f0b980', '#a0fb687a']}
        style={{ width: deviceWidth, height: deviceHeight * 1 / 4, }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', }}>
          {/* code here */}
        </View>
      </LinearGradient>
      <RenderOptionList />
      <StatusBar style="auto" />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
}); 