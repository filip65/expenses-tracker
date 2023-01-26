import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useExpensesContext } from "../context/ExpensesContext";

const AllExpensesScreen = () => {
  const { expenses } = useExpensesContext();

  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      fallbackText="There is no expense..."
    />
  );
};

export default AllExpensesScreen;
