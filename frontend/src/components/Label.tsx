import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label: React.FC<LabelProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <label
      className={`${className} block mb-2 text-sm text-left font-semibold text-grey`}
      {...props}
    >
      {children}
    </label>
  );
};
