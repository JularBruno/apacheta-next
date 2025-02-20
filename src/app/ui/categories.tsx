// import Collapsible from '@/app/ui/collapsible';
import { Button, DeleteCategory } from '@/app/ui/buttons';
import { FormInput } from '@/app/ui/inputs';
import Tags from '@/app/ui/tags';
import { getCategoriesByUser, getTagsByUser } from '@/app/lib/actions';
import { Category, Tag } from '@/app/lib/definitions';
import { redirect } from 'next/navigation';

export default async function Categories(
) {
    let categories: Category[] = [];
    let tags: Tag[] = [];

    try {
        categories = await getCategoriesByUser();
        tags = await getTagsByUser();
    } catch (error) {
        redirect('/login');
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
                                
                                <th className='hidden xl:table-cell'>Total gastado</th>

                                <th className='flex justify-end text-right pr-4'>
                                    <DeleteCategory id={category.id}/> 
                                    {/* TODO this doesnt show loading when deletion */}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {tags
                            .filter(tag => tag.categoryId == category.id)
                            .map( (tag) =>
                                <Tags tag={tag} categoryId={category.id} key={tag.id} />
                            )}
                        </tbody>
                    </table>
                )}

            </div>
        
        </div>
  );
};
