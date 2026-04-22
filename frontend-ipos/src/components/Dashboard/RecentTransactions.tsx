import React from "react";
import type { Transaction } from "../../../src/features/auth/types/dashboard";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
}) => {
  return (
    <div className="bg-white rounded-[14px] p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-[15px] font-bold text-[#1a1a2e]">
          Recent Transactions
        </h3>
        <a href="#" className="text-[12px] text-[#e94560] font-semibold ">
          View All
        </a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left text-[11px] uppercase tracking-[0.5px] text-gray-400 font-semibold pb-3 px-3">
                Order
              </th>
              <th className="text-left text-[11px] uppercase tracking-[0.5px] text-gray-400 font-semibold pb-3 px-3">
                Outlet
              </th>
              <th className="text-left text-[11px] uppercase tracking-[0.5px] text-gray-400 font-semibold pb-3 px-3">
                Cashier
              </th>
              <th className="text-left text-[11px] uppercase tracking-[0.5px] text-gray-400 font-semibold pb-3 px-3">
                Amount
              </th>
              <th className="text-left text-[11px] uppercase tracking-[0.5px] text-gray-400 font-semibold pb-3 px-3">
                Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr
                key={tx.id}
                className="border-t border-gray-50 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-3 text-[13px] text-gray-700">
                  {tx.orderNumber}
                </td>
                <td className="py-3 px-3 text-[13px] text-gray-700">
                  {tx.outlet}
                </td>
                <td className="py-3 px-3 text-[13px] text-gray-700">
                  {tx.cashier}
                </td>
                <td className="py-3 px-3 text-[13px] font-bold text-[#1a1a2e]">
                  {tx.amount}
                </td>
                <td className="py-3 px-3">
                  <span
                    className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                      tx.paymentType === "Card"
                        ? "bg-[#f0f4ff] text-[#4361ee]"
                        : tx.paymentType === "Cash"
                          ? "bg-[#e6faf8] text-[#2ec4b6]"
                          : "bg-[#fff5e6] text-[#f77f00]"
                    }`}
                  >
                    {tx.paymentType}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTransactions;
