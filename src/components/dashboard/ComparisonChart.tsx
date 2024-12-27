import { Card } from "@/components/ui/card";
import { Total } from "@/types/totales";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ComparisonChartProps {
  totales: Total[];
}

export const ComparisonChart = ({ totales }: ComparisonChartProps) => {
  return (
    <Card className="p-6 shadow-lg mb-8">
      <h2 className="text-xl font-bold mb-4">Comparación de Pagos por Clave</h2>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={totales}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="clave" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="cantidad_MXN_pagada" name="MXN Pagado" fill="#3b82f6" />
            <Bar dataKey="cantidad_USD_pagada" name="USD Pagado" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};