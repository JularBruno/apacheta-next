

import Card from '@/app/ui/card';
// import Collapsible from '@/app/ui/collapsible';
import { ButtonLink } from '@/app/ui/buttons';
import Categories from '@/app/ui/dashboard/categories';
import { Suspense } from 'react';

export default function Page() {
    
    // const balance = await getUserBalance();
    
    return (
        <div className=''>
            <header>
                <Card>
                    <div className='grid gap-6 grid-cols-1 md:grid-cols-2 bg-white items-center' >

                        <h1 className='text-black'>
                            Balance Febrero: $2000
                        </h1>

                        <div className=''>
                            <ButtonLink href='/dashboard/income'>
                                Nuevo ingreso
                            </ButtonLink>
                        </div>
                    </div>

                </Card>
            </header>
        
            <main className='bg-white shadow-sm rounded-lg mt-4 h-full'>

                {/* attempted to do a few breakponints with no luck, also dont mess witht he doughnut div, keep things separated */}
                {/* <div className='h-60 p-4 w-full flex justify-center align-middle text-center items-center'>
                    <Doughnut data={data} />  fucxk the doughnut will do it later

                </div> */}
                <Suspense fallback={<div className='bg-white shadow-sm rounded-lg mt-4 h-full text-black'>Loading...</div>}>

                    <Categories/>

                </Suspense>

            </main>

        </div>
    );
} 
