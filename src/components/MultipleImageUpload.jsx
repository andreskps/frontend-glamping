import {useState} from 'react';
import { useDropzone } from 'react-dropzone';
import 'react-dropzone-uploader/dist/styles.css';

const MultipleImageUpload = ({ onUpload }) => {

  const [files, setFiles] = useState([]);




  const handleUpload = () => {
    onUpload(files)
    setFiles([])
  }



  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
    open
  } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles)
      
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
          {files.map(file => (
             <img key={file.path} src={URL.createObjectURL(file)} alt={file.name} className="h-20" />
          ))}
        </ul>
      </div>

      <button type="button" onClick={handleUpload} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">Subir</button>

    </div>
  );
};

export default MultipleImageUpload;
