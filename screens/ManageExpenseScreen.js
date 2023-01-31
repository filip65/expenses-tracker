import { Text, View } from "react-native";
import { useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/style";
import { useExpensesContext } from "../context/ExpensesContext";
import ExpenseForm from "../components/manageExpense/ExpenseForm";
import {
  deleteExpenseServer,
  saveExpense,
  updateExpenseServer,
} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpenseScreen = ({ route, navigation }) => {
  const { deleteExpense, updateExpense, addExpense, expenses } =
    useExpensesContext();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const currentExpense = isEditing
    ? expenses.find((item) => item.id === expenseId)
    : null;

  const cancelHandler = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      deleteExpense(expenseId);
      await deleteExpenseServer(expenseId);
      cancelHandler();
    } catch (error) {
      setError("Failed to delete expense");
    }
    setIsLoading(false);
  };

  const confirmHandler = async (data) => {
    setIsLoading(true);
    if (isEditing) {
      try {
        const expenseData = {
          title: data.title,
          amount: +data.amount,
          date: new Date(data.date),
        };

        await updateExpenseServer(expenseId, expenseData);
        updateExpense(expenseId, expenseData);
        cancelHandler();
      } catch (error) {
        setError("Failed to edit expense");
      }
    } else {
      try {
        const newExpense = {
          title: data.title,
          amount: +data.amount,
          date: new Date(data.date),
        };

        const id = await saveExpense(newExpense);
        addExpense({ id, ...newExpense });
        cancelHandler();
      } catch (error) {
        setError("Failed to add expense");
      }
    }
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, []);

  if (error) {
    return <ErrorOverlay message={error} onConfirm={() => setError(null)} />;
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <View className="flex-1 p-4 bg-primary800">
      <Text className="text-white text-3xl text-center font-bold my-4">
        Your expense
      </Text>
      <ExpenseForm
        {...currentExpense}
        onCancel={cancelHandler}
        isEditing={isEditing}
        onSubmit={confirmHandler}
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
