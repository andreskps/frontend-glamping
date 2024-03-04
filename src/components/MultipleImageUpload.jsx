import { useState } from "react";
import { useDropzone } from "react-dropzone";
import "react-dropzone-uploader/dist/styles.css";

const MultipleImageUpload = ({ onUpload,formState,setFormState,isEditing }) => {
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async () => {
    setIsUploading(true);

    await onUpload(files);

    setFiles([]);

    setIsUploading(false);
  };

  const handleDelete = (file) => {
    setFiles(files.filter((f) => f !== file));
  };
  const { getRootProps, getInputProps, isDragActive, acceptedFiles, open } =
    useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
  
        setFormState({
          ...formState,
          files: acceptedFiles
        })
        setFiles(acceptedFiles);
      },
    });

  return (
    <div className="flex flex-col items-center mt-4 space-y-4">
      <div
        {...getRootProps()}
        className={`p-8 border-dashed border-2 ${
          isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
        } rounded-md cursor-pointer transition-colors duration-200`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-500">
          Arrastra y suelta las imágenes aquí, o haz clic para seleccionarlas.
        </p>
      </div>


      <div>
        <h3 className="text-lg font-semibold mb-2">Imágenes seleccionadas:</h3>
        <div className="grid grid-cols-3 gap-4">
          {files.map((file) => (
            <div key={file.path} className="relative h-20">
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                className="h-full w-full object-cover rounded-md"
              />
              <button
                onClick={() => handleDelete(file)}
                className="absolute right-0 top-0 bg-red-500 text-white rounded-bl-md"
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>

      {
        isEditing && (
          <button
          type="button"
          disabled={files.length === 0 || isUploading}
          onClick={handleUpload}
          className={`bg-blue-500 text-white py-2 px-4 disabled:opacity-50 disabled:cursor-no-drop rounded-md hover:bg-blue-600 transition-colors duration-200 ${
            isUploading ? "opacity-50" : ""
          }`}
        >
          {isUploading ? "Subiendo..." : "Subir nuevas imágenes"}
        </button>
        )
      }
     
    </div>
  );
};

export default MultipleImageUpload;
