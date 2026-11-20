import { Pressable, StyleSheet, Text, View } from 'react-native';

export interface SelectOption<T extends string> {
  label: string;
  value: T;
}

interface TwoOptionSelectProps<T extends string> {
  label?: string;
  options: [SelectOption<T>, SelectOption<T>];
  value: T | null;
  onChange: (value: T) => void;
}

export function TwoOptionSelect<T extends string>({
  label,
  options,
  value,
  onChange,
}: TwoOptionSelectProps<T>) {
  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.track} accessibilityRole="radiogroup">
        {options.map((option) => {
          const selected = option.value === value;

          return (
            <Pressable
              key={option.value}
              onPress={() => onChange(option.value)}
              accessibilityRole="radio"
              accessibilityState={{ selected }}
              style={({ pressed }) => [
                styles.option,
                selected && styles.optionSelected,
                pressed && styles.optionPressed,
              ]}
            >
              <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
  track: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  option: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  optionPressed: {
    opacity: 0.85,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  optionTextSelected: {
    fontWeight: '700',
    color: '#111827',
  },
});