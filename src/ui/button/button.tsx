import styles from "./button.module.scss";

interface IButton {
  extraClassButton?: string;
  extraClassIcon?: string;
  onClick: () => void;
  disabled?: boolean;
}

export const Button: React.FC<IButton> = ({
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
