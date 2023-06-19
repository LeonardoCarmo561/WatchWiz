import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import WatchList from "../screens/watchlist/WatchList";
import Home from "../screens/home/Home";
import Profile from "../screens/profile/Profile";

const { Screen, Navigator } = createBottomTabNavigator();

export function AppRoutes() {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          borderTopColor: "rgb(60, 23, 95)",
          backgroundColor: "rgb(60, 23, 95)",
        },
        tabBarLabel: ({ children, focused }) => (
          <Text style={{ color: focused ? "#fff" : "rgb(17, 24, 39 )" }}>
            {children}
          </Text>
        ),
      }}
    >
      <Screen
        name="list"
        component={WatchList}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Feather
              name="list"
              size={size}
              color={focused ? "#fff" : "rgb(17, 24, 39 )"}
            />
          ),
        }}
      />
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Feather
              name="home"
              size={size}
              color={focused ? "#fff" : "rgb(17, 24, 39 )"}
            />
          ),
        }}
      />
      <Screen
        name="profile"
        component={Profile}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Feather
              name="headphones"
              size={size}
              color={focused ? "#fff" : "rgb(17, 24, 39 )"}
            />
          ),
        }}
      />
    </Navigator>
  );
}
