import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ ...props }) => {
  return (
    <input
      className={`${props.className} bg-gray-50 border border-gray-300 text-grey text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5`}
      {...props}
    />
  );
};
