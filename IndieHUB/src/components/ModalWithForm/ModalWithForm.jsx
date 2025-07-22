import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} title="Fechar">×</button>
        {children}
      </div>
    </div>
  );
}

export default ModalWithForm;