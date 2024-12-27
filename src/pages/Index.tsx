import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Total {
  clave: string;
  cantidad_MXN_pagada: number;
  cantidad_USD_pagada: number;
}

const totales: Total[] = [
  {
    "cantidad_MXN_pagada": 12191.94,
    "cantidad_USD_pagada": 44.18,
    "clave": "C1"
  },
  {
    "cantidad_MXN_pagada": 11320.35,
    "cantidad_USD_pagada": 0,
    "clave": "C2"
  },
  {
    "cantidad_MXN_pagada": 10453.82,
    "cantidad_USD_pagada": 14191.1,
    "clave": "C3"
  },
  {
    "cantidad_MXN_pagada": 36317.31,
    "cantidad_USD_pagada": 6545.59,
    "clave": "C4"
  },
  {
    "cantidad_MXN_pagada": 18478.71,
    "cantidad_USD_pagada": 0,
    "clave": "C5"
  },
  {
    "cantidad_MXN_pagada": 0,
    "cantidad_USD_pagada": 0,
    "clave": "C6"
  },
  {
    "cantidad_MXN_pagada": 15653.55,
    "cantidad_USD_pagada": 0,
    "clave": "C7"
  },
  {
    "cantidad_MXN_pagada": 10510.56,
    "cantidad_USD_pagada": 1097.07,
    "clave": "C8"
  },
  {
    "cantidad_MXN_pagada": 2773.68,
    "cantidad_USD_pagada": 0,
    "clave": "C9"
  },
  {
    "cantidad_MXN_pagada": 1934.8,
    "cantidad_USD_pagada": 3226.43,
    "clave": "C10"
  },
  {
    "cantidad_MXN_pagada": 9162.11,
    "cantidad_USD_pagada": 137.14,
    "clave": "C11"
  },
  {
    "cantidad_MXN_pagada": 25407.43,
    "cantidad_USD_pagada": 0,
    "clave": "C12"
  },
  {
    "cantidad_MXN_pagada": 4928.36,
    "cantidad_USD_pagada": 2923.58,
    "clave": "C13"
  },
  {
    "cantidad_MXN_pagada": 0,
    "cantidad_USD_pagada": 4177.58,
    "clave": "C14"
  },
  {
    "cantidad_MXN_pagada": 8492.71,
    "cantidad_USD_pagada": 3848.18,
    "clave": "C15"
  },
  {
    "cantidad_MXN_pagada": 24519.86,
    "cantidad_USD_pagada": 1400.68,
    "clave": "C16"
  },
  {
    "cantidad_MXN_pagada": 4938.12,
    "cantidad_USD_pagada": 1577.61,
    "clave": "C17"
  },
  {
    "cantidad_MXN_pagada": 43637.44,
    "cantidad_USD_pagada": 4791.14,
    "clave": "C18"
  },
  {
    "cantidad_MXN_pagada": 10798.66,
    "cantidad_USD_pagada": 0,
    "clave": "C19"
  },
  {
    "cantidad_MXN_pagada": 10541.59,
    "cantidad_USD_pagada": 142.94,
    "clave": "C20"
  },
  {
    "cantidad_MXN_pagada": 6980.01,
    "cantidad_USD_pagada": 0,
    "clave": "C21"
  },
  {
    "cantidad_MXN_pagada": 20092.99,
    "cantidad_USD_pagada": 3575.81,
    "clave": "C22"
  },
  {
    "cantidad_MXN_pagada": 39107.91,
    "cantidad_USD_pagada": 17995.44,
    "clave": "C23"
  },
  {
    "cantidad_MXN_pagada": 53909.35,
    "cantidad_USD_pagada": 0,
    "clave": "C24"
  },
  {
    "cantidad_MXN_pagada": 0,
    "cantidad_USD_pagada": 0,
    "clave": "C25"
  }
];

const Index = () => {
  // Calculate totals
  const totalMXN = totales.reduce((acc, curr) => acc + curr.cantidad_MXN_pagada, 0);
  const totalUSD = totales.reduce((acc, curr) => acc + curr.cantidad_USD_pagada, 0);

  // Format numbers
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Summary Cards */}
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

      {/* Chart */}
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

      {/* Data Table */}
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
    </div>
  );
};

export default Index;
