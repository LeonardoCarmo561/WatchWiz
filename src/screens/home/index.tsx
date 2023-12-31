import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from "./Home";
import MovieDetails from "../movies/MovieDetails";
import CreatePost from "../posts/CreatePost";

const { Navigator, Screen } = createNativeStackNavigator();

export default function HomeRoutes() {
  return (
    <Navigator
      initialRouteName="main-home"
      screenOptions={{ headerShown: false }}
    >
      <Screen
        name="main-home"
        component={Home}
      />
      <Screen
        name="details-movie-home"
        component={MovieDetails}
      />
      <Screen
        name="new-post"
        component={CreatePost}
      />
    </Navigator>
  )
}
