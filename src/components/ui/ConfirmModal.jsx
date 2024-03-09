
import {useState} from 'react'
import {Modal} from 'flowbite-react'

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
}) => {

  return (
    <>
       <Modal
        className="dark:bg-slate-900"
        show={isOpen}
        onClose={() => onClose()}
      >
        <Modal.Header>Confirmar eliminación</Modal.Header>
        <Modal.Body>
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            ¿Estás seguro de que quieres eliminar este elemento?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => onConfirm()}
            className="
            bg-red-600 text-white hover:bg-red-700  rounded-md p-2
            "
          >
            Eliminar
          </button>
          <button
            onClick={() => onClose()}
            className="
            bg-gray-200 text-gray-800 hover:bg-gray-300  rounded-md p-2
            "
          >
            Cancelar
          </button>
        </Modal.Footer>
      </Modal>
   

    </>
  )
}

export default ConfirmModal