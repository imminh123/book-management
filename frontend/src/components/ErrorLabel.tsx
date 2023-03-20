import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const ErrorLabel: React.FC<LabelProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <span
      className={`${className} text-red-400 italic text-sm -mb-2 mt-1 block`}
      {...props}
    >
      {children}
    </span>
  );
};
