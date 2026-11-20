import { useRef, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

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
}

interface TriggerLayout {
  top: number;
  left: number;
  width: number;
}

export function SelectDropdown<T extends string>({
  label,
  placeholder = "Selecione uma opção",
  options,
  value,
  onChange,
}: SelectDropdownProps<T>) {
  const [open, setOpen] = useState<boolean>(false);
  const [layout, setLayout] = useState<TriggerLayout>({ top: 0, left: 0, width: 0 });
  const triggerRef = useRef<View>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleOpen = () => {
    triggerRef.current?.measureInWindow((x, y, width, height) => {
      setLayout({
        top: y + height + 6,
        left: x,
        width,
      });
      setOpen(true);
    });
  };

  const handleSelect = (newValue: T) => {
    onChange(newValue);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View
        ref={triggerRef}
        collapsable={false}
      >
        <Pressable
          onPress={handleOpen}
          accessibilityRole="combobox"
          accessibilityState={{ expanded: open }}
          style={({ pressed }) => [styles.trigger, open && styles.triggerOpen, pressed && styles.pressed]}
        >
          <Text style={[styles.triggerText, !selectedOption && styles.placeholder]}>
            {selectedOption ? selectedOption.label : placeholder}
          </Text>
          <Text style={styles.chevron}>{open ? "▲" : "▼"}</Text>
        </Pressable>
      </View>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable
          style={styles.backdrop}
          onPress={() => setOpen(false)}
        >
          <View
            style={[
              styles.menu,
              {
                top: layout.top,
                left: layout.left,
                width: layout.width,
              },
            ]}
          >
            {options.map((option, index) => {
              const isSelected = option.value === value;
              const isLast = index === options.length - 1;

              return (
                <Pressable
                  key={option.value}
                  onPress={() => handleSelect(option.value)}
                  style={({ pressed }) => [
                    styles.menuItem,
                    !isLast && styles.menuItemBorder,
                    isSelected && styles.menuItemSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={[styles.menuItemText, isSelected && styles.menuItemTextSelected]}>{option.label}</Text>
                  {isSelected ? <Text style={styles.check}>✓</Text> : null}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  triggerOpen: {
    borderColor: "#2563EB",
  },
  triggerText: {
    fontSize: 15,
    color: "#111827",
  },
  placeholder: {
    color: "#9CA3AF",
  },
  chevron: {
    fontSize: 11,
    color: "#6B7280",
  },
  pressed: {
    opacity: 0.8,
  },
  backdrop: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemSelected: {
    backgroundColor: "#EFF6FF",
  },
  menuItemText: {
    fontSize: 15,
    color: "#374151",
  },
  menuItemTextSelected: {
    fontWeight: "600",
    color: "#1D4ED8",
  },
  check: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1D4ED8",
  },
});
