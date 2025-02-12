import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import { Button } from '@/app/ui/buttons';
import { NavigateHome } from '@/app/lib/actions';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white rounded-lg">
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-500 p-4 md:h-20"
        href="/"
      >
        {/* I should check all of this breakpoints properly */}
        <div className="w-32 text-white md:w-40">
          <h1>Apacheta</h1>
        </div>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        {/* links map <NavLinks /> */}
        <NavLinks />

        <div className="hidden h-auto w-full grow rounded-md  md:block"></div>
            <form action={NavigateHome}>
                <Button type="submit">
                    Cerrar sesión
                </Button>
                {/* <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-300 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                    <PowerIcon className="w-6" />
                    <div className="hidden md:block">Sign Out</div>
                </button> */}
            </form>
      </div>
    </div>
  );
}
