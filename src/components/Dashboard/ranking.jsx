import React, { useEffect, useState } from "react";
import logo from './logo.svg';
import './App.css';
import {db, firebase, auth} from './config/firebase.config';
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Bar,
} from "recharts";



let usuarios = []
let chats= []



function toPDF(){
 
    const input = document.getElementById('chartrankning');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG',300, 800,50,50);
        // pdf.output('dataurlnewwindow');
        pdf.save("charts.pdf");
      })
    ;
}


function ranking() {

 

  
 
 const dd= []
const [w, setw] = useState(0)
 db.collection('panelchat').get()
            .then(snapshot => {
                //console.log(snapshot)
               
                snapshot.forEach(doc => {
                   const data = doc.data()
                    data.id = doc.id
                    usuarios.push(data.id)
                    chats.push(data.closed)
                    const k= JSON.stringify(doc.data())
                    const q= JSON.parse(k)
                   // console.log(q)
                    setw(q["closed"])
                    //console.log(w)
                    dd.push(w)
                    
                })
               // this.setState({ users: usuarios })
                //console.log(usuarios[0])
                
            })
//console.log(w)

//console.log(dd)
//console.log(chats[0]);

const datas = [
  { name: usuarios[0], chats: chats[0] },
  { name: usuarios[1], chats: chats[1] }
];

 
 
 
 return (
   
    <div style={{ textAlign: "center" }} id="chartadminr">
      <h1>ranking de mejores administradores</h1>
      <div className="App" id="chartrankning">
      {()=>toPDF()}
        <BarChart
          width={500}
          height={300}
          data={datas}
          margin={{
            top: 5,
            right: 30,
            left: 80,
            bottom: 5,
          }}
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
          <Bar dataKey="chats" fill="#8884d8" background={{ fill: "#eee" }} />
        </BarChart>
      </div>
      <button onClick= {toPDF}> Descarga pdf pdf</button>
    </div>
  );
};

export default ranking;
