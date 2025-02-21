"use client";

import { Button } from "@/app/ui/buttons";
import { FormInput } from "@/app/ui/inputs";
import { postMovement, MovementState } from '@/app/lib/actions/movements';
import { useActionState } from "react";
import { Tag } from '@/app/lib/definitions';
// import { useFormState } from "react-dom";

export default function Tags(
    {tag, categoryId}: {tag: Tag, categoryId: string}
) {
    const initialState: MovementState = { message: null, errors: {} };

    const [, formAction] = useActionState(postMovement, initialState);

    return (
        <tr key={tag.id}>
            <td className='text-left p-1'>{tag.name}</td>
            <td className='text-left p-1 '>
                {/* <form className='flex justify-center gap-4' action={formAction}> */}
                <form className='flex justify-center gap-4' >
                    <FormInput 
                        label=''
                        name='amount'
                        type='number'
                        placeholder='$0'
                        className='h-8'
                    >

                    </FormInput>
                    <Button className='xl:w-1 w-1 h-8' 
                        formAction={async (formData: FormData) => {
                            formData.append('categoryId', categoryId);
                            formData.append('tagId', '' + tag.id); // todo why
                            formData.append('type', 'expense');
                            formData.append('description', 'tag');
                            await formAction(formData);
                        }}
                    >
                        -
                    </Button>
                </form>
            </td>
            {/* <td className='text-center hidden xl:table-cell'>
                $400
            </td> */}
        </tr>
  );
};
