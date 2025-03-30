import React, { useState } from 'react';
import { House } from '../types';
import { Plus, Pencil, Trash2, X, Check, AlertCircle } from 'lucide-react';
import { differenceInYears, isAfter, parse } from 'date-fns';

interface HousesManagerProps {
  houses: House[];
  onAdd: (house: Omit<House, 'id'>) => void;
  onUpdate: (house: House) => void;
  onDelete: (id: number) => void;
  formatCurrency: (value: number) => string;
}

export function HousesManager({ houses, onAdd, onUpdate, onDelete, formatCurrency }: HousesManagerProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newHouse, setNewHouse] = useState({
    name: '',
    nickname: '',
    currentResident: '',
    rent: '',
    dueDate: '',
    moveInDate: '',
    isPaid: false
  });
  const [editingHouse, setEditingHouse] = useState<House | null>(null);

  const calculateResidenceTime = (moveInDate: string) => {
    const years = differenceInYears(new Date(), new Date(moveInDate));
    return years;
  };

  const isOverdue = (dueDate: number, isPaid: boolean) => {
    if (isPaid) return false;
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const paymentDue = new Date(currentYear, currentMonth, dueDate);
    return isAfter(today, paymentDue);
  };

  const getRowClassName = (house: House) => {
    if (!house.isPaid) {
      return isOverdue(house.dueDate, house.isPaid) ? 'blink-overdue' : 'unpaid-row';
    }
    return '';
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      name: newHouse.name,
      nickname: newHouse.nickname,
      currentResident: newHouse.currentResident,
      rent: parseFloat(newHouse.rent),
      dueDate: parseInt(newHouse.dueDate),
      moveInDate: newHouse.moveInDate,
      isPaid: false
    });
    setNewHouse({ name: '', nickname: '', currentResident: '', rent: '', dueDate: '', moveInDate: '', isPaid: false });
    setIsAdding(false);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingHouse) {
      onUpdate(editingHouse);
      setEditingId(null);
      setEditingHouse(null);
    }
  };

  const startEditing = (house: House) => {
    setEditingId(house.id);
    setEditingHouse(house);
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Nome</th>
              <th className="text-left py-3">Apelido</th>
              <th className="text-left py-3">Morador</th>
              <th className="text-right py-3">Aluguel</th>
              <th className="text-center py-3">Vencimento</th>
              <th className="text-center py-3">Pago</th>
              <th className="text-center py-3">Tempo de Residência</th>
              <th className="text-right py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {houses.map((house) => (
              <tr key={house.id} className={`border-b transition-colors ${getRowClassName(house)}`}>
                {editingId === house.id ? (
                  <td colSpan={8} className="py-3">
                    <form onSubmit={handleEditSubmit} className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={editingHouse?.name}
                        onChange={(e) => setEditingHouse(prev => prev ? {...prev, name: e.target.value} : null)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
                        required
                      />
                      <input
                        type="text"
                        value={editingHouse?.nickname}
                        onChange={(e) => setEditingHouse(prev => prev ? {...prev, nickname: e.target.value} : null)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
                        required
                      />
                      <input
                        type="text"
                        value={editingHouse?.currentResident}
                        onChange={(e) => setEditingHouse(prev => prev ? {...prev, currentResident: e.target.value} : null)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
                        required
                      />
                      <input
                        type="number"
                        step="0.01"
                        value={editingHouse?.rent}
                        onChange={(e) => setEditingHouse(prev => prev ? {...prev, rent: parseFloat(e.target.value)} : null)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
                        required
                      />
                      <input
                        type="number"
                        min="1"
                        max="31"
                        value={editingHouse?.dueDate}
                        onChange={(e) => setEditingHouse(prev => prev ? {...prev, dueDate: parseInt(e.target.value)} : null)}
                        className="w-20 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
                        required
                      />
                      <input
                        type="date"
                        value={editingHouse?.moveInDate}
                        onChange={(e) => setEditingHouse(prev => prev ? {...prev, moveInDate: e.target.value} : null)}
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
                        required
                      />
                      <button type="submit" className="p-2 text-green-600 hover:text-green-800">
                        <Check className="w-5 h-5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingId(null);
                          setEditingHouse(null);
                        }}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </form>
                  </td>
                ) : (
                  <>
                    <td className="py-3">{house.name}</td>
                    <td className="py-3">{house.nickname}</td>
                    <td className="py-3">{house.currentResident}</td>
                    <td className="text-right">{formatCurrency(house.rent)}</td>
                    <td className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <span>Dia {house.dueDate}</span>
                        {isOverdue(house.dueDate, house.isPaid) && (
                          <AlertCircle className="w-4 h-4 text-red-500" />
                        )}
                      </div>
                    </td>
                    <td className="text-center">
                      <input
                        type="checkbox"
                        checked={house.isPaid}
                        onChange={() => onUpdate({ ...house, isPaid: !house.isPaid })}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="text-center">{calculateResidenceTime(house.moveInDate)} anos</td>
                    <td className="text-right">
                      <button
                        onClick={() => startEditing(house)}
                        className="p-2 text-blue-600 hover:text-blue-800"
                      >
                        <Pencil className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => onDelete(house.id)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isAdding ? (
        <form onSubmit={handleAddSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nome</label>
              <input
                type="text"
                value={newHouse.name}
                onChange={(e) => setNewHouse({ ...newHouse, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Apelido</label>
              <input
                type="text"
                value={newHouse.nickname}
                onChange={(e) => setNewHouse({ ...newHouse, nickname: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Morador Atual</label>
              <input
                type="text"
                value={newHouse.currentResident}
                onChange={(e) => setNewHouse({ ...newHouse, currentResident: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Valor do Aluguel</label>
              <input
                type="number"
                step="0.01"
                value={newHouse.rent}
                onChange={(e) => setNewHouse({ ...newHouse, rent: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Data de Vencimento</label>
              <input
                type="number"
                min="1"
                max="31"
                value={newHouse.dueDate}
                onChange={(e) => setNewHouse({ ...newHouse, dueDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Data de Entrada</label>
              <input
                type="date"
                value={newHouse.moveInDate}
                onChange={(e) => setNewHouse({ ...newHouse, moveInDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-200"
                required
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              Adicionar Casa
            </button>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-4 flex items-center space-x-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Adicionar Nova Casa</span>
        </button>
      )}
    </div>
  );
}