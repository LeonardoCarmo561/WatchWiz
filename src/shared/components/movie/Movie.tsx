import { useState } from "react";
import { View, Text, Image, Pressable } from "react-native";

import { Skeleton } from "moti/skeleton";

interface MovieContainerPros {
  title: string;
  image: string;
  onPress(): void;
}

export function MovieContainer({ title, image, onPress }: MovieContainerPros) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Pressable onPress={onPress}>
      <View className="w-[110px] mb-5 mx-5 flex items-center justify-center gap-1">
        <View className="h-[150px] w-[100px] border-black border-[.5px] rounded-[20px]">
          {!loaded && (
            <Skeleton
              colors={["#aab3ab", "#3b3b3b"]}
              width={100}
              height={150}
              radius={20}
              colorMode="dark"
            />
          )}
          <Image
            className="w-full h-full rounded-[20px]"
            onLoad={() => setLoaded(true)}
            source={{
              uri: image,
            }}
          />
        </View>
        <Text numberOfLines={2} className="text-purple-600 text-ellipsis">
          {title}
        </Text>
      </View>
    </Pressable>
  );
}
