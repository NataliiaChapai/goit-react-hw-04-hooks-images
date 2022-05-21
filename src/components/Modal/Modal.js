import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({isShown, src, alt}) {
  
  const onEscClick = event => {
    if (event.code === 'Escape') {
      isShown();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onEscClick);
    return () => window.removeEventListener('keydown', onEscClick)
  })

  const onBDClick = event => {
    if (event.currentTarget === event.target) {
      isShown();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={onBDClick}>
      <div className={s.Modal}>
        <img className={s.Image} src={src} alt={alt} />
      </div>
    </div>,
    modalRoot
  );
  
}

Modal.propTypes = {
    isShown: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  };