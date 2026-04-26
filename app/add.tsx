import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Button,
  Image,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

type Exercise = {
  id: string;
  name: string;
  description: string;
  image: any;
};

declare global {
  var exercises: Exercise[];
}

export default function Add() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState<any>(null);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission Required", "Allow gallery access first.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage({ uri: result.assets[0].uri });
    }
  };

  const addExercise = () => {
    if (name.trim() === "" || desc.trim() === "" || !image) {
      Alert.alert("Missing Fields", "Please fill all fields and pick image.");
      return;
    }

    const newExercise = {
      id: Date.now().toString(),
      name: name.trim(),
      description: desc.trim(),
      image: image,
    };

    global.exercises.push(newExercise);

    Alert.alert("Success", "Exercise Added!");

    router.back();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 20,
        backgroundColor: "#fff",
        flexGrow: 1,
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 20,
        }}
      >
        ➕ Add Exercise
      </Text>

      <TextInput
        placeholder="Exercise Name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 12,
          padding: 12,
        }}
      />

      <TextInput
        placeholder="Description"
        value={desc}
        onChangeText={setDesc}
        multiline
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          borderRadius: 10,
          marginBottom: 12,
          padding: 12,
          height: 100,
          textAlignVertical: "top",
        }}
      />

      <View style={{ marginBottom: 15 }}>
        <Button title="📷 Pick Image" onPress={pickImage} />
      </View>

      {image && (
        <Image
          source={image}
          style={{
            width: 150,
            height: 150,
            borderRadius: 12,
            alignSelf: "center",
            marginBottom: 20,
          }}
        />
      )}

      <Button title="✅ Add Exercise" onPress={addExercise} />
    </ScrollView>
  );
}
