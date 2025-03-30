import React, { useState } from 'react';
import { MonthSelector } from './MonthSelector';
import { Dashboard } from './Dashboard';
import { ExpenseForm } from './ExpenseForm';
import { HousesManager } from './HousesManager';
import { BalanceCard } from './BalanceCard';
import { House, Expense, MonthlyData, Condominium } from '../types';
import { Building2, Receipt, ArrowLeft, DollarSign } from 'lucide-react';
import { startOfMonth, endOfMonth, format, parseISO, startOfYear, isWithinInterval } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CondominiumDashboardProps {
  condominium: Condominium;
  onBack: () => void;
}

export function CondominiumDashboard({ condominium, onBack }: CondominiumDashboardProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [houses, setHouses] = useState<House[]>([
    { 
      id: 1, 
      name: 'Casa 1',
      nickname: 'Esperança', 
      currentResident: 'Larissa', 
      rent: 990,
      dueDate: 5,
      isPaid: false,
      moveInDate: '2017-01-01'
    },
    { 
      id: 2, 
      name: 'Casa 2',
      nickname: 'Salção', 
      currentResident: 'Ariane', 
      rent: 550,
      dueDate: 25,
      isPaid: false,
      moveInDate: '2021-01-01'
    },
    { 
      id: 3, 
      name: 'Casa 3',
      nickname: 'Brilho', 
      currentResident: 'San Yuri', 
      rent: 1090,
      dueDate: 15,
      isPaid: false,
      moveInDate: '2022-01-01'
    },
    { 
      id: 4, 
      name: 'Casa 4',
      nickname: 'Paz', 
      currentResident: 'Eliete', 
      rent: 400,
      dueDate: 28,
      isPaid: false,
      moveInDate: '1993-01-01'
    },
    { 
      id: 5, 
      name: 'Casa 5',
      nickname: 'Sereno', 
      currentResident: 'Daniela', 
      rent: 990,
      dueDate: 10,
      isPaid: false,
      moveInDate: '2023-01-01'
    },
    { 
      id: 6, 
      name: 'Casa 6',
      nickname: 'Bondade', 
      currentResident: 'Daniel', 
      rent: 990,
      dueDate: 10,
      isPaid: false,
      moveInDate: '2022-01-01'
    },
    { 
      id: 7, 
      name: 'Casa 7',
      nickname: 'Aurora', 
      currentResident: 'Miguel', 
      rent: 890,
      dueDate: 10,
      isPaid: false,
      moveInDate: '2025-01-01'
    },
    { 
      id: 8, 
      name: 'Casa 8',
      nickname: 'Sonho', 
      currentResident: 'Vago', 
      rent: 890,
      dueDate: 10,
      isPaid: false,
      moveInDate: '2025-01-01'
    },
    { 
      id: 9, 
      name: 'Casa 9',
      nickname: 'Felicidade', 
      currentResident: 'Maria', 
      rent: 990,
      dueDate: 10,
      isPaid: false,
      moveInDate: '2024-01-01'
    }
  ]);

  const [expenses, setExpenses] = useState<Expense[]>([]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = parseISO(expense.date);
    return isWithinInterval(expenseDate, {
      start: startOfMonth(selectedDate),
      end: endOfMonth(selectedDate)
    });
  });

  const currentYearExpenses = expenses.filter(expense => {
    const expenseDate = parseISO(expense.date);
    return isWithinInterval(expenseDate, {
      start: startOfYear(selectedDate),
      end: endOfMonth(selectedDate)
    });
  });

  const totalMonthlyIncome = houses.reduce((sum, house) => sum + house.rent, 0);
  const totalMonthlyExpenses = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyBalance = totalMonthlyIncome - totalMonthlyExpenses;

  const totalYearlyIncome = totalMonthlyIncome * (selectedDate.getMonth() + 1);
  const totalYearlyExpenses = currentYearExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const yearlyBalance = totalYearlyIncome - totalYearlyExpenses;

  const monthlyData: MonthlyData[] = [
    { month: format(selectedDate, 'MMM'), income: totalMonthlyIncome, expenses: totalMonthlyExpenses }
  ];

  const expensesByGroup = currentMonthExpenses.reduce((groups: { name: string; value: number }[], expense) => {
    const existingGroup = groups.find(group => group.name === expense.accountGroup);
    if (existingGroup) {
      existingGroup.value += expense.amount;
    } else {
      groups.push({ name: expense.accountGroup, value: expense.amount });
    }
    return groups;
  }, []);

  const handleAddExpense = (newExpense: Omit<Expense, 'id'>) => {
    setExpenses(prev => [...prev, { ...newExpense, id: prev.length + 1 }]);
  };

  const handleAddHouse = (house: Omit<House, 'id'>) => {
    setHouses(prev => [...prev, { ...house, id: prev.length + 1 }]);
  };

  const handleUpdateHouse = (updatedHouse: House) => {
    setHouses(houses.map(house => 
      house.id === updatedHouse.id ? updatedHouse : house
    ));
  };

  const handleDeleteHouse = (id: number) => {
    setHouses(houses.filter(house => house.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <h1 className="text-3xl font-bold text-gray-900">
                {condominium.name}
              </h1>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {format(new Date(), "EEEE',' dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <MonthSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <DollarSign className="w-8 h-8 text-blue-500" />
              <div>
                <h2 className="text-2xl font-semibold">Receitas</h2>
                <p className="text-sm text-gray-500">Mês Atual</p>
              </div>
            </div>
            <p className="text-4xl font-bold text-blue-500 mb-2">
              {formatCurrency(totalMonthlyIncome)}
            </p>
            <p className="text-base text-gray-700">
              Ano {selectedDate.getFullYear()}: {formatCurrency(totalYearlyIncome)}
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-3 mb-4">
              <Receipt className="w-8 h-8 text-red-500" />
              <div>
                <h2 className="text-2xl font-semibold">Despesas</h2>
                <p className="text-sm text-gray-500">Mês Atual</p>
              </div>
            </div>
            <p className="text-4xl font-bold text-red-500 mb-2">
              {formatCurrency(totalMonthlyExpenses)}
            </p>
            <p className="text-base text-gray-700">
              Ano {selectedDate.getFullYear()}: {formatCurrency(totalYearlyExpenses)}
            </p>
          </div>

          <BalanceCard
            monthlyBalance={monthlyBalance}
            yearlyBalance={yearlyBalance}
            formatCurrency={formatCurrency}
            year={selectedDate.getFullYear()}
          />
        </div>

        <div className="mb-8">
          <Dashboard data={monthlyData} expensesByGroup={expensesByGroup} />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Building2 className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Casas</h2>
          </div>
          <HousesManager
            houses={houses}
            onAdd={handleAddHouse}
            onUpdate={handleUpdateHouse}
            onDelete={handleDeleteHouse}
            formatCurrency={formatCurrency}
          />
        </div>

        {expenses.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Despesas Registradas</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3">Data</th>
                    <th className="text-left py-3">Grupo</th>
                    <th className="text-left py-3">Tipo</th>
                    <th className="text-left py-3">Descrição</th>
                    <th className="text-right py-3">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {[...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((expense) => (
                    <tr key={expense.id} className="border-b">
                      <td className="py-3">{expense.date}</td>
                      <td className="py-3">{expense.accountGroup}</td>
                      <td className="py-3">{expense.expenseType}</td>
                      <td className="py-3">{expense.description}</td>
                      <td className="text-right">{formatCurrency(expense.amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center space-x-3 mb-4">
            <Receipt className="w-6 h-6 text-blue-500" />
            <h2 className="text-xl font-semibold">Nova Despesa</h2>
          </div>
          <ExpenseForm onSubmit={handleAddExpense} />
        </div>
      </main>
    </div>
  );
}