import { useEffect, useState } from "react";

const imageTypeRegex = /image\/(png|jpg|jpeg)/gm;

function App({ imageFiles, setImageFiles}) {
 
  const [images, setImages] = useState([]);

  const changeHandler = (e) => {
    const { files } = e.target;
    const validImageFiles = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.match(imageTypeRegex)) {
        validImageFiles.push(file);
      }
    }
    if (validImageFiles.length) {
      setImageFiles(validImageFiles);
      return;
    }
    alert("Selected images are not of valid type!");
  };

  useEffect(() => {
    const fileReaders = [];
  let isCancel = false;
  if (imageFiles.length) {
    const promises = imageFiles.map(file => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            resolve(result);
          }
        }
        fileReader.onabort = () => {
          reject(new Error("File reading aborted"));
        }
        fileReader.onerror = () => {
          reject(new Error("Failed to read file"));
        }
        fileReader.readAsDataURL(file);
      })
    });
    Promise
      .all(promises)
      .then(images => {
        if (!isCancel) {
          setImages(images);
        }
      })
      .catch(reason => {
        console.log(reason);
      });
  };
  return () => {
    isCancel = true;
    fileReaders.forEach(fileReader => {
      if (fileReader.readyState === 1) {
        fileReader.abort()
      }
    })
  }
}, [imageFiles]);
  return (
    <div className="App">
      <form>
        <p>
          <label htmlFor="file">Upload images</label>
          <input
            type="file"
            id="file"
            onChange={changeHandler}
            accept="image/png, image/jpg, image/jpeg"
            multiple
          />
        </p>
      </form>
    </div>
  );
}

export default App;