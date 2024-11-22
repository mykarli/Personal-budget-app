import React, { useState } from 'react';
import { useBudget } from '../context/BudgetContext';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';

export default function Dashboard() {
  const { state } = useBudget();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['food', 'transport', 'entertainment', 'bills', 'other'];

  const getTotalExpenses = () => {
    return state.transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  const getTotalIncome = () => {
    return state.transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, curr) => acc + curr.amount, 0);
  };

  const getChartData = () => {
    const monthlyData: { [key: string]: { expenses: number; income: number } } = {};

    state.transactions.forEach((transaction) => {
      const month = format(new Date(transaction.date), 'MMM yyyy');
      if (!monthlyData[month]) {
        monthlyData[month] = { expenses: 0, income: 0 };
      }
      if (transaction.type === 'expense') {
        monthlyData[month].expenses += transaction.amount;
      } else {
        monthlyData[month].income += transaction.amount;
      }
    });

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      ...data,
    }));
  };

  return (
    <div id="pdf-content" className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Income</h3>
          <p className="text-2xl text-green-600">${getTotalIncome()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
          <p className="text-2xl text-red-600">${getTotalExpenses()}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Balance</h3>
          <p className="text-2xl">${getTotalIncome() - getTotalExpenses()}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Monthly Overview</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={getChartData()}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#10B981" name="Income" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}