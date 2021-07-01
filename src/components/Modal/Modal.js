import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

const Modal = ({ visible, closeHandler, data }) => {
    if (!visible) return '';
    return ReactDOM.createPortal(
        <div className="modal">
            <div className="modal-header">
            
            </div>
            <div className="modal-body">
                <ul>
                    {Object.entries(data).map(([k,v]) => {
                        return (
                            <li key={k}>
                                <span className="key">{k.replace(/_/g, " ")}:</span>
                                <span>  {v}</span>
                            </li>
                        )
                    })}
                </ul>
                <button className="button close-button" type="button" onClick={closeHandler}>
                    Close
                </button>
            </div>
        </div>,
        document.body);
}

export default Modal;