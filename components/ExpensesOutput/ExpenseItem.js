import { Text, View } from "react-native";
import Ripple from "react-native-material-ripple";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

function ExpenseItem({ title, date, amount, id }) {
  const navigation = useNavigation();
  return (
    <Ripple
      onPress={() =>
        navigation.navigate("manageExpense", {
          expenseId: id,
        })
      }
    >
      <View className="flex-row justify-between p-4 mb-2 bg-primary500 rounded-lg">
        <View>
          <Text className="text-primary50 font-bold mb-1">{title}</Text>
          <Text className="text-primary50">{getFormattedDate(date)}</Text>
        </View>
        <View className="bg-white py-2 px-4 min-w-[50px] justify-center items-center rounded">
          <Text className="text-primary500 font-bold">${amount}</Text>
        </View>
      </View>
    </Ripple>
  );
}

export default ExpenseItem;
