import { forwardRef, type ForwardedRef } from "react";
import styles from "./Checkbox.module.css";

interface Props {
  ariaLabel: string;
  checked: boolean;
  "data-testid"?: string;
  disabled?: boolean;
  id: string;
  name?: string;
  label?: string;
  isInTopLeftCorner?: boolean;
  isSwitch?: boolean;
  onChange: () => void;
}

const Checkbox = forwardRef(function Checkbox(
  {
    ariaLabel,
    checked,
    "data-testid": dataTestid,
    disabled = false,
    id,
    name,
    label = "",
    isInTopLeftCorner = false,
    isSwitch = false,
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
        className={`${styles.checkbox} ${isSwitch ? styles.switch : ""}
        ${isInTopLeftCorner ? styles.topLeftCorner : ""}`}
        data-testid={dataTestid}
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
