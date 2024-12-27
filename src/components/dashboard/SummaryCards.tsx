import { Card } from "@/components/ui/card";
import { Total } from "@/types/totales";

interface SummaryCardsProps {
  totales: Total[];
}

export const SummaryCards = ({ totales }: SummaryCardsProps) => {
  const totalMXN = totales.reduce((acc, curr) => acc + curr.cantidad_MXN_pagada, 0);
  const totalUSD = totales.reduce((acc, curr) => acc + curr.cantidad_USD_pagada, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <Card className="p-6 shadow-lg">
        <h3 className="text-sm font-medium text-gray-500">Total MXN Pagado</h3>
        <p className="text-3xl font-bold text-gray-900">
          ${formatCurrency(totalMXN)}
        </p>
      </Card>
      <Card className="p-6 shadow-lg">
        <h3 className="text-sm font-medium text-gray-500">Total USD Pagado</h3>
        <p className="text-3xl font-bold text-gray-900">
          ${formatCurrency(totalUSD)}
        </p>
      </Card>
    </div>
  );
};