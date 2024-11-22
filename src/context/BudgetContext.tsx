import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Category = 'food' | 'transport' | 'entertainment' | 'bills' | 'other';

interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: Category;
  description: string;
  date: string;
}

interface Budget {
  category: Category;
  limit: number;
}

interface BudgetState {
  transactions: Transaction[];
  budgets: Budget[];
}

type BudgetAction =
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'SET_BUDGET'; payload: Budget }
  | { type: 'DELETE_TRANSACTION'; payload: string };

const initialState: BudgetState = {
  transactions: [],
  budgets: [],
};

const budgetReducer = (state: BudgetState, action: BudgetAction): BudgetState => {
  switch (action.type) {
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case 'SET_BUDGET':
      const existingBudgetIndex = state.budgets.findIndex(
        (budget) => budget.category === action.payload.category
      );
      if (existingBudgetIndex >= 0) {
        const newBudgets = [...state.budgets];
        newBudgets[existingBudgetIndex] = action.payload;
        return { ...state, budgets: newBudgets };
      }
      return {
        ...state,
        budgets: [...state.budgets, action.payload],
      };
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter((t) => t.id !== action.payload),
      };
    default:
      return state;
  }
};

const BudgetContext = createContext<{
  state: BudgetState;
  dispatch: React.Dispatch<BudgetAction>;
} | null>(null);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => {
  const context = useContext(BudgetContext);
  if (!context) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
};