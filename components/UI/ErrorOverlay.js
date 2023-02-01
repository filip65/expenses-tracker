import { Text, View } from "react-native";
import Button from "./Button";

const ErrorOverlay = ({ message, onConfirm }) => {
  return (
    <View className="flex-1 justify-center items-center p-6 bg-primary700">
      <Text className="text-white text-xl">Some error occurred </Text>
      {message && (
        <Text className="text-white text-base mb-4 mt-1">{message}</Text>
      )}
      <Button text="Okay" onPress={onConfirm} />
    </View>
  );
};

export default ErrorOverlay;
