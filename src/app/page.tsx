'use client';

import { BudgetProvider } from '@/context/BudgetContext';
import Dashboard from '@/components/Dashboard';
import TransactionForm from '@/components/TransactionForm';
import ThemeToggle from '@/components/ThemeToggle';
import PDFExport from '@/components/PDFExport';
import SavingsSuggestions from '@/components/SavingsSuggestions';

export default function Home() {
  return (
    <BudgetProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <header className="bg-white dark:bg-gray-800 shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Personal Budget Tracker
            </h1>
            <div className="flex items-center space-x-4">
              <PDFExport />
              <ThemeToggle />
            </div>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto py-6 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Dashboard />
            </div>
            <div className="space-y-6">
              <TransactionForm />
              <SavingsSuggestions />
            </div>
          </div>
        </main>
      </div>
    </BudgetProvider>
  );
}