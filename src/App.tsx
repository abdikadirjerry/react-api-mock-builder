import React, { useState } from "react";
import { INITIAL_ENDPOINTS } from "./data/endpoints";
import type { MockEndpoint } from "./types/api";
import { Header } from "./components/Header";
import { MockBuilder } from "./components/MockBuilder";

export function App() {
  const [endpoints, setEndpoints] = useState<MockEndpoint[]>(INITIAL_ENDPOINTS);

  const handleAddEndpoint = (newEpData: Omit<MockEndpoint, "id">) => {
    const newEndpoint: MockEndpoint = {
      id: `ep-${Date.now()}`,
      ...newEpData,
    };
    setEndpoints((prev) => [newEndpoint, ...prev]);
  };

  const handleDeleteEndpoint = (id: string) => {
    setEndpoints((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-mono flex flex-col selection:bg-cyan-500 selection:text-white">
      <Header />
      <MockBuilder
        endpoints={endpoints}
        onAddEndpoint={handleAddEndpoint}
        onDeleteEndpoint={handleDeleteEndpoint}
      />
    </div>
  );
}

export default App;
