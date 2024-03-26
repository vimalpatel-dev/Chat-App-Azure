import React, { useState } from 'react';
import './Modal.css';

function Modal({ isOpen, onClose }) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
		if(inputValue){
    setInputValue('');
    onClose(inputValue);
		}
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Enter Your Input</h2>
            <button className="close-btn" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter your input..."
            />
          </div>
          <div className="modal-footer">
            <button className="submit-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Modal;
