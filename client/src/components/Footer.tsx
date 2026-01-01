/*
 * Footer Component
 * - Data source attribution
 * - Colombian flag accent
 * - Links and copyright
 */

import { ExternalLink, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-border bg-secondary/30">
      <div className="container">
        <div className="max-w-5xl mx-auto">
          {/* Data Source */}
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              Datos proporcionados por
            </p>
            <a
              href="https://www.superfinanciera.gov.co"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
            >
              Superintendencia Financiera de Colombia
              <ExternalLink className="w-4 h-4" />
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              Fuente:{' '}
              <a
                href="https://www.datos.gov.co/Econom-a-y-Finanzas/Tasa-de-Cambio-Representativa-del-Mercado-TRM/32sa-8pi3"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Datos Abiertos Colombia
              </a>
            </p>
          </div>

          {/* Divider with Colombian flag colors */}
          <div className="flex items-center justify-center gap-1 mb-6">
            <div className="h-1 w-16 bg-[#FCD116] rounded-full" />
            <div className="h-1 w-16 bg-[#003893] rounded-full" />
            <div className="h-1 w-16 bg-[#CE1126] rounded-full" />
          </div>

          {/* Info */}
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>
              La TRM (Tasa Representativa del Mercado) es el promedio ponderado
              de las operaciones de compra y venta de dólares de los Estados
              Unidos de América.
            </p>
            <p className="flex items-center justify-center gap-1">
              Hecho con <Heart className="w-4 h-4 text-red-500 fill-red-500" />{' '}
              para Colombia
            </p>
            <p className="text-xs">© {currentYear} TRM Colombia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
