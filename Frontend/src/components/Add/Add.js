import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Add.module.css";
import axios from "axios";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import MainHeader from "../MainHeader/MainHeader";
import ImageUpload from "../image-upload/image";
import { toast } from "react-toastify";

function Add() {
  const [metadata, setMetadata] = useState({
    background: "",
    left_eye: "",
    face: "",
    right_eye: "",
    mouth: "",
    accessory: "",
    score: 0,
  });
  const [imageFiles, setImageFiles] = useState(null);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      toast.success("NFT created successfully");
      navigate("/list");
    }
  }, [status, navigate]);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setMetadata({ ...metadata, [name]: value });
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
      accessory,
      score,
      imageFiles)
    ) {
      const metadataResponse = await axios.post(
        `${process.env.REACT_APP_SERVER_IP}/nfts`,
        { metadata },
        { headers: { "Content-Type": "application/json " } }
      );
      if (metadataResponse.data) {
        const formData = new FormData();
        formData.append("file", imageFiles);

        await axios.post(
          `${process.env.REACT_APP_SERVER_IP}/nfts/${metadataResponse.data}/image`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setStatus(true);
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
            <label htmlFor="left_eye">Left Eye</label>
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
            <label htmlFor="right_eye">Right Eye</label>
            <input
              type="text"
              id="right_eye"
              name="right_eye"
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
            <label htmlFor="accessory">Acessory</label>
            <input
              type="text"
              id="accessory"
              name="accessory"
              onChange={onChangeHandler}
              value={metadata.accessory}
            />
          </div>
          <div className={`${classes.control}`}>
            <label htmlFor="score">Score</label>
            <input
              type="number"
              id="score"
              name="score"
              onChange={onChangeHandler}
              value={metadata.score}
            />
          </div>
          <div className={classes.actions}>
            <ImageUpload
              imageFiles={imageFiles}
              setImageFiles={setImageFiles}
              images={images}
              setImages={setImages}
            />
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
