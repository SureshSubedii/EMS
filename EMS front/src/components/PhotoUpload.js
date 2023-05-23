import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';

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
        <div>
          <img src={uploadedImage} alt="Uploaded" />
        </div>
      )}
    </div>
  );
};

export default PhotoUploadButton;
