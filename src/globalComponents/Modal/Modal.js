import React from "react";
import styles from './Modal.module.css';

function Modal({ message, type, isOpen, onClose }) {
    if (isOpen) {
        return (
            <>
            <div className={`${styles.modal} ${styles[type]}`}>
                <div className={styles.modalContent}>
                    <p>{message}</p>
                    <button className={styles.button} onClick={onClose}>Close</button>
                </div>
            </div>
            <div className={styles.canvas}></div>
            </>
        )
    }
}

export default Modal;