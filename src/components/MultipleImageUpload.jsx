import React from 'react';
import { useDropzone } from 'react-dropzone';
import 'react-dropzone-uploader/dist/styles.css';

const MultipleImageUpload = ({ onUpload }) => {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    open
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      onUpload(acceptedFiles);
    }
  });

  return (
    <div className="flex flex-col items-center mt-4">
      <div
        {...getRootProps()}
        className={`p-8 border-dashed border-2 ${
          isDragActive ? 'border-blue-500' : 'border-gray-300'
        } rounded-md cursor-pointer`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">Arrastra y suelta las imágenes aquí, o haz clic para seleccionarlas.</p>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={open}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Seleccionar imágenes
        </button>
      </div>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Imágenes seleccionadas:</h3>
        <ul>
          {acceptedFiles.map(file => (
            <li key={file.path} className="text-gray-600">{file.path}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MultipleImageUpload;
