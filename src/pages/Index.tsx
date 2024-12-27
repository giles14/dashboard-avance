import { useQuery } from "@tanstack/react-query";
import { Total } from "@/types/totales";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { ComparisonChart } from "@/components/dashboard/ComparisonChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";

const fetchTotales = async (): Promise<Total[]> => {
  const response = await fetch('https://dockserver.lat/checar_avance_promo?fecha_inicio=2024-12-23');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.metricas.totales;
};

const Index = () => {
  const { toast } = useToast();
  const { data: totales, isLoading, error } = useQuery({
    queryKey: ['totales'],
    queryFn: fetchTotales,
  });

  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudieron cargar los datos. Por favor, intente más tarde.",
      });
    }
  }, [error, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <p className="text-lg">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <p className="text-lg text-red-500">Error al cargar los datos</p>
      </div>
    );
  }

  if (!totales) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <SummaryCards totales={totales} />
      <ComparisonChart totales={totales} />
      <DataTable totales={totales} />
    </div>
  );
};

export default Index;