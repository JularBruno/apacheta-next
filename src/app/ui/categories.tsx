// import Collapsible from '@/app/ui/collapsible';
import { Button } from '@/app/ui/buttons';
import { FormInput } from '@/app/ui/inputs';
import { getCategoriesByUser } from '@/app/lib/actions';
import { Category } from '@/app/lib/definitions';

export default async function Categories(
) {
    
    const spends = ['Spend1', 'Spend2', 'Spend3', 'Spend4'];
    // const [categories, setCategories] = useState<Category[]>([]);

    // useEffect(() => {
        
    //     async function fetchCategories() {
    //     try {
    //         const data = await getCategoriesByUser();
    //         setCategories(data);
    //         } catch (error) {
    //         console.error("Error fetching categories:", error);
    //         }
    //     }

    //     fetchCategories();
        
    //     console.log(categories);
    // }, []);

    let categories: Category[] = [];
    try {
        categories = await getCategoriesByUser();
        console.log('categories ', categories);
        
      } catch (error) {
        console.error(error);
      }


  return (
        <div>
            <div className='p-4'>
                {categories?.map((category) =>
                    // don't forget about the key
                    <table className='w-full text-black' key={category.id}>
                        <thead>
                            <tr className='border border-gray-300 text-left '>
                                <th className='p-1'>{category.name}</th>
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
                                        {/* <form className='flex justify-center gap-4' action={(() => console.log('asd'))}> */}
                                        <form className='flex justify-center gap-4' >
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
  );
};
