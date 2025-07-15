import React from "react";
import { cn } from "../../../lib/utils";

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
        variant?: 'default' | 'desctructive' | 'outline' | 'secondary' | 'ghost'
        size?: 'default' | 'sm' | 'lg'
    }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
    className, variant = 'default', size= 'default', ...props
}, ref) => {
    return (
        <button
            className={cn(
                'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
                {
                    'bg-blue-600 text-white hover:bg-blue-700' : variant === 'default',
                    'bg-red-600 text-white hover:bg-red-700' : variant === 'desctructive',
                    'border border-gray-300 bg-white hover:bg-gray-50': variant === 'outline',
                    'bg-gray-100 text-gray-900 hover:bg-gray-200': variant === 'secondary',
                    'hover:bg-gray-100': variant === 'ghost',
                },
                {
                    'h-10 px-4 py-2': size === 'default',
                    'h-9 px-3': size === 'sm',
                    'h-11 px-8': size === 'lg',
                },
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Button.displayName = 'Button'

export { Button }