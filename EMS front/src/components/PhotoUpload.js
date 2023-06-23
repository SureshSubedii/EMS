import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import '../styles/photoUpload.css';

const PhotoUploadButton = () => {
  const [uploadedImage, setUploadedImage] = useState(null);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles) {
      const uploadedImageURL = URL.createObjectURL(acceptedFiles[0]);
      setUploadedImage(uploadedImageURL);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <button>Upload Photo</button>
      </div>
      {uploadedImage && (
        <div className='uploadedPhoto'>
          {/* <input type= "file" name="photo"> */}
          <img  src={uploadedImage} alt="Uploaded" />

          {/* </input> */}
        </div>
      )}
    </div>
  );
};

export default PhotoUploadButton;
