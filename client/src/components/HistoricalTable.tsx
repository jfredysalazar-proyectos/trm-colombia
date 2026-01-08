/*
 * HistoricalTable Component - TRM History
 * - Table with recent TRM values
 * - Trend indicators for each day
 * - Conversion table for common values
 */

import { useMemo } from 'react';
import { History, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { TRMData, formatTRM, formatDate, formatShortDate } from '@/hooks/useTRM';

interface HistoricalTableProps {
  data: TRMData[];
  loading: boolean;
  currentTRM: number;
}

const usdConversions = [1, 5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000];
const copConversions = [
  1000, 2000, 5000, 10000, 20000, 50000, 100000, 200000, 500000, 1000000,
  5000000,
];

export default function HistoricalTable({
  data,
  loading,
  currentTRM,
}: HistoricalTableProps) {
  const historicalData = useMemo(() => {
    return data.slice(0, 14).map((item, index) => {
      const currentValue = parseFloat(item.valor);
      const previousValue =
        index < data.length - 1 ? parseFloat(data[index + 1].valor) : currentValue;
      const change = currentValue - previousValue;
      const changePercent =
        previousValue !== 0 ? (change / previousValue) * 100 : 0;

      return {
        ...item,
        change,
        changePercent,
        direction: (change > 0 ? 'up' : change < 0 ? 'down' : 'neutral') as 'up' | 'down' | 'neutral',
      };
    });
  }, [data]);

  const TrendIcon = ({
    direction,
  }: {
    direction: 'up' | 'down' | 'neutral';
  }) => {
    if (direction === 'up')
      return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (direction === 'down')
      return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <section id="historico" className="py-12 md:py-16">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#10B981] flex items-center justify-center">
              <History className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
                Histórico y Conversiones
              </h2>
              <p className="text-sm text-muted-foreground">
                Últimos días y tabla de conversiones
              </p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="historical" className="animate-fade-in-up delay-100">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="historical">Últimos Días</TabsTrigger>
              <TabsTrigger value="usd-cop">USD → COP</TabsTrigger>
              <TabsTrigger value="cop-usd">COP → USD</TabsTrigger>
            </TabsList>

            {/* Historical Table */}
            <TabsContent value="historical">
              <div className="glass-card rounded-2xl overflow-hidden">
                {loading ? (
                  <div className="p-8 text-center text-muted-foreground">
                    Cargando histórico...
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead className="font-display font-semibold">
                          Fecha
                        </TableHead>
                        <TableHead className="font-display font-semibold text-right">
                          TRM
                        </TableHead>
                        <TableHead className="font-display font-semibold text-right">
                          Cambio
                        </TableHead>
                        <TableHead className="font-display font-semibold text-center w-16">
                          Tendencia
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {historicalData.map((item, index) => (
                        <TableRow
                          key={item.vigenciadesde}
                          className={cn(
                            'transition-colors hover:bg-secondary/30',
                            index === 0 && 'bg-primary/5'
                          )}
                        >
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span className="text-foreground">
                                {formatShortDate(item.vigenciadesde)}
                              </span>
                              {index === 0 && (
                                <span className="text-xs text-primary font-semibold">
                                  Hoy
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right font-mono font-medium">
                            ${formatTRM(item.valor)}
                          </TableCell>
                          <TableCell
                            className={cn(
                              'text-right font-mono text-sm',
                              item.direction === 'up' && 'text-green-500',
                              item.direction === 'down' && 'text-red-500',
                              item.direction === 'neutral' && 'text-gray-400'
                            )}
                          >
                            {item.direction === 'up' ? '+' : ''}
                            {formatTRM(item.change)} (
                            {item.changePercent.toFixed(2)}%)
                          </TableCell>
                          <TableCell className="text-center">
                            <TrendIcon direction={item.direction} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </TabsContent>

            {/* USD to COP Conversion Table */}
            <TabsContent value="usd-cop">
              <div className="glass-card rounded-2xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead className="font-display font-semibold">
                        Dólares (USD)
                      </TableHead>
                      <TableHead className="font-display font-semibold text-right">
                        Pesos Colombianos (COP)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {usdConversions.map((usd) => (
                      <TableRow
                        key={usd}
                        className="transition-colors hover:bg-secondary/30"
                      >
                        <TableCell className="font-mono font-medium">
                          ${usd.toLocaleString('es-CO')} USD
                        </TableCell>
                        <TableCell className="text-right font-mono font-medium text-primary">
                          ${formatTRM(usd * currentTRM)} COP
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* COP to USD Conversion Table */}
            <TabsContent value="cop-usd">
              <div className="glass-card rounded-2xl overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary/50">
                      <TableHead className="font-display font-semibold">
                        Pesos Colombianos (COP)
                      </TableHead>
                      <TableHead className="font-display font-semibold text-right">
                        Dólares (USD)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {copConversions.map((cop) => (
                      <TableRow
                        key={cop}
                        className="transition-colors hover:bg-secondary/30"
                      >
                        <TableCell className="font-mono font-medium">
                          ${cop.toLocaleString('es-CO')} COP
                        </TableCell>
                        <TableCell className="text-right font-mono font-medium text-primary">
                          $
                          {(cop / currentTRM).toLocaleString('es-CO', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{' '}
                          USD
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
