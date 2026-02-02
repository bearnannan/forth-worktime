import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div className={cn("glass-card rounded-2xl p-4 sm:p-6 transition-all duration-300", className)}>
            {children}
        </div>
    );
}

export function Button({
    children,
    variant = 'primary',
    className,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'success' | 'outline' }) {

    const variants = {
        primary: "bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg shadow-violet-200/50 hover:shadow-violet-200/70 hover:scale-105",
        secondary: "bg-slate-200 text-slate-700 hover:bg-slate-300",
        success: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-200/50 hover:shadow-emerald-200/70 hover:scale-105",
        outline: "border border-slate-300 bg-transparent hover:bg-slate-50 text-slate-700"
    };

    return (
        <button
            className={cn("px-4 py-2 rounded-xl font-semibold transition-all active:scale-95 flex items-center justify-center gap-2 text-sm", variants[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
}
