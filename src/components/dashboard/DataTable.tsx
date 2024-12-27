import { Card } from "@/components/ui/card";
import { Total } from "@/types/totales";

interface DataTableProps {
  totales: Total[];
}

export const DataTable = ({ totales }: DataTableProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <Card className="shadow-lg">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Clave</th>
              <th className="px-6 py-3">MXN Pagado</th>
              <th className="px-6 py-3">USD Pagado</th>
            </tr>
          </thead>
          <tbody>
            {totales.map((total) => (
              <tr key={total.clave} className="bg-white border-b hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">
                  {total.clave}
                </td>
                <td className="px-6 py-4">
                  ${formatCurrency(total.cantidad_MXN_pagada)}
                </td>
                <td className="px-6 py-4">
                  ${formatCurrency(total.cantidad_USD_pagada)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};