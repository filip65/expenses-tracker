import { View, Text, Pressable } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useState } from "react";

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

const ExpenseForm = ({
  amount,
  date,
  title,
  isEditing,
  onSubmit,
  onCancel,
}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: title ?? "",
      amount: amount ? amount.toString() : "",
      date: date ?? new Date(),
    },
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Controller
        control={control}
        render={({ field: { value, onChange } }) => (
          <DateTimePickerModal
            date={value}
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={(date) => {
              onChange(date);
              setDatePickerVisibility(false);
            }}
            onCancel={() => setDatePickerVisibility(false)}
          />
        )}
        name={"date"}
      />

      <View>
        <View className="flex-row">
          <DateButton
            control={control}
            name="date"
            error={errors.date?.message}
            onOpen={() => setDatePickerVisibility(true)}
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
            onPress={handleSubmit(onSubmit)}
            style="min-w-[100px]"
          />
        </View>
      </View>
    </>
  );
};

const DateButton = ({ control, name, onOpen, error }) => {
  return (
    <Controller
      control={control}
      render={({ field: { value } }) => (
        <View className="flex-1">
          <Text
            className={`text-sm mb-0.5 ${
              !!error ? "text-red-500" : "text-primary100"
            }`}
          >
            Date
          </Text>
          <Pressable onPress={onOpen}>
            <View
              className={`bg-primary100 py-3 px-2 rounded text-base text-primary700 border border-transparent ${
                !!error ? " border-red-500" : ""
              }`}
            >
              <Text>{value?.toLocaleDateString("en-US")}</Text>
            </View>
          </Pressable>
          <Text className="text-xs text-red-500">{error}</Text>
        </View>
      )}
      name={name}
    />
  );
};

export default ExpenseForm;
