import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpensesContext } from "../context/ExpensesContext";
import { getDateMinusDays } from "../util/date";

const RecentExpensesScreen = () => {
  const { expenses } = useExpensesContext();

  const recentExpenses = expenses.filter((item) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return item.date > date7DaysAgo;
  });

  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses in last 7 days..."
    />
  );
};

export default RecentExpensesScreen;
