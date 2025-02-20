'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { auth, signIn } from '@/auth'; 
import { AuthError } from 'next-auth';
import { Category, Tag } from '../definitions';
import type { Session } from 'next-auth';
import { z } from 'zod';
import { getSession, getMethod, postMethod, deleteMethod } from "./utils";


//// All Movement methods
export async function getMovementsByFilter(): Promise<Array<Tag>> {
    const session = await getSession();
    let url = 'movement/user'

    return await getMethod<Array<Tag>>(url, await session?.user.id);
}


const PostMovementFormSchema = z.object({
    userId: z.string(),
    categoryId: z.string(),
    tagId: z.string(),
    amount: z.coerce
      .number()
      .gt(0, { message: 'Please enter an amount greater than $0.' }),
    type: z.string(),
    description: z.string(),
  })
  
const PostMovement = PostMovementFormSchema.omit({ userId: true });


export type MovementState = {
    errors?: {
        categoryId?: string[];
        tagId?: string[];
        amount?: string[];
        type?: string[];
        description?: string[];
    };
    message?: string | null;
};

export async function postMovement(prevState: MovementState, formData: FormData) {
    const session = await getSession();
    let url = 'movement';

    if (!session?.user.id) throw new Error('User ID is missing'); // not sure if required

    const validatedData = PostMovement.safeParse({
        amount: formData.get('amount'),
        type: formData.get('type'),
        categoryId: formData.get('categoryId'),
        tagId: formData.get('tagId'),
        description: formData.get('description'),
    });
    
    if (!validatedData.success) {
        console.log('validatedData.error? ', validatedData.error);
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
    return {
        errors: {},
        message: "Success"
    };
}


export async function postTagMovement(prevState: MovementState, formData: FormData) {
    // TODO do this instead of adding everything on form
}

