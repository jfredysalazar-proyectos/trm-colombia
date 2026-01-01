/*
 * Calculator Component - Currency Converter
 * - Bidirectional conversion USD <-> COP
 * - Real-time calculation
 * - Glassmorphism card design
 * - JetBrains Mono for numbers
 */

import { useState, useEffect } from 'react';
import { ArrowRightLeft, Calculator as CalcIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import {
  formatTRM,
  formatCurrency,
  convertUSDtoCOP,
  convertCOPtoUSD,
} from '@/hooks/useTRM';

interface CalculatorProps {
  trm: number;
}

type ConversionMode = 'usd-to-cop' | 'cop-to-usd';

export default function Calculator({ trm }: CalculatorProps) {
  const [mode, setMode] = useState<ConversionMode>('usd-to-cop');
  const [inputValue, setInputValue] = useState<string>('100');
  const [result, setResult] = useState<number>(0);

  useEffect(() => {
    const value = parseFloat(inputValue) || 0;
    if (mode === 'usd-to-cop') {
      setResult(convertUSDtoCOP(value, trm));
    } else {
      setResult(convertCOPtoUSD(value, trm));
    }
  }, [inputValue, mode, trm]);

  const handleSwapMode = () => {
    setMode(mode === 'usd-to-cop' ? 'cop-to-usd' : 'usd-to-cop');
    setInputValue(result.toFixed(2));
  };

  const inputCurrency = mode === 'usd-to-cop' ? 'USD' : 'COP';
  const outputCurrency = mode === 'usd-to-cop' ? 'COP' : 'USD';

  return (
    <section id="calculadora" className="py-12 md:py-16">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#10B981] flex items-center justify-center">
              <CalcIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl md:text-2xl text-foreground">
                Calculadora
              </h2>
              <p className="text-sm text-muted-foreground">
                Convierte entre Dólares y Pesos Colombianos
              </p>
            </div>
          </div>

          {/* Calculator Card */}
          <div className="glass-card rounded-2xl p-6 md:p-8 animate-fade-in-up delay-100">
            {/* Mode Selection */}
            <RadioGroup
              value={mode}
              onValueChange={(v) => setMode(v as ConversionMode)}
              className="flex flex-col sm:flex-row gap-3 mb-6"
            >
              <Label
                htmlFor="usd-to-cop"
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
                  mode === 'usd-to-cop'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <RadioGroupItem value="usd-to-cop" id="usd-to-cop" />
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium">USD</span>
                  <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono font-medium">COP</span>
                </div>
              </Label>
              <Label
                htmlFor="cop-to-usd"
                className={cn(
                  'flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all',
                  mode === 'cop-to-usd'
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                )}
              >
                <RadioGroupItem value="cop-to-usd" id="cop-to-usd" />
                <div className="flex items-center gap-2">
                  <span className="font-mono font-medium">COP</span>
                  <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                  <span className="font-mono font-medium">USD</span>
                </div>
              </Label>
            </RadioGroup>

            {/* Input and Output */}
            <div className="space-y-4">
              {/* Input */}
              <div>
                <Label
                  htmlFor="amount"
                  className="text-sm text-muted-foreground mb-2 block"
                >
                  Cantidad en {inputCurrency}
                </Label>
                <div className="relative">
                  <Input
                    id="amount"
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="font-mono text-lg h-14 pr-16"
                    placeholder="0.00"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono font-medium">
                    {inputCurrency}
                  </span>
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleSwapMode}
                  className="rounded-full h-10 w-10 border-2"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </Button>
              </div>

              {/* Output */}
              <div>
                <Label className="text-sm text-muted-foreground mb-2 block">
                  Resultado en {outputCurrency}
                </Label>
                <div className="bg-secondary/50 rounded-xl p-4 border border-border">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-3xl md:text-4xl font-bold text-foreground">
                      {mode === 'usd-to-cop'
                        ? formatTRM(result)
                        : result.toLocaleString('es-CO', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                    </span>
                    <span className="text-lg font-mono font-medium text-muted-foreground">
                      {outputCurrency}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* TRM Reference */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground text-center">
                TRM utilizada:{' '}
                <span className="font-mono font-medium text-foreground">
                  1 USD = {formatTRM(trm)} COP
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
