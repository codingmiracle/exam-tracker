import React, { useEffect, useRef } from 'react';
import VChart from '@visactor/vchart';

const DashboardView = () => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = new VChart({
        type: 'bar',
        data: [
          {
            id: 'barData',
            values: [
              { day: 'Monday', value: 22 },
              { day: 'Tuesday', value: 13 },
              { day: 'Wednesday', value: 25 },
              { day: 'Thursday', value: 29 },
              { day: 'Friday', value: 38 }
            ]
          }
        ],
        xField: 'day',
        yField: 'value',
        width: 400,
        height: 300
      }, {
        autoFit: false
      })
      // chart.render(chartRef.current);
      return () => chart.release();
    }
  }, []);

  return (
    <view className={"Content"}>
      <text style={{ fontSize: '24px', marginBottom: '10px', color: '#333' }}>Willkommen zum Prüfungs-Tracker!</text>
      <text style={{ fontSize: '16px', color: '#666' }}>
        Hier kannst du deine Prüfungen verwalten, Noten eintragen und deinen Fortschritt verfolgen.
      </text>
      {/* Weitere Dashboard-Komponenten und Funktionen hier */}
    </view>
  );
}

export default DashboardView;
