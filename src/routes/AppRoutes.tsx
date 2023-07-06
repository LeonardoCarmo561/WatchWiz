import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Profile from "../screens/profile/Profile";
import WatchlistRoutes from "../screens/watchlist";
import HomeRoutes from "../screens/home";
import PostsRoutes from "../screens/posts";
import SearchRoutes from "../screens/search";

const { Screen, Navigator } = createBottomTabNavigator();

export default function AppRoutes() {
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
        name="watchlist"
        component={WatchlistRoutes}
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
        component={HomeRoutes}
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
        name="post"
        component={PostsRoutes}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <MaterialIcons
              name="add-a-photo"
              size={size}
              color={focused ? "#fff" : "rgb(17, 24, 39)"}
            />
          )
        }}
      />
      <Screen
        name="pesquisar"
        component={SearchRoutes}
        options={{
          tabBarIcon: ({ size, focused }) => (
            <MaterialIcons
              name="search"
              size={size}
              color={focused ? "#fff" : "rgb(17, 24, 39)"}
            />
          )
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
