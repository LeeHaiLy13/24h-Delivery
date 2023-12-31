import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../../screens/main/HomeScreen';
import OrderListScreen from '../../screens/main/OrderListScreen';
import GiftScreen from '../../screens/main/GiftScreen';
import AccountScreen from '../../screens/main/AccountScreen';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import color from '../../constants/color';


const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="HomeScreen" screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === "HomeScreen") {
          iconName = focused ? 'home' : 'home-outline'
        }
        else if (route.name === "OrderListScreen") {
          iconName = focused ? 'ios-document-text' : 'ios-document-text-outline'
        }
        else if (route.name === "GiftScreen") {
          iconName = focused ? 'ios-gift' : 'ios-gift-outline'
        }
        else if (route.name === "AccountScreen") {
          iconName = focused ? 'ios-person-circle' : 'ios-person-circle-outline'
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: color.PRIMARY_COLOR,
      tabBarInactiveTintColor: color.SECONDARY_COLOR,
      tabBarLabelStyle: {
        fontSize: 12,
        paddingBottom: 4,
      },
      tabBarStyle: {
        height: 60,
      },
      headerTitleAlign: 'center',
      headerTitleStyle: {
        color: color.PRIMARY_COLOR,
        textTransform: 'uppercase',
        fontWeight: '600',
      },
      headerStyle: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
      }
    })}>
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={
        {
          tabBarLabel: "Trang chủ",
          headerTitle: "Trang chủ",
          // tabBarIcon: (size, color) => {
          //   <Ionicons name="home-outline" size={size} color={color} />
          // }
        }
      }/>
      <Tab.Screen name="OrderListScreen" component={OrderListScreen} options={
        {
          tabBarLabel: "Đơn hàng",
          headerTitle: "Đơn hàng",
        }
      }/>
      <Tab.Screen name="GiftScreen" component={GiftScreen} options={
        {
          tabBarLabel: "Ưu đãi",
          headerTitle: "Ưu đãi",
        }
      }/>
      <Tab.Screen name="AccountScreen" component={AccountScreen} options={
        {
          tabBarLabel: "Tài khoản",
          headerTitle: "Tài khoản",
        }
      }/>
    </Tab.Navigator>

  );
};