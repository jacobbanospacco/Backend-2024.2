import React, { useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';

const Maps = () => {
  const mapDiv = useRef(null);

  useEffect(() => {
    const webmap = new WebMap({
      basemap: 'terrain'
    });

    const earthquakeLayer = new GraphicsLayer();
    webmap.add(earthquakeLayer);

    const view = new MapView({
      container: mapDiv.current,
      map: webmap,
      center: [-75.015152, -9.189967],
      zoom: 6
    });

    const fetchEarthquakes = async () => {
      const url = "https://ultimosismo.igp.gob.pe/api/ultimo-sismo/ajaxb/2024"; // API IGP
      const response = await fetch(url);
      const data = await response.json();

      console.log(data); // Verifica los datos recibidos

      if (!Array.isArray(data)) {
        console.error("Los datos no son un arreglo:", data);
        return;
      }

      // Iterar sobre cada sismo en los datos recibidos
      data.forEach(earthquake => {
        const longitud = parseFloat(earthquake.longitud); // Extraer longitud
        const latitud = parseFloat(earthquake.latitud); // Extraer latitud
        const profundidad = earthquake.profundidad; // Extraer profundidad
        const magnitud = earthquake.magnitud; // Extraer magnitud
        const referencia = earthquake.referencia; // Extraer referencia

        // Verifica si las coordenadas son números
        if (!isNaN(longitud) && !isNaN(latitud)) {
          console.log(`Coordenadas válidas: Longitud: ${longitud}, Latitud: ${latitud}`); // Confirmar coordenadas válidas

          const point = {
            type: "point",
            longitude: longitud,
            latitude: latitud
          };

          let markerColor;
          if (profundidad <= 60) {
            markerColor = "red";
          } else if (profundidad > 60 && profundidad <= 300) {
            markerColor = "green";
          } else {
            markerColor = "blue";
          }

          const markerSize = (magnitud || 5) * 1.75; // Fallback a un tamaño por defecto si magnitud no está

          const markerSymbol = {
            type: "simple-marker",
            color: markerColor,
            size: markerSize
          };

          const attributes = {
            referencia: referencia,
            magnitud: magnitud,
            profundidad: profundidad
          };

          const popupTemplate = {
            title: "Terremoto",
            content: `<b>Ubicación:</b> ${referencia}<br><b>Magnitud:</b> ${magnitud}<br><b>Profundidad:</b> ${profundidad} km`
          };

          const graphic = new Graphic({
            geometry: point,
            symbol: markerSymbol,
            attributes: attributes,
            popupTemplate: popupTemplate
          });

          earthquakeLayer.add(graphic);
        } else {
          console.warn("Coordenadas no válidas:", earthquake); // Aviso si faltan coordenadas
        }
      });
    };

    fetchEarthquakes(); // Llamar a la función para obtener los sismos

    return () => {
      if (view) {
        view.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }} ref={mapDiv}></div>
  );
};

export default Maps;
