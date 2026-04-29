import type { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function Input({ label, error, ...props }: Props) {
  return (
    <label className="input-group">
      <span>{label}</span>
      <input className="input" {...props} />
      {error ? <small className="form-error">{error}</small> : null}
    </label>
  );
}