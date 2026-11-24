import { router, useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { BackHandler, Platform, ToastAndroid } from "react-native";

import { confirmaSaida } from "@/regras/sairDoApp";

/**
 * Na primeira tela da pilha, o voltar do Android minimiza o app.
 * Com este hook, o primeiro toque só avisa; o segundo, logo em seguida, sai.
 * Em telas com alguma tela atrás, o voltar continua normal.
 */
export function useVoltarDuasVezesParaSair() {
  const ultimoToque = useRef<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== "android") return;

      const assinatura = BackHandler.addEventListener("hardwareBackPress", () => {
        if (router.canGoBack()) return false;

        const agora = Date.now();
        if (confirmaSaida(agora, ultimoToque.current)) return false;

        ultimoToque.current = agora;
        ToastAndroid.show("Toque em voltar de novo para sair", ToastAndroid.SHORT);
        return true;
      });

      return () => assinatura.remove();
    }, []),
  );
}
