import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SketchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  className?: string;
}

const SketchButton: React.FC<SketchButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  icon: Icon,
  iconPosition = 'right',
  className = '',
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-3 font-sketch text-lg transition-all duration-200 active:scale-95 group overflow-hidden select-none bg-transparent";
  
  const variants = {
    primary: "text-white", 
    secondary: "text-white", 
    outline: "text-[#B59410]", 
  };

  const bgColors = {
    primary: "bg-[#B59410]",
    secondary: "bg-[#1a1a2e]",
    outline: "bg-transparent",
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{
        borderRadius: '2px 4px 3px 6px / 4px 3px 5px 2px',
      }}
    >
      {/* Absolute Background & Border Layer with Pencil Filter distortion */}
      <div 
        className={`absolute inset-0 pointer-events-none ${bgColors[variant]}`}
        style={{
          filter: 'url(#pencilFilter)',
          border: variant === 'outline' ? '3px solid #B59410' : 'none',
          borderRadius: '2px 4px 3px 6px / 4px 3px 5px 2px',
          boxShadow: variant === 'outline' ? 'inset 0 0 0 1px #B59410' : 'none',
          zIndex: 0,
        }}
      />

      {/* Sketch Fill Texture Overlay (Only for filled buttons) */}
      {variant !== 'outline' && (
        <div 
          className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay z-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px',
            filter: 'url(#pencilFilter)',
            borderRadius: '2px 4px 3px 6px / 4px 3px 5px 2px',
          }}
        />
      )}
      
      {/* Content - 100% crisp, sharp and non-distorted text and icons */}
      <div className="relative z-10 flex items-center gap-2 pointer-events-none">
        {Icon && iconPosition === 'left' && <Icon size={20} className="stroke-[2.5]" />}
        <span className="font-bold tracking-tight">{children}</span>
        {Icon && iconPosition === 'right' && <Icon size={20} className="stroke-[2.5] group-hover:translate-x-1 transition-transform" />}
      </div>
    </button>
  );
};

export default SketchButton;
