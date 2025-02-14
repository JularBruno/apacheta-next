'use client';

// import {
//   UserGroupIcon,
//   HomeIcon,
//   DocumentDuplicateIcon,
// } from '@heroicons/react/24/outline';

import { ButtonLink } from '@/app/ui/buttons';
// import { usePathname } from 'next/navigation';
// import { clsx } from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
//   { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'Nueva categoría', href: '/dashboard/categories/create' },
  { name: 'Nuevo gasto', href: '/dashboard/tags/create' },
  { name: 'Historial', href: '/dashboard/history' },
];

export default function NavLinks() {
  // const pathname = usePathname();
  
  return (
    <>
      {links.map((link) => {
        // const LinkIcon = link.icon;
        return (
            <ButtonLink 
                key={link.name}
                href={link.href}
            >
                {link.name}
            </ButtonLink>

        //   <Link
        //     key={link.name}
        //     href={link.href}
        //     className={clsx('flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
        //       {
        //         'bg-sky-100 text-blue-600': pathname === link.href,
        //       },)}
        //   >
        //     {/* <LinkIcon className="w-6" /> */}
        //     <p className="hidden md:block">{link.name}</p>
        //   </Link>
        );
      })}
    </>
  );
}
