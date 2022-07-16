import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({ list: [{
    "id": 0,
    "metadata": {
      "background": "string",
      "left_eye": "string",
      "face": "string",
      "right_eye": "string",
      "mouth": "string",
      "accessory": "string",
      "score": 0
    }
  }] });

  const [mintButtonDisabled, setMintButtonDisabled] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [fileAuthor, setFileAuthor] = useState();
  const [fileDescription, setFileDescription] = useState();
  const uploadButtonDisabled = useMemo(() => (isNullOrUndefined(selectedFile)) || isNullOrUndefined(fileAuthor) || isNullOrUndefined(fileDescription));

function isNullOrUndefined(obj){
  return obj === null || obj == undefined || obj === "";
}

  function onMintClicked(ev) { // post mint endpoint
    
  }

  /*useEffect(async () => {
    const result = await axios( // get all
     
    );

    setData(result.data);
  });*/

  function onFileUpload() {
    const formData = new FormData();

    /*

    To append to form data

    file - selectedFile
    name = selectedFile.name
    description - fileDescription
    author - fileAuthor
    timestamp - Date.Now()
    type - selectedFile.type
    */

    formData.append(
      "file",
      selectedFile,
      selectedFile.name
    );
    //axios.post("upload", formData);
  };

  function onFileChange(event) {
    setSelectedFile( event.target.files[0] );
  };

  function onFileAuthorChange(event) {
    setFileAuthor( event.target.value );
  };

  function onFileDescriptionChange(event) {
    setFileDescription( event.target.value );
  };

  function fileData () {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2> 
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose file</h4>
        </div>
      );
    }
  };

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
                    <td>{item.metadata.background}</td>
                    <td>{item.metadata.left_eye}</td>
                    <td>{item.metadata.face}</td>
                    <td>{item.metadata.right_eye}</td>
                    <td>{item.metadata.mouth}</td>
                    <td>{item.metadata.accessory}</td>
                    <td>{item.metadata.score}</td>
                  </tr>
                ))}
        </tbody>
      </table>
    <button onClick={onMintClicked} disabled={mintButtonDisabled}>Mint All</button>
    
    <br/>
    <br/>

    <div>
      <div>
        <input type="file" onChange={onFileChange} />
        <br/>
        <label for="author">Author:</label><input id="author" type="text" onChange={onFileAuthorChange} />
        <br/>
        <label for="description">Description:</label><input id="description" type="text" onChange={onFileDescriptionChange} />
        <br/>
        <button onClick={onFileUpload} disabled={uploadButtonDisabled}>Upload</button>
      </div>
      {fileData()}
    </div>
  </div>
  );
}

export default App;
