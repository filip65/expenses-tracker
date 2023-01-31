import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { useExpensesContext } from "../context/ExpensesContext";
import { loadExpenses } from "../util/http";
import { useEffect, useState } from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpensesScreen = () => {
  const { expenses, setExpenses } = useExpensesContext();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const recentExpenses = expenses?.filter((item) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return item.date > date7DaysAgo;
  });

  const fetchExpenses = async () => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await loadExpenses();
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
        message={"Failed to load recent expenses"}
        onConfirm={() => fetchExpenses()}
      />
    );
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses in last 7 days..."
    />
  );
};

export default RecentExpensesScreen;
