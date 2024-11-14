import styles from './modal-overlay.module.scss';

interface IModalOverlay {
    onClose: () => void
}

export const ModalOverlay: React.FC<IModalOverlay> = ({onClose}) => {
    return (
        <div className={styles[`modal-overlay`]} onClick={onClose}></div>
    )
}