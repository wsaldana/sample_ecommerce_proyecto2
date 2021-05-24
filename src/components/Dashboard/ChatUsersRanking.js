import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { PureComponent } from 'react';





import {

  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";
const arr=[["Maria",30],["Pedro",40],["Juan",50],["Jose",80]]; // aqui van los gets de la info de los chats
export default function Chart(){
  const data = [
    { name: arr[0][0], chats: arr[0][1] },
    { name: arr[1][0], chats: arr[1][1] },
    { name: arr[2][0], chats: arr[2][1] },
    { name: arr[3][0], chats: arr[3][1] },
  ];

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Personas con mas chats</h1>
      <div  id="userRankingApp"className="App" style={{ textAlign: "center" }}>
      
        <BarChart
          width={500}
          height={300}
          data={data}
          margin="auto"
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="chats" fill="rgb(38, 221, 21)" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
    </div>
  );
 
