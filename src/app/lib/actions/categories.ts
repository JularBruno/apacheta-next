'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { auth, signIn } from '@/auth'; 
import { AuthError } from 'next-auth';
import { Category, Tag } from '@/app/lib/definitions';
import type { Session } from 'next-auth';
import { z } from 'zod';
import { getSession, getMethod, postMethod, deleteMethod } from "./utils";

//// All Categories methods and form validations
export async function getCategoriesByUser(): Promise<Array<Category>> {
    const session = await getSession();
    let url = 'category/user'

    return await getMethod<Array<Category>>(url, await session?.user.id);
}

export async function deleteCategory(id: string) {
    let url = 'category'

    await deleteMethod<Category>(url, id);
    revalidatePath('/dashboard');
}

const PostCategoryFormSchema = z.object({
    userId: z.string(),
    name: z.string().min(1, 'Name is required'),
})

const PostCategory = PostCategoryFormSchema.omit({ userId: true });

export type CategoryState = {
    errors?: {
      name?: string[];
    };
    message?: string | null;
};

export async function postCategory(prevState: CategoryState, formData: FormData) {
    const session = await getSession();
    let url = 'category';

    if (!session?.user.id) throw new Error('User ID is missing'); // not sure if required

    const validatedData = PostCategory.safeParse({
        name: formData.get('name'),
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
