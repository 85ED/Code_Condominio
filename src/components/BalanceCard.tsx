import React from 'react';
import { Users2 } from 'lucide-react';

interface BalanceCardProps {
  monthlyBalance: number;
  yearlyBalance: number;
  formatCurrency: (value: number) => string;
  year: number;
}

export function BalanceCard({ monthlyBalance, yearlyBalance, formatCurrency, year }: BalanceCardProps) {
  const monthlyPartnerShare = monthlyBalance / 2;
  const yearlyPartnerShare = yearlyBalance / 2;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center space-x-3 mb-4">
        <Users2 className="w-6 h-6 text-purple-500" />
        <div>
          <h2 className="text-xl font-semibold">Divisão do Saldo</h2>
          <p className="text-sm text-gray-500">Mês Atual</p>
        </div>
      </div>
      <div className="space-y-4">
        <div>
          <p className={`text-2xl font-bold ${monthlyBalance >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
            Total: {formatCurrency(monthlyBalance)}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm text-gray-600">Edson</p>
              <p className={`text-lg font-semibold ${monthlyPartnerShare >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                {formatCurrency(monthlyPartnerShare)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Talita</p>
              <p className={`text-lg font-semibold ${monthlyPartnerShare >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                {formatCurrency(monthlyPartnerShare)}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500 mb-2">Ano {year}</p>
          <p className={`text-xl font-bold ${yearlyBalance >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
            Total: {formatCurrency(yearlyBalance)}
          </p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm text-gray-600">Edson</p>
              <p className={`text-lg font-semibold ${yearlyPartnerShare >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                {formatCurrency(yearlyPartnerShare)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Talita</p>
              <p className={`text-lg font-semibold ${yearlyPartnerShare >= 0 ? 'text-blue-500' : 'text-red-500'}`}>
                {formatCurrency(yearlyPartnerShare)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}