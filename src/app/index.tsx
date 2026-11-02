import React from "react";
import { router } from "expo-router";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
import { TextTitle } from "../components/TextTitle";

export default function Index() {
  const [loading, setLoading] = useState(true);

  const navegarParaTutor = () => {
    router.push("./tutor");
  };

  useEffect(() => {
    setTimeout(() => navegarParaTutor(), 2000);
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="small" color="#fff" />}
      <Image
        source={require("../../assets/images/logo_pata.svg")}
        style={{
          width: 100,
          height: 100,
        }}
        priority="high"
        onLoadEnd={() => setLoading(false)}
      />
      {!loading && (
        <>
          <TextTitle style={styles.title}>Pata Amiga</TextTitle>
          <Text style={styles.subtitle}>conectando pets e pessoas</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fd802f",
    color: "#fffaf2",
  },
  title: {
    fontSize: 24,
    fontWeight: "400",
    marginBottom: 5,
    color: "#fffaf2",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "AndikaRegular",
    color: "#fffaf2",
  },
  linkButton: {
    color: "#007AFF",
    fontSize: 16,
    marginBottom: 15,
    padding: 10,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
