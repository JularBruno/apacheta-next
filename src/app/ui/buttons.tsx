"use client";

import clsx from 'clsx';
import Link from "next/link";
import { deleteCategory } from '@/app/lib/actions/categories';
import { useTransition } from "react";

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
  
export function DeleteCategory({ id }: { id: string }) {
    // const deleteInvoiceWithId = deleteCategory.bind(null, id);
    const [isPending, startTransition] = useTransition();

    const handleDelete = () => { // TODO this is badly made, obviusly because of the browser warning, but also this made "use client" and think is not really required
        if (window.confirm("Are you sure you want to delete this?")) {
            startTransition(() => deleteCategory(id));
        }
    };

    return (
        <form action={handleDelete}>
        <Button className='w-8'>
            Del
        </Button>
        </form>
    );
}
