import { useState, useEffect } from "react";

export default function CurrencyInput({ value, onChange, className = "", ...props }) {
  const [display, setDisplay] = useState(value);

  // Keep display synced when parent updates value
  useEffect(() => {
    setDisplay(value);
  }, [value]);

  const formatCurrency = (num) => {
    if (num === "" || num === null || num === undefined) return "";
    const n = Number(num);
    if (isNaN(n)) return num;
    return n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    });
  };

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^0-9.]/g, "");
    setDisplay(raw);
    onChange(raw); // send raw number back to parent
  };

  const handleBlur = () => {
    setDisplay(formatCurrency(value));
  };

  const handleFocus = () => {
    setDisplay(value);
  };

  return (
    <input
      {...props}
      className={className}
      value={display}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
    />
  );
}
