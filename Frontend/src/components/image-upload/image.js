const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

function ImageUpload({setImageFiles}) {
  const changeHandler = (e) => {
    const { files } = e.target;
    if (files[0].type.match(imageTypeRegex)) {
      setImageFiles(files[0]);
      return;
    }
    alert("Selected images are not of valid type!");
  };
  return (
    <div>
      <label htmlFor="file">Upload images</label>
      <input
        type="file"
        id="file"
        onChange={changeHandler}
        accept="image/png, image/jpg, image/jpeg, image/*"
      />
    </div>
  );
}

export default ImageUpload;
