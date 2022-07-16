import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ list: [{
    "id": 0,
    "metadata": {
      "Background": "string",
      "Left_Eye": "string",
      "Face": "string",
      "Right_Eye": "string",
      "Mouth": "string",
      "Accessory": "string",
      "score": 0
    }
  }] });

  const [mintButtonDisabled, setMintButtonDisabled] = useState(false);

  function onMintClicked(ev) { // post mint endpoint
    
  }

  /*useEffect(async () => {
    const result = await axios( // get all
     
    );

    setData(result.data);
  });*/

  return (
    <div className="App">
  <table>
    <thead>
      <tr>
        <th>Id</th>
        <th>Background</th>
        <th>Left Eye</th>
        <th>Face</th>
        <th>Right Eye</th>
        <th>Mouth</th>
        <th>Accessory</th>
        <th>Score</th>
      </tr>
    </thead>
    <tbody>
      {data.list.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.metadata.Background}</td>
                <td>{item.metadata.Left_Eye}</td>
                <td>{item.metadata.Face}</td>
                <td>{item.metadata.Right_Eye}</td>
                <td>{item.metadata.Mouth}</td>
                <td>{item.metadata.Accessory}</td>
                <td>{item.metadata.score}</td>
              </tr>
            ))}
    </tbody>
  </table>
  <button onClick={onMintClicked} disabled={mintButtonDisabled}>Mint All</button>
    </div>
  );
}


export default App;
