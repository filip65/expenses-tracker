import { Alert, View } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { useExpensesContext } from "../../context/ExpensesContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { getFormattedDate } from "../../util/date";

const schema = yup
  .object({
    title: yup.string().required("Required!"),
    amount: yup
      .number()
      .typeError("Number value!")
      .positive("Positive number!")
      .required("Required!"),
    date: yup.date().typeError("Must have date format").required("Required!"),
  })
  .required();

const ExpenseForm = ({ amount, date, title, id, isEditing, onCancel }) => {
  const { updateExpense, addExpense } = useExpensesContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title ?? "",
      amount: amount ? amount.toString() : "",
      date: date ? getFormattedDate(date) : "",
    },
    resolver: yupResolver(schema),
  });

  const confirmHandler = (data) => {
    if (isEditing) {
      updateExpense(id, {
        title: data.title,
        amount: +data.amount,
        date: new Date(data.date),
      });
    } else {
      addExpense({
        title: data.title,
        amount: +data.amount,
        date: new Date(data.date),
      });
    }
    onCancel();
  };

  return (
    <View>
      <View className="flex-row">
        <Input
          label="Date"
          placeholder="yyyy-mm-dd"
          maxLength={10}
          style="flex-1"
          control={control}
          name="date"
          error={errors.date?.message}
        />
        <View className="w-3"></View>
        <Input
          label="Amount"
          placeholder="Enter Amount"
          keyboardType="decimal-pad"
          style="flex-1"
          control={control}
          name="amount"
          error={errors.amount?.message}
        />
      </View>
      <Input
        label="Title"
        placeholder="Enter title"
        multiline={true}
        control={control}
        name="title"
        error={errors.title?.message}
      />

      <View className="flex-row items-center justify-center mt-6">
        <Button
          text="Cancel"
          mode="flat"
          onPress={() => onCancel?.()}
          style="min-w-[100px]"
        />
        <View className="w-6"></View>
        <Button
          text={isEditing ? "Edit" : "Add"}
          onPress={handleSubmit(confirmHandler)}
          style="min-w-[100px]"
        />
      </View>
    </View>
  );
};

export default ExpenseForm;
