import clsx from 'clsx';
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
  
interface LinkProps extends React.LinkHTMLAttributes<HTMLLinkElement> {
    children: React.ReactNode;
}

const buttonClass = 'font-semibold shadow-lg flex h-10 w-full justify-center items-center rounded-lg px-4 text-sm text-white bg-gradient-to-r from-zinc-900 from-0% to-stone-600 to-100%';
  
export function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <button // this is a copy but is very cool, you can pass icons and text on the children, more class definitions, and rest is used for Spread remaining props (onclick, disabled, everything!)
      {...rest}
      
      className={clsx(
        buttonClass,
        className,
      )}
    >
      {children}
    </button>
  );
}

// might want to add ...rest but it doesnt seem a linkprops type
export function ButtonLink({ children, className, href}: LinkProps) {
    return (
      <Link 
        href={href || "/"}
        
        className={clsx(
          buttonClass,
          className,
        )}
      >
        {children}
      </Link>
    );
  }
  