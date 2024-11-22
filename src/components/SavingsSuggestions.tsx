'use client';

import { useBudget } from '@/context/BudgetContext';
import { format } from 'date-fns';

export default function SavingsSuggestions() {
  const { state } = useBudget();

  const calculateSavingsSuggestions = () => {
    const totalIncome = state.transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = state.transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const savingsRate = (1 - totalExpenses / totalIncome) * 100;

    let suggestions: string[] = [];

    if (savingsRate < 10) {
      suggestions = [
        "💡 Çok fazla harcama yapıyorsunuz. Acilen harcamalarınızı gözden geçirin.",
        "🥘 Yemek, market ve restoran harcamalarını azaltmayı deneyin.",
        "🚗 Ulaşım ve abonelik giderlerinizi kontrol edin."
      ];
    } else if (savingsRate < 20) {
      suggestions = [
        "👍 Biraz daha tasarruf edebilirsiniz.",
        "📅 Sabit giderlerinizi gözden geçirin.",
        "🛒 İndirimleri ve fırsatları takip edin."
      ];
    } else {
      suggestions = [
        "🏆 Mükemmel tasarruf oranı!",
        "💰 Fazla paranızı yatırıma yönlendirebilirsiniz.",
        "🌟 Finansal hedefinize doğru ilerliyorsunuz."
      ];
    }

    return suggestions;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">💡 Tasarruf Önerileri</h3>
      <ul className="space-y-2">
        {calculateSavingsSuggestions().map((suggestion, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <p>{suggestion}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}