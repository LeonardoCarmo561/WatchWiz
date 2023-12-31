import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login/Login";
import SignUp from "../screens/sign-up/SignUp";

const { Navigator, Screen } = createNativeStackNavigator();

export default function AuthRoutes() {

  return (
        <Navigator
          initialRouteName="login"
          screenOptions={{ headerShown: false }}
        >
          <Screen
            name="login"
            component={Login}
          />
          <Screen
            name="sign-up"
            component={SignUp}
          />
        </Navigator>
  )
}
