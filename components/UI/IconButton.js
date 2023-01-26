import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const IconButton = ({ name, size, color, onPress }) => {
  return (
    <Pressable onPress={() => onPress?.()} className="active:opacity-75">
      <View className="">
        <Ionicons name={name} size={size} color={color} />
      </View>
    </Pressable>
  );
};

export default IconButton;
