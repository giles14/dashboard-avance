import { useQuery } from "@tanstack/react-query";
import { Total } from "@/types/totales";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { ComparisonChart } from "@/components/dashboard/ComparisonChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const fetchTotales = async (fechaInicio: string, fechaFin: string): Promise<Total[]> => {
  const response = await fetch(
    `https://dockserver.lat/checar_avance_promo?fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data.metricas.totales;
};

const Index = () => {
  const { toast } = useToast();
  const [fechaInicio, setFechaInicio] = useState<Date>();
  const [fechaFin, setFechaFin] = useState<Date>();
  const [shouldFetch, setShouldFetch] = useState(false);

  const formattedFechaInicio = fechaInicio ? format(fechaInicio, 'yyyy-MM-dd') : '2024-12-23';
  const formattedFechaFin = fechaFin ? format(fechaFin, 'yyyy-MM-dd') : '2024-12-27';

  const { data: totales, isLoading, error } = useQuery({
    queryKey: ['totales', formattedFechaInicio, formattedFechaFin, shouldFetch],
    queryFn: () => fetchTotales(formattedFechaInicio, formattedFechaFin),
    enabled: shouldFetch,
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

  const handleLoadResults = () => {
    setShouldFetch(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <p className="text-lg">Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Fecha de inicio</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !fechaInicio && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fechaInicio ? format(fechaInicio, "PPP") : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={fechaInicio}
                onSelect={setFechaInicio}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">Fecha fin</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !fechaFin && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fechaFin ? format(fechaFin, "PPP") : <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={fechaFin}
                onSelect={setFechaFin}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button 
          className="mt-auto"
          onClick={handleLoadResults}
        >
          Cargar resultados
        </Button>
      </div>

      {totales && (
        <>
          <SummaryCards totales={totales} />
          <ComparisonChart totales={totales} />
          <DataTable totales={totales} />
        </>
      )}
    </div>
  );
};

export default Index;