import React from 'react';

const Skeleton = ({ className, variant = 'rect', ...props }) => {
  const baseClasses = "animate-pulse bg-slate-200/60 rounded-md";
  const variantClasses = {
    rect: "rounded-lg",
    circle: "rounded-full",
    text: "h-4 w-full rounded",
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant] || ''} ${className}`} 
      style={{
        background: 'linear-gradient(90deg, rgba(226, 232, 240, 0.6) 25%, rgba(241, 245, 249, 0.8) 50%, rgba(226, 232, 240, 0.6) 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeleton-shimmer 1.5s infinite linear'
      }}
      {...props}
    />
  );
};

export default Skeleton;
