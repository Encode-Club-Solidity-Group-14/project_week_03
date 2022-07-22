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
    await axios.get('http://localhost:3001/mint')
  }

  const onLoadData = async (event) => {
    const result = await axios.get('http://localhost:3001/nfts')
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

      {/* <Card className={classes.form}> */}
      <div className='w-[70%] mt-[1rem] py-[3rem] mx-auto text-center rounded-[10px] shadow-[0_2px_8px_rgba(0,0,0,0.26)]'>
          <table className='hover:table-auto border-spacing-4 w-[90%] mx-auto mb-[2rem]'>
            <thead>
              <tr className='border-solid border-2 border-[#eee]'>
                <th className='whitespace-nowrap p-[1rem] bg-[#741188] text-white'>Background</th>
                <th className='whitespace-nowrap p-[1rem] bg-[#741188] text-white'>Left Eye</th>
                <th className='whitespace-nowrap p-[1rem] bg-[#741188] text-white'>Face</th>
                <th className='whitespace-nowrap p-[1rem] bg-[#741188] text-white'>Right Eye</th>
                <th className='whitespace-nowrap p-[1rem] bg-[#741188] text-white'>Mouth</th>
                <th className='whitespace-nowrap p-[1rem] bg-[#741188] text-white'>Accessory</th>
                <th className='whitespace-nowrap p-[1rem] bg-[#741188] text-white'>Score</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id} className='border-solid border-2 border-[#eee] hover:bg-[#741188] hover:text-[#fff]'>
                  <td className='whitespace-nowrap p-[1rem]'>{item.background}</td>
                  <td className='whitespace-nowrap p-[1rem]'>{item.left_eye}</td>
                  <td className='whitespace-nowrap p-[1rem]'>{item.face}</td>
                  <td className='whitespace-nowrap p-[1rem]'>{item.right_eye}</td>
                  <td className='whitespace-nowrap p-[1rem]'>{item.mouth}</td>
                  <td className='whitespace-nowrap p-[1rem]'>{item.accessory}</td>
                  <td className='whitespace-nowrap p-[1rem]'>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>


        <Button type="submit" onClick={onLoadData} className={`${classes.btn} mx-[8px]`}>
          Load Data
        </Button>
        <Button type="submit" onClick={onMintClicked} className={`${classes.btn} mx-[8px]}`}>
          Mint All
        </Button>
      </div>
    </React.Fragment>
  )
}

export default List
