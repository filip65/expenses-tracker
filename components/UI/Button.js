import { Pressable, View, Text } from "react-native";

const Button = ({ text, onPress, mode, style }) => {
  return (
    <View className={style}>
      <Pressable
        className={`rounded-lg p-3 bg-primary500 active:opacity-75 active:bg-primary100 active:rounded ${
          mode === "flat"
            ? "bg-transparent border-primary500 border-2"
            : "bg-primary500"
        }`}
        onPress={() => onPress?.()}
      >
        <View>
          <Text
            className={`text-center text-white ${
              mode === "flat" ? "text-primary200" : ""
            }`}
          >
            {text}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;
