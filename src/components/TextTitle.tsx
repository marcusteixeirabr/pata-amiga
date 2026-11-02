import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

export function TextTitle(props: TextProps) {
  return <Text {...props} style={[styles.defaultFont, props.style]} />;
}

const styles = StyleSheet.create({
  defaultFont: {
    fontFamily: "Chewy",
    letterSpacing: 2,
  },
});
