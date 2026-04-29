import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export function Button({ children, loading, ...props }: Props) {
  return (
    <button className="btn" {...props} disabled={loading || props.disabled}>
      {loading ? "Please wait..." : children}
    </button>
  );
}