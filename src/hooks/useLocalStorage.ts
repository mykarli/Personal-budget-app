// hooks/useLocalStorage.ts
import { useEffect } from 'react';
import { useBudget } from '../context/BudgetContext';

export const useLocalStorage = () => {
  const { state, dispatch } = useBudget();

  useEffect(() => {
    const savedState = localStorage.getItem('budgetState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      parsedState.transactions.forEach((transaction: any) => {
        dispatch({ type: 'ADD_TRANSACTION', payload: transaction });
      });
      parsedState.budgets.forEach((budget: any) => {
        dispatch({ type: 'SET_BUDGET', payload: budget });
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('budgetState', JSON.stringify(state));
  }, [state]);
};