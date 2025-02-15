"use client";

import Card from '@/app/ui/card';
// import Collapsible from '@/app/ui/collapsible';
import { Button, ButtonLink } from '@/app/ui/buttons';
import { FormInput } from '@/app/ui/inputs';
import { getCategoriesByUser } from '@/app/lib/actions';
import { useEffect, useState } from 'react';

export default function Page() {

    const [cats, setCats] = useState(null);
    // const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      async function fetchCategories() {
        const data = await getCategoriesByUser();
        setCats(data);
        // setLoading(false);
      }
  
      fetchCategories();
      
      console.log(cats);
      
    }, []);


    // const cats = getCategoriesByUser;
    // console.log('cats ', cats);
    

    const categories = ['cat1', 'cat2', 'cat3', 'cat4'];
    const spends = ['Spend1', 'Spend2', 'Spend3', 'Spend4'];

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

                <div>
                    {/* <Collapsible title="asd">
                        <h3>asd</h3>
                    </Collapsible> */}
                    <div className='p-4'>
                        {categories.map((category) =>
                            // don't forget about the key
                            <table className='w-full text-black' key={category}>
                                <thead>
                                    <tr className='border border-gray-300 text-left '>
                                        <th className='p-1'>{category}</th>
                                        <th></th>
                                        <th className='hidden xl:table-cell'>Total gastado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {spends.map((spend) =>
                                        <tr key={spend}>
                                            <td className='text-left p-1'>{spend}</td>
                                            <td className='text-left p-1 '>
                                                {/* justify-between */}
                                                <form className='flex justify-center gap-4' action={(() => console.log('asd')
                                                )}>
                                                    <FormInput 
                                                        label=''
                                                        name='spend'
                                                        type='number'
                                                        placeholder='$0'
                                                        className='h-8'
                                                    >

                                                    </FormInput>
                                                    <Button className='xl:w-1 w-1 h-8'>
                                                        +
                                                    </Button>
                                                </form>
                                            </td>
                                            <td className='text-center hidden xl:table-cell'>
                                                $400
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}

                    </div>
                </div>

            </main>

        </div>
    );
} 
