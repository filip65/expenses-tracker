import { View, Text, TextInput } from "react-native";

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  autoComplete,
}) {
  return (
    <View className="my-2">
      <Text className={`text-white mb-1 ${isInvalid ? "text-error500" : ""}`}>
        {label}
      </Text>
      <TextInput
        className={`py-2 px-1 bg-primary100 rounded ${
          isInvalid ? "bg-error50" : ""
        }`}
        autoCapitalize={false}
        autoCapitalize="none"
        autoComplete={autoComplete}
        keyboardType={keyboardType}
        secureTextEntry={secure}
        onChangeText={onUpdateValue}
        value={value}
        style={{
          fontSize: 16,
        }}
      />
    </View>
  );
}

export default Input;
