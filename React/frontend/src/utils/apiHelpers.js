// src/utils/apiHelpers.js
export const safeArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.results)) return data.results;
  return [];
};
