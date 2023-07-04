import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Posts from "./Posts";
import Comments from "../comments/Comments";

const { Navigator, Screen } = createNativeStackNavigator();

export default function PostsRoutes() {

  return (
    <Navigator
      initialRouteName="main-posts"
      screenOptions={{
        headerShown: false
      }}
    >
      <Screen
        name="main-posts"
        component={Posts}
      />
      <Screen
        name="comments-post"
        component={Comments}
      />
    </Navigator>
  )
}
