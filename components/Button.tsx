import { Pressable, StyleSheet, Text, View } from "react-native";


import GlobalColors from "../constants/Colors";


import { ButtonProps } from "../types";


function Button({ onPress,text,style }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.rootContainer, pressed && styles.pressed,style]}
      onPress={onPress}
    >
      <View >
        <Text>{text}</Text>
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
    backgroundColor: GlobalColors.primary400,
    alignItems:"center",
    justifyContent:"center"
  },
  
});
