import { forwardRef, type ForwardedRef } from "react";
import styles from "./Checkbox.module.css";

interface Props {
  ariaLabel: string;
  checked: boolean;
  disabled?: boolean;
  id: string;
  name?: string;
  label?: string;
  isInTopLeftCorner?: boolean;
  onChange: () => void;
}

const Checkbox = forwardRef(function Checkbox(
  {
    ariaLabel,
    checked,
    disabled = false,
    id,
    name,
    label = "",
    isInTopLeftCorner = false,
    onChange,
  }: Props,
  ref?: ForwardedRef<HTMLInputElement>
) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        aria-label={ariaLabel}
        checked={checked}
        className={`${styles.checkbox} ${
          isInTopLeftCorner ? styles.topLeftCorner : ""
        }`}
        disabled={disabled}
        id={id}
        name={name}
        onChange={onChange}
        ref={ref}
        type="checkbox"
      />
    </>
  );
});

export default Checkbox;
