import React from 'react';
import { StyleSheet } from 'react-native';
import PendingScreen from '../OrderStat/Pending';
import DeliveringScreen from '../OrderStat/Delivering';
import DeliveredScreen from '../OrderStat/Delivered';
import CanceledScreen from '../OrderStat/Canceled';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import color from '../../constants/color';

const Tab = createMaterialTopTabNavigator();

export default function OrderListScreen() {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarActiveTintColor: color.PRIMARY_COLOR,
      tabBarInactiveTintColor: color.SECONDARY_COLOR,
      tabBarLabelStyle: {
        fontSize: 12,
      },
      headerTitleStyle: {
        color: color.PRIMARY_COLOR,
        textTransform: 'uppercase',
        fontWeight: 'bold',
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
      <Tab.Screen name="PendingScreen" component={PendingScreen} options={
        {
          tabBarLabel: "Đang chờ"
        }
      }/>
      <Tab.Screen name="DeliveringScreen" component={DeliveringScreen} options={
        {
          tabBarLabel: "Đang giao"
        }
      }/>
      <Tab.Screen name="DeliveredScreen" component={DeliveredScreen} options={
        {
          tabBarLabel: "Đã giao"
        }
      }/>
      <Tab.Screen name="CanceledScreen" component={CanceledScreen} options={
        {
          tabBarLabel: "Đã hủy"
        }
      }/>
    </Tab.Navigator>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
});