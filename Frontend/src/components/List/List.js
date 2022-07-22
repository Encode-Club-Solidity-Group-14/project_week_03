import React, { useState, useEffect } from 'react'
import classes from './List.module.css'
import axios from 'axios'
import MainHeader from '../MainHeader/MainHeader'
import Card from '../UI/Card/Card'
import Button from '../UI/Button/Button'

function List() {
  const [data, setData] = useState([])

  const [mintButtonDisabled, setMintButtonDisabled] = useState(false)

  const onMintClicked = async (event) => {
    await axios.get(`${process.env.REACT_APP_SERVER_IP}/mint`)
  }

  const onLoadData = async (event) => {
const result = await axios.get(`${process.env.REACT_APP_SERVER_IP}/nfts`)
    const data = result.data
    let listNFT = [];
    for (var k in data) {
      console.log(k, data[k])
      const nft = data[k]
      console.log('nft')
      console.log(nft.metadata)
      listNFT.push(nft.metadata);
    }
    console.log(listNFT);
    setData(listNFT)
    listNFT.map((item)=>{
      console.log(item)
    })
  }

  return (
    <React.Fragment>
      <MainHeader />

      <Card className={classes.form}>
        <div className="App">
          <table>
            <thead>
              <tr>
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
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.background}</td>
                  <td>{item.left_eye}</td>
                  <td>{item.face}</td>
                  <td>{item.right_eye}</td>
                  <td>{item.mouth}</td>
                  <td>{item.accessory}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
          

        <Button type="submit" onClick={onLoadData} className={classes.btn}>
          Load Data
        </Button>
          <Button type="submit" onClick={onMintClicked} className={classes.btn}>
            Mint All
          </Button>
        </div>
      </Card>
    </React.Fragment>
  )
}

export default List
