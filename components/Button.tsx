import Link from "next/link";

type Props = {
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children?: React.ReactNode;
  fullWidth?: boolean;
};

type ButtonProps = Props &
  (
    | (React.ButtonHTMLAttributes<HTMLButtonElement> & { as?: "button" })
    | (React.AnchorHTMLAttributes<HTMLAnchorElement> & { as: "a" })
    | ({ as: "link"; href: string } & Omit<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        "href"
      >)
  );

const Button: React.FC<ButtonProps> = ({
  className,
  variant = "primary",
  size = "md",
  children,
  fullWidth,
  as = "button",
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800",
    secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className || ""}`;

  if (as === "a") {
    return (
      <a
        className={classes}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  if (as === "link") {
    return (
      <Link href={(props as { href: string }).href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
};

export default Button;