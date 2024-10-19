import { NewArticle } from "./NewArticle";
import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

export const NewContainer = () => {
  const [chartData, setChartData] = useState(null);
  const [annualChartData, setAnnualChartData] = useState(null);

  useEffect(() => {
    const fetchDailyEarthquakes = async () => {
      const now = new Date();
      const starttime = `${now.getFullYear()}-${now.getMonth() + 1}-01`;
      const endtime = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
      const url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${starttime}&endtime=${endtime}&minmagnitude=4.5`;
      const response = await fetch(url);
      const data = await response.json();

      // sismos por día
      const sismosPorDia = Array(now.getDate()).fill(0);
      data.features.forEach(earthquake => {
        const date = new Date(earthquake.properties.time);
        const day = date.getDate() - 1;
        sismosPorDia[day] += 1;
      });

      const labels = Array.from({ length: now.getDate() }, (_, i) => i + 1);
      const datasets = [
        {
          label: 'Número de sismos por día',
          data: sismosPorDia,
          borderColor: 'blue',
          backgroundColor: 'transparent', // Fondo transparente para la gráfica
          pointBackgroundColor: 'blue',
          pointBorderColor: 'blue',
          pointRadius: 5,  // Tamaño de los puntos
          pointHoverRadius: 7, // Tamaño al pasar el mouse sobre los puntos
          fill: false, // Sin relleno debajo de la línea
          tension: 0.1, // Líneas rectas, sin suavizar
          borderWidth: 2, // Grosor de la línea
        },
      ];

      setChartData({ labels, datasets });
    };

    // Datos anuales
    const fetchAnnualData = () => {
      const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
      const sismosPorMes = [59, 77, 69, 68, 73, 87, 61, 55, 0, 0, 0, 0];

      const annualDatasets = [
        {
          label: 'Número de sismos por mes',
          data: sismosPorMes,
          backgroundColor: 'blue',
          borderColor: 'blue',
          borderWidth: 1
        }
      ];

      setAnnualChartData({
        labels: meses,
        datasets: annualDatasets
      });
    };

    fetchDailyEarthquakes();
    fetchAnnualData();
  }, []);

  return (
    <aside className="text-OffWhite py-[28px] px-[20px]">
      <h1 className="text-SoftOrange text-4xl font-bold">SISMICIDAD</h1>
      <NewArticle
        title='SISMICIDAD DIARIA'
      />
      <NewArticle
        title='SISMICIDAD MENSUAL'
      />
      {chartData && (
        <div className="bg-white my-4">
          <Line 
            data={chartData} 
            height={75}
            options={{
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  enabled: true
                }
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: 'Días'
                  }
                },
                y: {
                  title: {
                    display: true,
                    text: 'Número de sismos'
                  },
                  beginAtZero: true,
                  max: 30 
                }
              }
            }}
          />
        </div>
      )}
      <NewArticle
        title='SISMICIDAD ANUAL'
        text='De enero a la fecha, se reportaron 452 eventos sísmicos. En la figura 2, se visualiza gráfica- mente, el número de sismos reportados mensualmente.'
      />
      {annualChartData && (
        <div className="bg-white my-4">
          <Bar 
            data={annualChartData} 
            height={75}
            options={{
              plugins: {
                legend: {
                  display: false
                },
                tooltip: {
                  enabled: true
                }
              },
              scales: {
                y: {
                  beginAtZero: true,
                  max: 100
                }
              }
            }}
          />
        </div>
      )}
    </aside>
  )
}
