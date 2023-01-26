import { TextInput, View, Text } from "react-native";
import { GlobalStyles } from "../../constants/style";
import { Controller } from "react-hook-form";

const Input = ({ label, style, control, name, error, ...props }) => {
  return (
    <View className={`${style}`}>
      <Text
        className={`text-sm mb-0.5 ${
          !!error ? "text-red-500" : "text-primary100"
        }`}
      >
        {label}
      </Text>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            className={`bg-primary100 p-2 rounded text-base text-primary700 border border-transparent ${
              !!error ? " border-red-500" : ""
            }`}
            placeholderTextColor={GlobalStyles.colors.primary200}
            {...props}
          />
        )}
        name={name}
      />
      <Text className="text-xs text-red-500">{error}</Text>
    </View>
  );
};

export default Input;
