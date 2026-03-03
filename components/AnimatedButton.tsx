import Link from 'next/link';
import { ReactNode, forwardRef } from 'react';

type AnimatedButtonProps = {
    href?: string;
    onClick?: () => void;
    children: ReactNode;
    variant?: 'primary' | 'secondary';
    className?: string;
    type?: 'button' | 'submit' | 'reset';
};

const AnimatedButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, AnimatedButtonProps>(({
    href,
    onClick,
    children,
    variant = 'primary',
    className = '',
    type = 'button',
    ...rest
}, ref) => {
    const isPrimary = variant === 'primary';

    const buttonClasses = `
    group/btn relative inline-flex items-center justify-center
    px-6 py-2.5 min-w-[120px] !bg-transparent backdrop-blur-[2px]
    text-sm md:text-base font-light tracking-wide
    transition-colors duration-400 ease-[cubic-bezier(0.19,1,0.22,1)]
    ${isPrimary ? 'text-white/80 hover:text-black' : 'text-white hover:text-black'}
    ${className}
  `;

    const UniversalEffects = (
        <>
            {/* Top Left Bracket */}
            <span className={`absolute left-0 top-0 transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10
        w-[10px] h-[10px] border-t border-l 
        ${isPrimary ? 'border-white/60 group-hover/btn:bg-white group-hover/btn:border-white' : 'border-white/40 group-hover/btn:bg-white group-hover/btn:border-white'} 
        group-hover/btn:w-full group-hover/btn:h-full`}
            />
            {/* Bottom Right Bracket */}
            <span className={`absolute right-0 bottom-0 transition-all duration-400 ease-[cubic-bezier(0.19,1,0.22,1)] -z-10
        w-[10px] h-[10px] border-b border-r 
        ${isPrimary ? 'border-white/60 group-hover/btn:bg-white group-hover/btn:border-white' : 'border-white/40 group-hover/btn:bg-white group-hover/btn:border-white'} 
        group-hover/btn:w-full group-hover/btn:h-full`}
            />
        </>
    );

    const content = (
        <span className="relative z-10 flex items-center justify-center w-full h-full text-center whitespace-nowrap">
            {children}
        </span>
    );

    if (href) {
        // Use native <a> tags for external links, mailto links, or hash fragment links
        if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) {
            return (
                <a
                    href={href}
                    className={buttonClasses}
                    onClick={onClick}
                    target={href.startsWith('http') ? "_blank" : "_self"}
                    rel={href.startsWith('http') ? "noopener noreferrer" : ""}
                    ref={ref as any}
                    {...rest}
                >
                    {UniversalEffects}
                    {content}
                </a>
            );
        }
        return (
            <Link href={href} className={buttonClasses} onClick={onClick} ref={ref as any} {...rest}>
                {UniversalEffects}
                {content}
            </Link>
        );
    }

    return (
        <button type={type} className={buttonClasses} onClick={onClick} ref={ref as any} {...rest}>
            {UniversalEffects}
            {content}
        </button>
    );
});

AnimatedButton.displayName = 'AnimatedButton';
export default AnimatedButton;
