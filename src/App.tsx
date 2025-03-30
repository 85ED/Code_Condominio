import React, { useState } from 'react';
import { CondominiumSelector } from './components/CondominiumSelector';
import { CondominiumDashboard } from './components/CondominiumDashboard';
import { Condominium } from './types';

const CONDOMINIUMS: Condominium[] = [
  {
    id: 'condominio-do-sol',
    name: 'Condomínio do Sol',
    description: 'Conjunto residencial com 9 casas',
    address: 'R. Inocêncio de Góes, 131 - Vila Cardoso Franco SP',
    units: 9
  },
  // More condominiums can be added here
];

function App() {
  const [selectedCondominium, setSelectedCondominium] = useState<Condominium | null>(null);

  if (!selectedCondominium) {
    return <CondominiumSelector condominiums={CONDOMINIUMS} onSelect={setSelectedCondominium} />;
  }

  return <CondominiumDashboard condominium={selectedCondominium} onBack={() => setSelectedCondominium(null)} />;
}

export default App;