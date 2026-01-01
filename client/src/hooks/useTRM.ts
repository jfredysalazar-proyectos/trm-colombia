import { useState, useEffect, useCallback } from 'react';

export interface TRMData {
  valor: string;
  unidad: string;
  vigenciadesde: string;
  vigenciahasta: string;
}

export interface TRMState {
  current: TRMData | null;
  historical: TRMData[];
  loading: boolean;
  error: string | null;
}

const API_BASE = 'https://www.datos.gov.co/resource/32sa-8pi3.json';

export function useTRM() {
  const [state, setState] = useState<TRMState>({
    current: null,
    historical: [],
    loading: true,
    error: null,
  });

  const fetchCurrentTRM = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE}?$order=vigenciadesde DESC&$limit=1`
      );
      if (!response.ok) throw new Error('Error al obtener la TRM actual');
      const data: TRMData[] = await response.json();
      return data[0] || null;
    } catch (error) {
      throw error;
    }
  }, []);

  const fetchHistoricalTRM = useCallback(async (limit: number = 30) => {
    try {
      const response = await fetch(
        `${API_BASE}?$order=vigenciadesde DESC&$limit=${limit}`
      );
      if (!response.ok) throw new Error('Error al obtener el histórico');
      const data: TRMData[] = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }, []);

  const fetchTRMByDate = useCallback(async (date: string): Promise<TRMData | null> => {
    try {
      const response = await fetch(
        `${API_BASE}?$where=vigenciadesde <= '${date}' AND vigenciahasta >= '${date}'&$limit=1`
      );
      if (!response.ok) throw new Error('Error al obtener la TRM para la fecha');
      const data: TRMData[] = await response.json();
      return data[0] || null;
    } catch (error) {
      throw error;
    }
  }, []);

  const fetchTRMRange = useCallback(async (startDate: string, endDate: string): Promise<TRMData[]> => {
    try {
      const response = await fetch(
        `${API_BASE}?$where=vigenciadesde >= '${startDate}' AND vigenciadesde <= '${endDate}'&$order=vigenciadesde ASC`
      );
      if (!response.ok) throw new Error('Error al obtener el rango de TRM');
      const data: TRMData[] = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }, []);

  const refresh = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      const [current, historical] = await Promise.all([
        fetchCurrentTRM(),
        fetchHistoricalTRM(60),
      ]);
      setState({
        current,
        historical,
        loading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }));
    }
  }, [fetchCurrentTRM, fetchHistoricalTRM]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return {
    ...state,
    refresh,
    fetchTRMByDate,
    fetchTRMRange,
  };
}

// Utility functions for TRM calculations
export function formatTRM(value: string | number): string {
  const num = typeof value === 'string' ? parseFloat(value) : value;
  return new Intl.NumberFormat('es-CO', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

export function formatCurrency(value: number, currency: 'USD' | 'COP'): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function convertUSDtoCOP(usd: number, trm: number): number {
  return usd * trm;
}

export function convertCOPtoUSD(cop: number, trm: number): number {
  return cop / trm;
}

export function calculateChange(current: number, previous: number): {
  value: number;
  percentage: number;
  direction: 'up' | 'down' | 'neutral';
} {
  const value = current - previous;
  const percentage = previous !== 0 ? (value / previous) * 100 : 0;
  const direction = value > 0 ? 'up' : value < 0 ? 'down' : 'neutral';
  return { value, percentage, direction };
}

export function numberToWords(value: number): string {
  const units = ['', 'Un', 'Dos', 'Tres', 'Cuatro', 'Cinco', 'Seis', 'Siete', 'Ocho', 'Nueve'];
  const teens = ['Diez', 'Once', 'Doce', 'Trece', 'Catorce', 'Quince', 'Dieciséis', 'Diecisiete', 'Dieciocho', 'Diecinueve'];
  const tens = ['', '', 'Veinte', 'Treinta', 'Cuarenta', 'Cincuenta', 'Sesenta', 'Setenta', 'Ochenta', 'Noventa'];
  const hundreds = ['', 'Ciento', 'Doscientos', 'Trescientos', 'Cuatrocientos', 'Quinientos', 'Seiscientos', 'Setecientos', 'Ochocientos', 'Novecientos'];

  if (value === 0) return 'Cero';
  if (value === 100) return 'Cien';

  const intPart = Math.floor(value);
  const decPart = Math.round((value - intPart) * 100);

  let result = '';

  // Miles
  const thousands = Math.floor(intPart / 1000);
  const remainder = intPart % 1000;

  if (thousands > 0) {
    if (thousands === 1) {
      result += 'Mil ';
    } else {
      result += convertHundreds(thousands, units, teens, tens, hundreds) + ' Mil ';
    }
  }

  if (remainder > 0) {
    result += convertHundreds(remainder, units, teens, tens, hundreds);
  }

  result = result.trim() + ' Pesos';

  if (decPart > 0) {
    result += ' Con ' + convertHundreds(decPart, units, teens, tens, hundreds) + ' Centavos';
  }

  return result;
}

function convertHundreds(num: number, units: string[], teens: string[], tens: string[], hundreds: string[]): string {
  let result = '';
  
  if (num >= 100) {
    if (num === 100) return 'Cien';
    result += hundreds[Math.floor(num / 100)] + ' ';
    num %= 100;
  }
  
  if (num >= 20) {
    const ten = Math.floor(num / 10);
    const unit = num % 10;
    if (unit === 0) {
      result += tens[ten];
    } else if (ten === 2) {
      result += 'Veinti' + units[unit].toLowerCase();
    } else {
      result += tens[ten] + ' y ' + units[unit];
    }
  } else if (num >= 10) {
    result += teens[num - 10];
  } else if (num > 0) {
    result += units[num];
  }
  
  return result.trim();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-CO', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatShortDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
}
