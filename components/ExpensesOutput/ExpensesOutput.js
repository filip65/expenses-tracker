import { View, Text } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";

const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
  return (
    <View className="p-6 bg-primary700 flex-1">
      <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
      {expenses.length > 0 ? (
        <ExpensesList expenses={expenses} />
      ) : (
        <Text className="text-center text-primary50 text-lg mt-2">
          {fallbackText}
        </Text>
      )}
    </View>
  );
};

export default ExpensesOutput;
