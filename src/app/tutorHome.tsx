import { Text, View } from "react-native";
import { useLocalSearchParams} from "expo-router";
import { styles, tutorStyles } from "./styles";


export default function TutorHomeScreen() {
    const dadosTutor = useLocalSearchParams();

  return (
    <View style={tutorStyles.container}>
      <Text style={tutorStyles.title}>Bem Vindo</Text>

      <Text style={{...styles.subtitle, color: '#000'}}> {dadosTutor.nome} </Text>

      <Text style={{...styles.subtitle, color: '#000'}}> {dadosTutor.documento} </Text>

      <Text style={{...styles.subtitle, color: '#000'}}> {dadosTutor.cidade} </Text>
    </View>
  );
}
