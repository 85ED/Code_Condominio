import React from 'react';
import { Building2 } from 'lucide-react';
import { Condominium } from '../types';

interface CondominiumSelectorProps {
  condominiums: Condominium[];
  onSelect: (condominium: Condominium) => void;
}

export function CondominiumSelector({ condominiums, onSelect }: CondominiumSelectorProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-12 px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Gerenciador Code 85
          </h1>
          <p className="text-sm italic text-gray-600 max-w-2xl mx-auto">
            Criado por Edson, administrador com MBA em Finanças e desenvolvedor formado em Sistemas de Informação. 
            Gestão estratégica e inovação em um só lugar.
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {condominiums.map((condominium) => (
            <button
              key={condominium.id}
              onClick={() => onSelect(condominium)}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Building2 className="w-8 h-8 text-blue-500" />
                <h2 className="text-xl font-semibold">{condominium.name}</h2>
              </div>
              <p className="text-gray-600 mb-2">{condominium.description}</p>
              <p className="text-sm text-gray-500">{condominium.address}</p>
              <p className="text-sm text-gray-500 mt-2">{condominium.units} unidades</p>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}