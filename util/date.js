export const getFormattedDate = (date) => {
  return date.toLocaleDateString("en-US");
};

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
