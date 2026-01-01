/*
 * DateSelector Component - Historical TRM Query
 * - Calendar date picker
 * - Query TRM for specific date
 * - Display result with comparison
 */

import { useState, useCallback } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar as CalendarIcon, Search, X, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import {
  TRMData,
  formatTRM,
  formatDate,
  numberToWords,
} from '@/hooks/useTRM';

interface DateSelectorProps {
  onFetchTRM: (date: string) => Promise<TRMData | null>;
  currentTRM: number;
}

export default function DateSelector({ onFetchTRM, currentTRM }: DateSelectorProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TRMData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDateSelect = useCallback(async (date: Date | undefined) => {
    setSelectedDate(date);
    setIsOpen(false);
    
    if (!date) {
      setResult(null);
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const data = await onFetchTRM(dateStr);
      
      if (data) {
        setResult(data);
      } else {
        setError('No se encontró TRM para esta fecha. Es posible que sea un día no hábil.');
        setResult(null);
      }
    } catch (err) {
      setError('Error al consultar la TRM. Intente nuevamente.');
      setResult(null);
    } finally {
      setLoading(false);
    }
  }, [onFetchTRM]);

  const handleClear = () => {
    setSelectedDate(undefined);
    setResult(null);
    setError(null);
  };

  const resultValue = result ? parseFloat(result.valor) : 0;
  const change = resultValue - currentTRM;
  const changePercent = currentTRM !== 0 ? (change / currentTRM) * 100 : 0;
  const direction = change > 0 ? 'up' : change < 0 ? 'down' : 'neutral';

  const TrendIcon = direction === 'up' ? TrendingUp : direction === 'down' ? TrendingDown : Minus;

  return (
    <section id="consultar" className="py-8 md:py-12">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#10B981] flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
                Consultar Fecha Específica
              </h2>
              <p className="text-sm text-muted-foreground">
                Busca la TRM de cualquier fecha histórica
              </p>
            </div>
          </div>

          {/* Date Picker Card */}
          <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in-up delay-100">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Date Picker */}
              <Popover open={isOpen} onOpenChange={setIsOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full sm:w-[280px] justify-start text-left font-normal h-12',
                      !selectedDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? (
                      format(selectedDate, "PPP", { locale: es })
                    ) : (
                      <span>Selecciona una fecha</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1991-01-01')
                    }
                    initialFocus
                    locale={es}
                  />
                </PopoverContent>
              </Popover>

              {/* Clear Button */}
              {selectedDate && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  className="shrink-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Loading State */}
            {loading && (
              <div className="mt-6 text-center text-muted-foreground">
                <div className="animate-pulse">Consultando TRM...</div>
              </div>
            )}

            {/* Error State */}
            {error && !loading && (
              <div className="mt-6 p-4 bg-destructive/10 border border-destructive/20 rounded-xl">
                <p className="text-destructive text-sm text-center">{error}</p>
              </div>
            )}

            {/* Result */}
            {result && !loading && (
              <div className="mt-6 pt-6 border-t border-border">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground mb-2">
                    TRM del {formatDate(result.vigenciadesde)}
                  </p>
                  
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-lg text-muted-foreground">1 USD =</span>
                    <span className="trm-value text-4xl md:text-5xl bg-gradient-to-r from-[#1E3A5F] to-[#10B981] bg-clip-text text-transparent">
                      {formatTRM(result.valor)}
                    </span>
                    <span className="text-xl font-display font-bold text-muted-foreground">
                      COP
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">
                    {numberToWords(parseFloat(result.valor))}
                  </p>

                  {/* Comparison with current TRM */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <div
                      className={cn(
                        'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
                        direction === 'up' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                        direction === 'down' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                        direction === 'neutral' && 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                      )}
                    >
                      <TrendIcon className="w-4 h-4" />
                      <span>
                        {direction === 'up' ? '+' : ''}
                        {formatTRM(change)} COP ({changePercent.toFixed(2)}%)
                      </span>
                      <span className="text-xs opacity-75">vs. hoy</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Helper text */}
            {!selectedDate && !loading && (
              <p className="mt-4 text-xs text-muted-foreground text-center">
                Datos disponibles desde enero de 1991 hasta la fecha actual
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
