import { router } from "expo-router";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { Text, ActivityIndicator, View } from "react-native";

import { styles } from "./styles";
import { TextTitle } from "../components/TextTitle";

export default function Index() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => router.replace("./tutor"), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="small" color="#fff" />}
      <Image
        source={require("../../assets/images/logo_pata_512.svg")}
        style={{
          width: 200,
          height: 200,
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