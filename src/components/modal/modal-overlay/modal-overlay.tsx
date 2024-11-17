import styles from './modal-overlay.module.scss';

interface IModalOverlay {
  onClose: () => void;
  extraClass?: string;
}

export const ModalOverlay: React.FC<IModalOverlay> = ({onClose, extraClass = ''}) => {
    return (
        <div className={`${styles[`modal-overlay`]} ${extraClass}`} onClick={onClose}></div>
    )
}