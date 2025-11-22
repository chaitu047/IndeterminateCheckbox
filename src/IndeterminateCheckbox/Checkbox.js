import { useEffect, useRef } from "react";
import STATUS from "../consts";
export default function Checkbox({ id, label, status, handleChange }) {
  const inputRef = useRef(null);
  useEffect(() => {
    if (status === STATUS.INDETERMINATE) {
      inputRef.current.indeterminate = true;
    } else {
      inputRef.current.indeterminate = false;
    }
  }, [status]);
  return (
    <div>
      <input
        ref={inputRef}
        type="checkbox"
        checked={status == STATUS.CHECKED}
        onChange={() => handleChange(id)}
      />
      <label>{label}</label>
    </div>
  );
}
