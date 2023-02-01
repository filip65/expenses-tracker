import { Pressable, Text, View } from "react-native";

function FlatButton({ children, onPress }) {
  return (
    <Pressable className="py-2 px-6 active:opacity-75" onPress={onPress}>
      <View>
        <Text className="text-primary50 text-center">{children}</Text>
      </View>
    </Pressable>
  );
}

export default FlatButton;
