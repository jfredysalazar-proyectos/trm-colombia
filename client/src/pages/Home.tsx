/*
 * Home Page - TRM Colombia
 * Design: Fintech Moderno con Glassmorphism
 * - Hero section with current TRM
 * - Calculator for currency conversion
 * - Historical chart
 * - Conversion tables
 */

import { useMemo } from 'react';
import Header from '@/components/Header';
import TRMDisplay from '@/components/TRMDisplay';
import Calculator from '@/components/Calculator';
import TRMChart from '@/components/TRMChart';
import HistoricalTable from '@/components/HistoricalTable';
import Footer from '@/components/Footer';
import { useTRM } from '@/hooks/useTRM';

export default function Home() {
  const { current, historical, loading, error, refresh } = useTRM();

  const previousTRM = useMemo(() => {
    return historical.length > 1 ? historical[1] : null;
  }, [historical]);

  const currentTRMValue = current ? parseFloat(current.valor) : 0;

  return (
    <div className="min-h-screen flex flex-col gradient-bg">
      <Header />

      <main className="flex-1">
        {/* Hero Section - Current TRM */}
        <TRMDisplay
          current={current}
          previous={previousTRM}
          loading={loading}
          onRefresh={refresh}
        />

        {/* Error Message */}
        {error && (
          <div className="container py-4">
            <div className="max-w-4xl mx-auto">
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-center">
                <p className="text-destructive font-medium">{error}</p>
                <button
                  onClick={refresh}
                  className="mt-2 text-sm text-destructive underline"
                >
                  Intentar de nuevo
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Calculator Section */}
        <Calculator trm={currentTRMValue} />

        {/* Chart Section */}
        <TRMChart data={historical} loading={loading} />

        {/* Historical Table Section */}
        <HistoricalTable
          data={historical}
          loading={loading}
          currentTRM={currentTRMValue}
        />
      </main>

      <Footer />
    </div>
  );
}
