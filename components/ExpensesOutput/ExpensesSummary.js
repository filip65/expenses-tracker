import { View, Text } from "react-native";

const ExpensesSummary = ({ expenses, periodName }) => {
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View className="flex-row justify-between items-center bg-primary50 rounded-lg px-4 py-2 mb-4 shadow-2xl">
      <Text className="text-sm text-primary400">{periodName}</Text>
      <Text className="font-bold text-base text-primary500">{`$${expensesSum.toFixed(
        2
      )}`}</Text>
    </View>
  );
};

export default ExpensesSummary;
