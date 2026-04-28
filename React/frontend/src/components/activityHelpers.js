// src/components/activityHelpers.js
import {
  UserPlus,
  UserCog,
  UserX,
  FilePlus,
  FilePen,
  FileX,
  Receipt,
  ReceiptText,
  Trash2,
} from "lucide-react";


// -----------------------------
// ICON MAPPER
// -----------------------------
export const activityIcon = (action) => {
  switch (action) {
    // Customers
    case "customer_created":
      return <UserPlus className="text-blue-600" size={20} />;
    case "customer_updated":
      return <UserCog className="text-yellow-600" size={20} />;
    case "customer_deleted":
      return <UserX className="text-red-600" size={20} />;

    // Policies
    case "policy_created":
      return <FilePlus className="text-green-600" size={20} />;
    case "policy_updated":
      return <FilePen className="text-orange-600" size={20} />;
    case "policy_deleted":
      return <FileX className="text-red-600" size={20} />;

    // Invoices
    case "invoice_created":
      return <Receipt className="text-purple-600" size={20} />;
    case "invoice_updated":
      return <ReceiptText className="text-indigo-600" size={20} />;
    case "invoice_deleted":
      return <Trash2 className="text-red-600" size={20} />;

    default:
      return <FilePen size={20} />;
  }
};


// -----------------------------
// BADGE MAPPER
// -----------------------------
export const activityBadge = (action) => {
  const base = "px-2 py-0.5 rounded text-xs font-semibold";

  if (action.startsWith("customer_")) {
    return <span className={`${base} bg-blue-100 text-blue-700`}>Customer</span>;
  }

  if (action.startsWith("policy_")) {
    return <span className={`${base} bg-green-100 text-green-700`}>Policy</span>;
  }

  if (action.startsWith("invoice_")) {
    return <span className={`${base} bg-purple-100 text-purple-700`}>Invoice</span>;
  }

  return <span className={`${base} bg-gray-100 text-gray-700`}>Other</span>;
};
