"use client";

import { useState, useEffect } from "react";
import {
  Activity,
  Wind,
  Volume2,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  Coffee,
} from "lucide-react";

export default function DashboardSaludOcupacional() {
  const [datosSensores, setDatosSensores] = useState({
    co2: 450,
    ruido: 45,
    temperatura: 23,
  });

  const [estadoFatiga, setEstadoFatiga] = useState({
    visual: "bajo",
    postural: "bajo",
    cognitiva: "bajo",
  });

  const [sesionActual, setSesionActual] = useState({
    activa: true,
    minutosTranscurridos: 0,
    pausasTomadas: 0,
  });

  useEffect(() => {
    const intervalo = setInterval(() => {
      setDatosSensores((prev) => ({
        co2: Math.max(
          400,
          Math.min(1500, prev.co2 + (Math.random() - 0.5) * 50)
        ),
        ruido: Math.max(
          30,
          Math.min(80, prev.ruido + (Math.random() - 0.5) * 10)
        ),
        temperatura: Math.max(
          20,
          Math.min(28, prev.temperatura + (Math.random() - 0.5) * 1)
        ),
      }));

      setSesionActual((prev) => ({
        ...prev,
        minutosTranscurridos: prev.minutosTranscurridos + 1,
      }));
    }, 5000);

    return () => clearInterval(intervalo);
  }, []);

  const getStatusColor = (type: string, value: number | string) => {
    if (type === "co2") {
      const v = value as number;
      if (v < 800) return "text-emerald-500";
      if (v < 1000) return "text-amber-500";
      return "text-red-500";
    }
    if (type === "ruido") {
      const v = value as number;
      if (v < 50) return "text-emerald-500";
      if (v < 65) return "text-amber-500";
      return "text-red-500";
    }
    if (type === "fatiga") {
      const v = value as string;
      if (v === "bajo") return "text-emerald-500";
      if (v === "moderado") return "text-amber-500";
      return "text-red-500";
    }
    return "text-neutral-400";
  };

  const hasAlerts =
    datosSensores.co2 > 1200 ||
    datosSensores.ruido > 70 ||
    sesionActual.minutosTranscurridos > 60;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight">
                Salud Ocupacional
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Sistema de monitoreo en tiempo real
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-muted-foreground font-mono">
                Actualización cada 5s
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Session Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Estado
              </span>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-semibold text-foreground tabular-nums">
              {sesionActual.activa ? "Activa" : "Finalizada"}
            </p>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Tiempo
              </span>
              <Clock className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-semibold text-foreground tabular-nums">
              {sesionActual.minutosTranscurridos} min
            </p>
          </div>

          <div className="border border-border rounded-lg p-6 bg-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">
                Pausas
              </span>
              <Coffee className="w-4 h-4 text-muted-foreground" />
            </div>
            <p className="text-3xl font-semibold text-foreground tabular-nums">
              {sesionActual.pausasTomadas}
            </p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sensores Ambientales */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-4">
              Sensores Ambientales
            </h2>

            <div className="space-y-4">
              {/* CO2 */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Wind className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">CO₂</p>
                      <p className="text-xs text-muted-foreground">
                        Dióxido de carbono
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-2xl font-semibold tabular-nums ${getStatusColor(
                        "co2",
                        datosSensores.co2
                      )}`}>
                      {Math.round(datosSensores.co2)}
                    </p>
                    <p className="text-xs text-muted-foreground">ppm</p>
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      datosSensores.co2 < 800
                        ? "bg-emerald-500"
                        : datosSensores.co2 < 1000
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min(
                        (datosSensores.co2 / 2000) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Óptimo &lt;800</span>
                  <span>Crítico &gt;1200</span>
                </div>
              </div>

              {/* Ruido */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Ruido
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Nivel sonoro
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-2xl font-semibold tabular-nums ${getStatusColor(
                        "ruido",
                        datosSensores.ruido
                      )}`}>
                      {Math.round(datosSensores.ruido)}
                    </p>
                    <p className="text-xs text-muted-foreground">dB</p>
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      datosSensores.ruido < 50
                        ? "bg-emerald-500"
                        : datosSensores.ruido < 65
                        ? "bg-amber-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${(datosSensores.ruido / 100) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>Tranquilo &lt;50</span>
                  <span>Ruidoso &gt;65</span>
                </div>
              </div>

              {/* Temperatura */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Activity className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Temperatura
                      </p>
                      <p className="text-xs text-muted-foreground">Ambiente</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-semibold text-foreground tabular-nums">
                      {datosSensores.temperatura.toFixed(1)}
                    </p>
                    <p className="text-xs text-muted-foreground">°C</p>
                  </div>
                </div>
                <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                  <div
                    className="bg-foreground h-full transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        Math.max(
                          ((datosSensores.temperatura - 15) / 15) * 100,
                          0
                        ),
                        100
                      )}%`,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>15°C</span>
                  <span>30°C</span>
                </div>
              </div>
            </div>
          </section>

          {/* Detección de Fatiga */}
          <section>
            <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-4">
              Detección de Fatiga
            </h2>

            <div className="space-y-4">
              {/* Fatiga Visual */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Eye className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Fatiga Visual
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Análisis de parpadeo
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold uppercase tracking-wider ${getStatusColor(
                      "fatiga",
                      estadoFatiga.visual
                    )}`}>
                    {estadoFatiga.visual}
                  </span>
                </div>
              </div>

              {/* Fatiga Postural */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Activity className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Fatiga Postural
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Análisis de posición
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold uppercase tracking-wider ${getStatusColor(
                      "fatiga",
                      estadoFatiga.postural
                    )}`}>
                    {estadoFatiga.postural}
                  </span>
                </div>
              </div>

              {/* Fatiga Cognitiva */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                      <Clock className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Fatiga Cognitiva
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Tiempo continuo
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-sm font-semibold uppercase tracking-wider ${getStatusColor(
                      "fatiga",
                      estadoFatiga.cognitiva
                    )}`}>
                    {estadoFatiga.cognitiva}
                  </span>
                </div>
              </div>

              {/* Recomendación */}
              <div className="border border-border rounded-lg p-6 bg-card">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                    {sesionActual.minutosTranscurridos > 50 ? (
                      <AlertCircle className="w-5 h-5 text-amber-500" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">
                      Recomendación
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {sesionActual.minutosTranscurridos > 50
                        ? "Es momento de tomar una pausa de 5 minutos para descansar la vista y estirar el cuerpo"
                        : "Todo va bien. Mantén tu postura correcta y recuerda parpadear con frecuencia"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Alertas */}
        <section className="mb-8">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-4">
            Alertas del Sistema
          </h2>

          {hasAlerts ? (
            <div className="space-y-3">
              {datosSensores.co2 > 1200 && (
                <div className="border border-red-500/20 bg-red-500/5 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-500 mb-1">
                        CO₂ Crítico
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Nivel de CO₂ en {Math.round(datosSensores.co2)} ppm.
                        Ventilador activado automáticamente.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {datosSensores.ruido > 70 && (
                <div className="border border-amber-500/20 bg-amber-500/5 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-500 mb-1">
                        Ruido Elevado
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Nivel de ruido en {Math.round(datosSensores.ruido)} dB.
                        Considera usar audífonos con cancelación de ruido.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {sesionActual.minutosTranscurridos > 60 && (
                <div className="border border-amber-500/20 bg-amber-500/5 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <Coffee className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-500 mb-1">
                        Pausa Recomendada
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Has trabajado {sesionActual.minutosTranscurridos}{" "}
                        minutos sin pausa. Toma un descanso de 5-10 minutos.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <p className="text-sm text-muted-foreground">
                  No hay alertas activas. Condiciones de trabajo óptimas.
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Actuadores */}
        <section>
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground font-medium mb-4">
            Estado de Actuadores
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Ventilador */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
                    datosSensores.co2 > 1200 ? "bg-blue-500/10" : "bg-muted"
                  }`}>
                  <Wind
                    className={`w-6 h-6 ${
                      datosSensores.co2 > 1200
                        ? "text-blue-500"
                        : "text-muted-foreground"
                    }`}
                  />
                </div>
                <p className="text-sm font-medium text-foreground mb-1">
                  Ventilador
                </p>
                <p
                  className={`text-xs font-mono ${
                    datosSensores.co2 > 1200
                      ? "text-blue-500"
                      : "text-muted-foreground"
                  }`}>
                  {datosSensores.co2 > 1200 ? "ENCENDIDO" : "APAGADO"}
                </p>
              </div>
            </div>

            {/* LED Verde */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full mb-3 ${
                    datosSensores.co2 < 800 && datosSensores.ruido < 50
                      ? "bg-emerald-500 shadow-lg shadow-emerald-500/50"
                      : "bg-muted"
                  }`}
                />
                <p className="text-sm font-medium text-foreground mb-1">
                  LED Verde
                </p>
                <p className="text-xs text-muted-foreground">Estado OK</p>
              </div>
            </div>

            {/* LED Amarillo */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full mb-3 ${
                    (datosSensores.co2 >= 800 && datosSensores.co2 < 1200) ||
                    (datosSensores.ruido >= 50 && datosSensores.ruido < 70)
                      ? "bg-amber-500 shadow-lg shadow-amber-500/50"
                      : "bg-muted"
                  }`}
                />
                <p className="text-sm font-medium text-foreground mb-1">
                  LED Amarillo
                </p>
                <p className="text-xs text-muted-foreground">Precaución</p>
              </div>
            </div>

            {/* LED Rojo */}
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="flex flex-col items-center text-center">
                <div
                  className={`w-12 h-12 rounded-full mb-3 ${
                    datosSensores.co2 >= 1200 || datosSensores.ruido >= 70
                      ? "bg-red-500 shadow-lg shadow-red-500/50 animate-pulse"
                      : "bg-muted"
                  }`}
                />
                <p className="text-sm font-medium text-foreground mb-1">
                  LED Rojo
                </p>
                <p className="text-xs text-muted-foreground">Alerta</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <p className="text-xs text-muted-foreground text-center">
            Sistema de Agente Inteligente · Universidad Autónoma de Sinaloa
          </p>
        </div>
      </footer>
    </div>
  );
}
