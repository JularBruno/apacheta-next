'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Category, Tag } from '../definitions';
import { z } from 'zod';
import { getSession, getMethod, postMethod } from "./utils";

//// All Tag methods
export async function getTagsByUser(): Promise<Array<Tag>> {
    const session = await getSession();
    const url = 'tag/user'

    return await getMethod<Array<Tag>>(url, await session?.user.id);
}

const PostTagFormSchema = z.object({
    userId: z.string(),
    name: z.string().min(1, 'Name is required'),
    categoryId: z.string({
      invalid_type_error: 'Please select a category.',
    }),
})
  
const PostTag = PostTagFormSchema.omit({ userId: true });

export type TagState = {
    errors?: {
      name?: string[];
      categoryId?: string[];
    };
    message?: string | null;
};
  
export async function postTag(prevState: TagState, formData: FormData) {
    const session = await getSession();
    const url = 'tag';

    if (!session?.user.id) throw new Error('User ID is missing'); // not sure if required

    const validatedData = PostTag.safeParse({
        name: formData.get('name'),
        categoryId: formData.get('categoryId'),
    });

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
            message: 'Missing fields.',
        };
    }

    try {
        await postMethod<Category>(url, {
            ...validatedData.data,
            userId: session.user.id
        });
    } catch (error) {
        console.log(error);
    }
    revalidatePath('/dashboard');
    redirect('/dashboard');
}
