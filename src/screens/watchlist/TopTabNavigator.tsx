import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import WatchedList from "./WatchedList";
import WatchList from "./WatchList";

const { Navigator, Screen } = createMaterialTopTabNavigator();

export const TopTabsWatchLists = () => {

  return (
    <Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgb(17, 24, 39)",
          height: 90,
          justifyContent: "center"
        },
        tabBarLabelStyle: {
          color: "#fff"
        }
      }}
    >
      <Screen
        name="watched"
        component={WatchedList}
      />
      <Screen
        name="in-list"
        component={WatchList}
      />
    </Navigator>
  )
}
