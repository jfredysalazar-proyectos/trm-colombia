/*
 * Header Component - Fintech Modern Design
 * - Glassmorphism navbar with blur effect
 * - Logo with Colombian flag colors accent
 * - Responsive navigation
 */

import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'TRM Hoy' },
  { href: '/#calculadora', label: 'Calculadora' },
  { href: '/#historico', label: 'Histórico' },
  { href: '/#grafica', label: 'Gráfica' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card border-b border-white/10">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1E3A5F] to-[#10B981] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                {/* Colombian flag accent */}
                <div className="absolute -bottom-1 -right-1 flex gap-[2px]">
                  <div className="w-2 h-1 bg-[#FCD116] rounded-sm" />
                  <div className="w-2 h-1 bg-[#003893] rounded-sm" />
                  <div className="w-2 h-1 bg-[#CE1126] rounded-sm" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight text-foreground">
                  TRM Colombia
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight">
                  Dólar Hoy
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    'hover:bg-primary/10 hover:text-primary',
                    location === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border/50">
            <nav className="container py-4 flex flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200',
                    'hover:bg-primary/10 hover:text-primary',
                    location === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
