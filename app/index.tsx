import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";

type Exercise = {
  id: string;
  name: string;
  description: string;
  image: any;
};

declare global {
  var exercises: Exercise[];
}

// Default exercises
if (!global.exercises) {
  global.exercises = [
    {
      id: "1",
      name: "Push Ups",
      description: "Upper body strength exercise",
      image: require("../assets/images/pushups.jpg"),
    },
    {
      id: "2",
      name: "Squats",
      description: "Leg strength exercise",
      image: require("../assets/images/squats.jpg"),
    },
    {
      id: "3",
      name: "Plank",
      description: "Core strength exercise",
      image: require("../assets/images/plank.png"),
    },
  ];
}

export default function Home() {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[]>(global.exercises);

  // Refresh list when coming back from Add screen
  useFocusEffect(
    useCallback(() => {
      setExercises([...global.exercises]);
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: 26,
          fontWeight: "bold",
          marginBottom: 15,
        }}
      >
        🏋️ Fitness Tracker
      </Text>

      {/* Add Button */}
      <Pressable
        onPress={() => router.push("/add")}
        style={{
          backgroundColor: "black",
          padding: 12,
          borderRadius: 10,
          marginBottom: 18,
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          ➕ Add Exercise
        </Text>
      </Pressable>

      {/* Exercise List */}
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/details",
                params: {
                  name: item.name,
                  description: item.description,
                },
              })
            }
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f2f2f2",
              padding: 12,
              borderRadius: 12,
              marginBottom: 12,
            }}
          >
            <Image
              source={item.image}
              style={{
                width: 65,
                height: 65,
                borderRadius: 10,
                marginRight: 12,
              }}
            />

            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {item.name}
              </Text>

              <Text
                style={{
                  color: "gray",
                  marginTop: 4,
                }}
              >
                {item.description}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
}
