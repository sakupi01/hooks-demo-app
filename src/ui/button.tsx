import clsx from "clsx";

type ButtonProps = {
  icon: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
export function Button({ icon, className, ...props }: ButtonProps) {
  return (
    <div className="flex m-3">
      <button
        {...props}
        className={clsx(
          "flex h-10 items-center rounded-lg bg-yellow-500 px-4 text-lg font-medium text-white transition-colors hover:bg-purple-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-200 active:bg-purple-300 disabled:bg-zinc-200 aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
          className
        )}
        {...props.onClick}
      >
        {icon}
      </button>
    </div>
  );
}
