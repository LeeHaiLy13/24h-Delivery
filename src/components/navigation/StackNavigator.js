import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/register-login/LoginScreen';
import RegisterScreen from '../../screens/register-login/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';
import EditProfile from '../../screens/other/EditProfile';
import HelpCenter from '../../screens/other/HelpCenter';
import Favourite from '../../screens/other/Favourite';
import OtherSetting from '../../screens/other/OtherSetting';
import SearchLocate from '../../screens/other/SearchLocate';
import AddressPicker from '../../screens/other/Address';
import color from '../../constants/color';
const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='LoginScreen' component={LoginScreen} options={{ headerShown: false, }}/>
        <Stack.Screen name='RegisterScreen' component={RegisterScreen} options={{ headerShown: false, }}/>
        <Stack.Screen name="MainTabNavigator" component={MainTabNavigator} options={{ headerShown: false, }}/>
        <Stack.Screen name="SearchLocate" component={SearchLocate}/>
        <Stack.Screen name="AddressPicker" component={AddressPicker}/>
        <Stack.Screen name='EditProfile' component={EditProfile} options={
        {
          headerTitle: "Chỉnh sửa thông tin",
          headerTitleStyle: {
            color: color.PRIMARY_COLOR,
            textTransform: 'uppercase',
            fontWeight: '600',
          },
        }
      }/>
      <Stack.Screen name='HelpCenter' component={HelpCenter} options={
        {
          headerTitle: "Trung tâm hỗ trợ",
          headerTitleStyle: {
            color: color.PRIMARY_COLOR,
            textTransform: 'uppercase',
            fontWeight: '600',
          },
        }
      }/>
      <Stack.Screen name='Favourite' component={Favourite} options={
        {
          headerTitle: "Quản lí nhân viên yêu thích",
          headerTitleStyle: {
            color: color.PRIMARY_COLOR,
            textTransform: 'uppercase',
            fontWeight: '600',
          },
        }
      }/>
      <Stack.Screen name='OtherSetting' component={OtherSetting} options={
        {
          headerTitle: "Cài đặt khác",
          headerTitleStyle: {
            color: color.PRIMARY_COLOR,
            textTransform: 'uppercase',
            fontWeight: '600',
          },
        }
      }/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};