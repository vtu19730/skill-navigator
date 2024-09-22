import React from 'react';

// Custom Button Component
export const Button = ({ onClick, children, variant, size, ...props }) => {
  const baseStyles = "px-4 py-2 font-semibold rounded";
  const variantStyles = variant === "secondary" ? "bg-gray-500 text-white" : "bg-blue-500 text-white";
  const sizeStyles = size === "sm" ? "text-sm" : "text-base";

  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variantStyles} ${sizeStyles}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Custom Input Component
export const Input = ({ id, placeholder, ...props }) => (
  <input
    id={id}
    placeholder={placeholder}
    className="p-2 border border-gray-300 rounded w-full"
    {...props}
  />
);

// Custom Label Component
export const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
    {children}
  </label>
);

// Custom Card Components
export const Card = ({ children, className }) => (
  <div className={`border border-gray-200 rounded shadow-sm p-4 ${className}`}>
    {children}
  </div>
);

export const CardHeader = ({ children }) => (
  <div className="border-b border-gray-200 pb-2 mb-2">
    {children}
  </div>
);

export const CardContent = ({ children }) => (
  <div className="mb-2">
    {children}
  </div>
);

export const CardFooter = ({ children }) => (
  <div className="pt-2">
    {children}
  </div>
);

export const CardTitle = ({ children, className }) => (
  <h2 className={`text-lg font-bold ${className}`}>
    {children}
  </h2>
);

export const CardDescription = ({ children }) => (
  <p className="text-sm text-gray-600">
    {children}
  </p>
);
