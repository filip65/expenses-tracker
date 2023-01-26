import { Text, View } from "react-native";
import { useLayoutEffect } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import Button from "../components/UI/Button";
import { useExpensesContext } from "../context/ExpensesContext";
import ExpenseForm from "../components/manageExpense/ExpenseForm";

const ManageExpenseScreen = ({ route, navigation }) => {
  const { deleteExpense, addExpense, updateExpense, expenses } =
    useExpensesContext();

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const currentExpense = isEditing
    ? expenses.find((item) => item.id === expenseId)
    : null;

  const cancelHandler = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = () => {
    deleteExpense(expenseId);
    cancelHandler();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, []);

  return (
    <View className="flex-1 p-4 bg-primary800">
      <Text className="text-white text-3xl text-center font-bold my-4">
        Your expense
      </Text>
      <ExpenseForm
        {...currentExpense}
        onCancel={cancelHandler}
        isEditing={isEditing}
      />
      {isEditing && (
        <View className="pt-4 mt-4 border-t-2 border-primary200 items-center">
          <IconButton
            name="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpenseScreen;
