import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Search from "./Search";
import MovieDetails from "../movies/MovieDetails";
import CreatePost from "../posts/CreatePost";


const { Navigator, Screen } = createNativeStackNavigator();

export default function SearchRoutes() {
  return (
    <Navigator
      initialRouteName="search-main"
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen
        name="search-main"
        component={Search}
      />
      <Screen
        name="search-movie-details"
        component={MovieDetails}
      />
      <Screen
        name="new-post"
        component={CreatePost}
      />
    </Navigator>
  )
}