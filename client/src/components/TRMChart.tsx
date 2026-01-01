/*
 * TRMChart Component - Historical Chart
 * - Line chart with Recharts
 * - Period filters (15d, 1m, 3m, 6m, 1y)
 * - Animated line drawing
 * - Tooltip with date and value
 */

import { useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';
import { TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TRMData, formatTRM, formatShortDate } from '@/hooks/useTRM';

interface TRMChartProps {
  data: TRMData[];
  loading: boolean;
}

type Period = '15d' | '1m' | '3m' | '6m' | '1y';

const periods: { value: Period; label: string; days: number }[] = [
  { value: '15d', label: '15 días', days: 15 },
  { value: '1m', label: '1 mes', days: 30 },
  { value: '3m', label: '3 meses', days: 90 },
  { value: '6m', label: '6 meses', days: 180 },
  { value: '1y', label: '1 año', days: 365 },
];

export default function TRMChart({ data, loading }: TRMChartProps) {
  const [period, setPeriod] = useState<Period>('1m');

  const chartData = useMemo(() => {
    const selectedPeriod = periods.find((p) => p.value === period);
    const days = selectedPeriod?.days || 30;

    // Filter data for the selected period
    const filteredData = data.slice(0, days);

    // Transform and reverse for chronological order
    return filteredData
      .map((item) => ({
        date: formatShortDate(item.vigenciadesde),
        fullDate: item.vigenciadesde,
        value: parseFloat(item.valor),
      }))
      .reverse();
  }, [data, period]);

  const { minValue, maxValue } = useMemo(() => {
    if (chartData.length === 0) return { minValue: 0, maxValue: 0 };
    const values = chartData.map((d) => d.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const padding = (max - min) * 0.1;
    return {
      minValue: Math.floor(min - padding),
      maxValue: Math.ceil(max + padding),
    };
  }, [chartData]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card rounded-lg p-3 shadow-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">{label}</p>
          <p className="font-mono font-bold text-lg text-foreground">
            {formatTRM(payload[0].value)} COP
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="grafica" className="py-12 md:py-16 bg-secondary/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 animate-fade-in-up">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#10B981] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
                  Gráfica de Evolución
                </h2>
                <p className="text-sm text-muted-foreground">
                  Histórico de la TRM en Colombia
                </p>
              </div>
            </div>

            {/* Period Filters */}
            <div className="flex flex-wrap gap-2">
              {periods.map((p) => (
                <Button
                  key={p.value}
                  variant={period === p.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPeriod(p.value)}
                  className={cn(
                    'text-xs',
                    period === p.value &&
                      'bg-gradient-to-r from-[#1E3A5F] to-[#10B981] border-0'
                  )}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Chart Card */}
          <div className="glass-card rounded-2xl p-4 md:p-6 animate-fade-in-up delay-100">
            {loading ? (
              <div className="h-[400px] flex items-center justify-center">
                <div className="animate-pulse text-muted-foreground">
                  Cargando gráfica...
                </div>
              </div>
            ) : (
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="colorValue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10B981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10B981"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="var(--border)"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="date"
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      interval="preserveStartEnd"
                      tick={{ fill: 'var(--muted-foreground)' }}
                    />
                    <YAxis
                      stroke="var(--muted-foreground)"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      domain={[minValue, maxValue]}
                      tickFormatter={(value) => formatTRM(value)}
                      tick={{ fill: 'var(--muted-foreground)' }}
                      width={80}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#10B981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorValue)"
                      animationDuration={1500}
                      animationEasing="ease-out"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
