import React, { useState, useEffect } from 'react'
import classes from "./Add.module.css";
import axios from 'axios'
import Card from '../UI/Card/Card';
import Button from '../UI/Button/Button';
import MainHeader from '../MainHeader/MainHeader';

function Add() {

    const [typedBackground, setTypedBackground] = useState("backout");
    const [typedLeftEye, setTypedLeftEye] = useState("left_eye");
    const [typedface, setTypedfaced] = useState("face");
    const [typedRightEye, setTypedRightEye] = useState("right_eye");
    const [typedMouth, setTypedMouth] = useState("mouth");
    const [typedAccessory, setTypedAccessory] = useState("accessory");
    const [typedScore, setScore] = useState("score");

  const backgroundChangeHandler = (event) => {
    setTypedBackground(event.target.value);
  }

  const leftEyeChangeHandler = (event) => {
    setTypedLeftEye(event.target.value);
  }

  const faceChangeHandler = (event) => {
    setTypedfaced(event.target.value);
  }


  const rightEyeChangeHandler = (event) => {
    setTypedRightEye(event.target.value);
  }


  const mouthChangeHandler = (event) => {
    setTypedMouth(event.target.value);
  }


  const accessoryChangeHandler = (event) => {
    setTypedAccessory(event.target.value);
  }


  const scoreChangeHandler = (event) => {
    setScore(event.target.value);
  }



  const submitHandler = async (event) => {
    event.preventDefault();
    const metadata = {
        "metadata": {
            "background": typedBackground,
            "left_eye": typedLeftEye, 
            "face": typedface,
            "right_eye": typedRightEye,
            "mouth": typedMouth,
            "accessory": typedAccessory,
            "score": typedScore
        }
    }

    const id = await axios.post("http://localhost:3001/nfts", metadata);

    alert("NFT created! Id: " + id.data);


    const uploadImage = await axios.post("http://localhost:3001/nfts/"+id.data+"image", metadata);
  }

  return (
    <React.Fragment>
    <MainHeader />
    <Card className={classes.form}>
    <form onSubmit={submitHandler}>
      <div
        className={`${classes.control}`}
      >
        <label htmlFor="background">Background</label>
        <input
          type="background"
          id="background"
          onChange={backgroundChangeHandler}
          value={typedBackground}
        />
      </div>
      <div
        className={`${classes.control}`}
      >
        <label htmlFor="lefteye">Left Eye</label>
        <input
          type="lefteye"
          id="lefteye"
          onChange={leftEyeChangeHandler}
          value={typedLeftEye}
        />
      </div>
      <div
        className={`${classes.control}`}
      >
        <label htmlFor="face">Face</label>
        <input
          type="face"
          id="face"
          onChange={faceChangeHandler}
          value={typedface}
        />
      </div>
      <div
        className={`${classes.control}`}
      >
        <label htmlFor="rightEye">Right Eye</label>
        <input
          type="rightEye"
          id="rightEye"
          onChange={rightEyeChangeHandler}
          value={typedRightEye}
        />
      </div>
      <div
        className={`${classes.control}`}
      >
        <label htmlFor="mouth">Background</label>
        <input
          type="mouth"
          id="mouth"
          onChange={mouthChangeHandler}
          value={typedMouth}
        />
      </div>
      <div
        className={`${classes.control}`}
      >
        <label htmlFor="acessory">Acessory</label>
        <input
          type="acessory"
          id="acessory"
          onChange={accessoryChangeHandler}
          value={typedAccessory}
        />
      </div>
      <div
        className={`${classes.control}`}
      >
        <label htmlFor="score">Score</label>
        <input
          type="score"
          id="score"
          onChange={scoreChangeHandler}
          value={typedScore}
        />
      </div>
            <div className={classes.actions}>
        <Button type="submit" className={classes.btn}>
          Create NFT 
        </Button>
      </div>
    </form>
  </Card>
  </React.Fragment>
  )
}

export default Add
