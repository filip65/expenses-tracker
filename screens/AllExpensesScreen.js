import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpensesContext } from "../context/ExpensesContext";
import { loadExpenses } from "../util/http";
import { useEffect, useState } from "react";
import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { useAuthContext } from "../context/AuthContext";

const AllExpensesScreen = () => {
  const { expenses, setExpenses } = useExpensesContext();
  const { token, localId } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const fetchExpenses = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await loadExpenses({ token, localId });

      setExpenses(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (isError) {
    return (
      <ErrorOverlay
        message={"Failed to load all expenses"}
        onConfirm={() => fetchExpenses()}
      />
    );
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      fallbackText="There is no expense..."
    />
  );
};

export default AllExpensesScreen;
