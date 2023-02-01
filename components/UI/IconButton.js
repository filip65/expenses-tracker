import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, color, size, onPress }) {
  return (
    <Pressable className="m-2 rounded-lg active:opacity-75" onPress={onPress}>
      <Ionicons name={icon} color={color} size={size} />
    </Pressable>
  );
}

export default IconButton;
