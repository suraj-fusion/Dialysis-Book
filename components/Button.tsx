import { Pressable, StyleSheet, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import GlobalColors from "../constants/Colors";


import { ButtonProps } from "../types";


function Button({ name, size, color, onPress }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.rootContainer, pressed && styles.pressed]}
      onPress={onPress}
    >
      <View >
        <Ionicons name={name} size={size} color={color} />
      </View>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.5,
  },
  rootContainer: {
    borderRadius: 20,
    backgroundColor: GlobalColors.primary400,
    height:32,
    width:32,
    alignItems:"center",
    justifyContent:"center"
  },
  
});
