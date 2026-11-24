import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";

import { Folha } from "@/components/Folha";
import { cores } from "@/estilos/cores";

export interface DropdownOption<T extends string> {
  label: string;
  value: T;
}

interface SelectDropdownProps<T extends string> {
  label?: string;
  placeholder?: string;
  options: DropdownOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  desabilitado?: boolean;
}

/**
 * Campo de escolha. As opções abrem numa folha que sobe de baixo, com
 * rolagem e altura máxima: em tela pequena ou com fonte grande, todas as
 * opções continuam alcançáveis (bug do CT05).
 */
export function SelectDropdown<T extends string>({
  label,
  placeholder = "Selecione uma opção",
  options,
  value,
  onChange,
  desabilitado = false,
}: SelectDropdownProps<T>) {
  const [aberto, setAberto] = useState(false);
  const { height } = useWindowDimensions();

  const selecionada = options.find((opcao) => opcao.value === value);

  function escolher(novoValor: T) {
    onChange(novoValor);
    setAberto(false);
  }

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <Pressable
        onPress={() => setAberto(true)}
        disabled={desabilitado}
        accessibilityRole="combobox"
        accessibilityLabel={label}
        accessibilityState={{ expanded: aberto, disabled: desabilitado }}
        style={({ pressed }) => [
          styles.campo,
          desabilitado && styles.campoDesabilitado,
          pressed && styles.pressionado,
        ]}
      >
        <Text style={[styles.campoTexto, !selecionada && styles.placeholder]}>
          {selecionada ? selecionada.label : placeholder}
        </Text>
        {!desabilitado && <Text style={styles.seta}>▼</Text>}
      </Pressable>

      <Folha
        visivel={aberto}
        titulo={label ?? placeholder}
        aoFechar={() => setAberto(false)}
      >
        <ScrollView
          testID="lista-opcoes"
          style={{ maxHeight: height * 0.5 }}
        >
          {options.map((opcao, indice) => {
            const marcada = opcao.value === value;
            const ultima = indice === options.length - 1;

            return (
              <Pressable
                key={opcao.value}
                onPress={() => escolher(opcao.value)}
                accessibilityRole="radio"
                accessibilityState={{ checked: marcada }}
                style={({ pressed }) => [
                  styles.opcao,
                  !ultima && styles.opcaoBorda,
                  marcada && styles.opcaoMarcada,
                  pressed && styles.pressionado,
                ]}
              >
                <Text style={[styles.opcaoTexto, marcada && styles.opcaoTextoMarcada]}>
                  {opcao.label}
                </Text>
                {marcada ? <Text style={styles.check}>✓</Text> : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </Folha>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "700",
    color: "#52525B",
    letterSpacing: 0.6,
    textTransform: "uppercase",
  },
  campo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: cores.branco,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  campoDesabilitado: {
    backgroundColor: "transparent",
  },
  campoTexto: {
    fontSize: 15,
    color: "#111827",
  },
  placeholder: {
    color: "#9CA3AF",
  },
  seta: {
    fontSize: 11,
    color: "#6B7280",
  },
  pressionado: {
    opacity: 0.8,
  },
  opcao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  opcaoBorda: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  opcaoMarcada: {
    backgroundColor: "#FFF1E6",
  },
  opcaoTexto: {
    fontSize: 16,
    color: "#374151",
  },
  opcaoTextoMarcada: {
    fontWeight: "600",
    color: cores.laranja,
  },
  check: {
    fontSize: 15,
    fontWeight: "700",
    color: cores.laranja,
  },
});
