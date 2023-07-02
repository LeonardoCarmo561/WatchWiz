import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WatchList from "./WatchList";
import MovieDetails from "../movies/MovieDetails";


const { Navigator, Screen } = createNativeStackNavigator();

export default function WatchlistRoutes() {

  return (
    <Navigator
      initialRouteName="list"
      screenOptions={{ headerShown: false }}
    >
      <Screen
        name="list"
        component={WatchList}
      />
      <Screen
        name="detail"
        component={MovieDetails}
      />
    </Navigator>
  )
}
