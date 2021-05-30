import React from 'react';
import {Bar} from 'react-chartjs-2';

const state = {
  labels: ['PS5', 'Sputnik V', 'Rum',
           'Wine', 'Cafe'],
  datasets: [
    {
      label: 'Ventas',
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    }
  ]
}

export default class VentasChart extends React.Component {
  render() {
    return (
      <div>
        <Bar
          data={state}
          options={{
            title:{
              display:true,
              text:'Venta de productos',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
    );
  }
}