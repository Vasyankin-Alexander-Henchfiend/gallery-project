import styles from "./icon-button.module.scss";

interface IconButton {
  extraClassButton?: string;
  extraClassIcon?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const IconButton: React.FC<IconButton> = ({
  extraClassButton = "",
  extraClassIcon = "",
  onClick,
  ...rest
}) => {
  return (
    <button
      type="button"
      className={`${styles.button} ${extraClassButton}`}
      onClick={onClick}
      {...rest}
    >
      <i className={`${styles.icon} ${extraClassIcon}`} />
    </button>
  );
};
