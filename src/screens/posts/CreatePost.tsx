import { Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import BasePage from "../../shared/components/page/Page";
import SearchBox from "../../shared/components/search-box/SearchBox";
import { useState } from "react";
import { useDetailScreenContext } from "../../shared/contexts/DetailScreenContext";
import { useAuthContext } from "../../shared/contexts/AuthContext";
import { createNewPost } from "../../shared/services/api";

export default function CreatePost() {
  const { watchedData } = useDetailScreenContext();
  const [text, setText] = useState("");
  const { user } = useAuthContext();

  const handleSubmit = () => {
    const formData = {
      text: text,
      watchedMovie: watchedData.data?.imdbId
    }

    createNewPost(user!.access_token, formData)
    .then((result) => {
      if (result instanceof Error) {
        alert(result.message)
      } else {
        alert("Post created successfully")
      }
    })
  };

  return (
    <BasePage>
      <ScrollView className="p-4 pt-8">
        <View
          id="image-container"
          className="
          mt-2
          flex
          w-full
          h-[310px]
          items-center
        "
        >
          <Image
            className="
            w-[200px]
            h-[300px]
            rounded-[20px]
          "
            source={{
              uri: watchedData.data?.posterUrl,
            }}
          />
        </View>
        <SearchBox
          placeHolder="Escreva uma legenda..."
          value={text}
          setValue={setText}
        />

        <View
          id="save-button-container"
          className="
            w-full
            h-[70px]
            flex justify-center
            items-center
          "
        >
          <Pressable
            onPress={handleSubmit}
            className="
              h-[60px]
              border-1
              border-purple-950
              bg-purple-500
              rounded-[20px]
              p-4
            "
          >
            <Text className="text-white font-bold text-[20px]">SAVE POST</Text>
          </Pressable>
        </View>
      </ScrollView>
    </BasePage>
  );
}
