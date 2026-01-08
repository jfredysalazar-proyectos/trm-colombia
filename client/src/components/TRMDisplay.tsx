/*
 * TRMDisplay Component - Hero Section
 * - Large typography for TRM value (Outfit 800)
 * - Animated trend indicator
 * - Value in words
 * - Glassmorphism card effect
 */

import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Minus, RefreshCw, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  TRMData,
  formatTRM,
  numberToWords,
  formatDate,
  calculateChange,
} from '@/hooks/useTRM';

interface TRMDisplayProps {
  current: TRMData | null;
  previous: TRMData | null;
  loading: boolean;
  onRefresh: () => void;
}

export default function TRMDisplay({
  current,
  previous,
  loading,
  onRefresh,
}: TRMDisplayProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentValue = current ? parseFloat(current.valor) : 0;
  const previousValue = previous ? parseFloat(previous.valor) : currentValue;
  const change = calculateChange(currentValue, previousValue);

  // Animate the number counting up
  useEffect(() => {
    if (!current || loading) return;

    setIsAnimating(true);
    const targetValue = parseFloat(current.valor);
    const startValue = displayValue || targetValue * 0.95;
    const duration = 1000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const newValue = startValue + (targetValue - startValue) * easeOut;

      setDisplayValue(newValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(animate);
  }, [current?.valor]);

  const TrendIcon =
    change.direction === 'up'
      ? TrendingUp
      : change.direction === 'down'
      ? TrendingDown
      : Minus;

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero-bg.png)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />

      <div className="relative container pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 animate-fade-in-up">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>
                TRM vigente al{' '}
                {current ? formatDate(current.vigenciadesde) : '...'}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onRefresh}
              disabled={loading}
              className="gap-2"
            >
              <RefreshCw
                className={cn('w-4 h-4', loading && 'animate-spin')}
              />
              <span className="hidden sm:inline">Actualizar</span>
            </Button>
          </div>

          {/* Main TRM Card */}
          <div className="glass-card rounded-2xl p-6 md:p-10 animate-fade-in-up delay-100">
            {/* Label */}
            <p className="text-sm md:text-base text-muted-foreground mb-2 font-medium">
              ¿A cómo está el Dólar hoy?
            </p>

            {/* TRM Value */}
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-lg md:text-xl text-muted-foreground font-medium">
                1 USD =
              </span>
              <div className="flex items-baseline">
                <span
                  className={cn(
                    'trm-value text-5xl md:text-7xl lg:text-8xl',
                    'bg-gradient-to-r from-[#1E3A5F] to-[#10B981] bg-clip-text text-transparent',
                    isAnimating && 'animate-pulse'
                  )}
                >
                  {loading ? '...' : formatTRM(displayValue)}
                </span>
                <span className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-muted-foreground ml-2">
                  COP
                </span>
              </div>
            </div>

            {/* Value in words */}
            <p className="text-sm md:text-base text-muted-foreground mb-6 font-medium">
              {loading ? '...' : numberToWords(currentValue)}
            </p>

            {/* Change indicator */}
            {!loading && previous && (
              <div
                className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium',
                  change.direction === 'up' &&
                    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                  change.direction === 'down' &&
                    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                  change.direction === 'neutral' &&
                    'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                )}
              >
                <TrendIcon className="w-4 h-4" />
                <span>
                  {change.direction === 'up' ? '+' : ''}
                  {formatTRM(change.value)} COP ({change.percentage.toFixed(2)}%)
                </span>
                <span className="text-xs opacity-75">vs. día anterior</span>
              </div>
            )}
          </div>

          {/* Currency illustration */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 opacity-50 pointer-events-none">
            <img
              src="/images/currency-illustration.png"
              alt=""
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
