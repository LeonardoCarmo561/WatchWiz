import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WatchList from "./WatchList";
import MovieDetails from "../movies/MovieDetails";
import CreatePost from "../posts/CreatePost";
import { TopTabsWatchLists } from "./TopTabNavigator";
import WatchedMovieDetails from "../movies/WatchedMovieDetails";


const { Navigator, Screen } = createNativeStackNavigator();

export default function WatchlistRoutes() {

  return (
    <Navigator
      initialRouteName="list"
      screenOptions={{ headerShown: false }}
    >
      <Screen
        name="list"
        component={TopTabsWatchLists}
      />
      <Screen
        name="detail"
        component={MovieDetails}
      />
      <Screen
        name="watched-detail"
        component={WatchedMovieDetails}
      />
      <Screen
        name="new-post"
        component={CreatePost}
      />
    </Navigator>
  )
}
