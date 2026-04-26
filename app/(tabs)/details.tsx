import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, Image, ScrollView, Text, View } from "react-native";

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const name = params.name as string;
  const description = params.description as string;

  let selectedImage: any;

  if (name === "Push Ups") {
    selectedImage = require("../../assets/images/pushups.jpg");
  } else if (name === "Squats") {
    selectedImage = require("../../assets/images/squats.jpg");
  } else if (name === "Plank") {
    selectedImage = require("../../assets/images/plank.png");
  } else if (params.image) {
    selectedImage = { uri: params.image as string };
  } else {
    selectedImage = require("../../assets/images/icon.png");
  }

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        padding: 20,
        alignItems: "center",
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          marginBottom: 20,
          textAlign: "center",
        }}
      >
        {name}
      </Text>

      <Image
        source={selectedImage}
        style={{
          width: 240,
          height: 240,
          borderRadius: 16,
          marginBottom: 20,
        }}
      />

      <Text
        style={{
          fontSize: 17,
          color: "#555",
          textAlign: "center",
          lineHeight: 26,
          marginBottom: 30,
        }}
      >
        {description}
      </Text>

      <View style={{ width: "100%" }}>
        <Button title="⬅ Back to Home" onPress={() => router.back()} />
      </View>
    </ScrollView>
  );
}
