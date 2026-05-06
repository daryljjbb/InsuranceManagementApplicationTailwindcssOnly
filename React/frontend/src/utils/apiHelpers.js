// src/utils/apiHelpers.js
export const formatCurrency = (value) => {
  if (!value) return "";
  const num = Number(value);
  if (isNaN(num)) return value;
  return num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
};

export const safeArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [];
};
