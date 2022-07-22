import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Add.module.css";
import axios from "axios";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import MainHeader from "../MainHeader/MainHeader";
import App from "../image-upload/image";

function Add() {
  const [metadata, setMetadata] = useState({
    background: "",
    left_eye: "",
    face: "",
    right_eye: "",
    mouth: "",
    accessory: "",
    score: "",
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    if (status) {
      navigate("/list");
    }
  }, [status, navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setMetadata({ [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { face, background, left_eye, right_eye, mouth, accessory, score } =
      metadata;
    if (
      (face,
      mouth,
      background,
      left_eye,
      right_eye,
      metadata,
      accessory,
      score,
      imageFiles.length > 0)
    ) {
      const metadataResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_IP}/nfts`,
        metadata
      );
      if (metadataResponse.data) {
        console.log(typeof metadataResponse.data);
        const uploadImage = await axios.post(
          `${process.env.REACT_APP_SERVER_IP}/nfts/${metadataResponse.data}/image`,
          imageFiles
        );
        alert("NFT created! Id: " + uploadImage.id);
      }
    }
  };

  return (
    <React.Fragment>
      <MainHeader />
      <Card className={classes.form}>
        <form onSubmit={submitHandler}>
          <div className={`${classes.control}`}>
            <label htmlFor="background">Background</label>
            <input
              type="text"
              id="background"
              name="background"
              onChange={onChangeHandler}
              value={metadata.background}
            />
          </div>
          <div className={`${classes.control}`}>
            <label htmlFor="lefteye">Left Eye</label>
            <input
              type="text"
              id="left_eye"
              name="left_eye"
              onChange={onChangeHandler}
              value={metadata.left_eye}
            />
          </div>
          <div className={`${classes.control}`}>
            <label htmlFor="face">Face</label>
            <input
              type="text"
              id="face"
              name="face"
              onChange={onChangeHandler}
              value={metadata.face}
            />
          </div>
          <div className={`${classes.control}`}>
            <label htmlFor="rightEye">Right Eye</label>
            <input
              type="text"
              id="right_eye"
              name="rigt_eye"
              onChange={onChangeHandler}
              value={metadata.right_eye}
            />
          </div>
          <div className={`${classes.control}`}>
            <label htmlFor="mouth">Background</label>
            <input
              type="text"
              id="mouth"
              name="mouth"
              onChange={onChangeHandler}
              value={metadata.mouth}
            />
          </div>
          <div className={`${classes.control}`}>
            <label htmlFor="acessory">Acessory</label>
            <input
              type="text"
              id="acessory"
              name="acessory"
              onChange={onChangeHandler}
              value={metadata.accessory}
            />
          </div>
          <div className={`${classes.control}`}>
            <label htmlFor="score">Score</label>
            <input
              type="text"
              id="score"
              name="score"
              onChange={onChangeHandler}
              value={metadata.score}
            />
          </div>
          <div className={classes.actions}>
            <App imageFiles={imageFiles} setImageFiles={setImageFiles} />
            <Button type="submit" className={classes.btn}>
              Create NFT
            </Button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
}

export default Add;
