interface StatusButtonProps {
  value: boolean;
  onClick: () => void;
  className?: string;
}

export default function StatusButton({
  value,
  onClick,
  className,
}: StatusButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-200
        ${
          value
            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-800'
            : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-800'
        }
        ${className ?? ''}
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-2 ${
          value ? 'bg-emerald-500' : 'bg-rose-500'
        }`}
      ></span>
      {value ? 'Active' : 'Inactive'}
    </button>
  );
}
