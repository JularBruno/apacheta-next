'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { auth, signIn } from '@/auth'; 
import { AuthError } from 'next-auth';
import { Category, Tag } from '@/app/lib/definitions';
import type { Session } from 'next-auth';
import { z } from 'zod';
import { getSession, getMethod, postMethod, deleteMethod } from "./utils";

// Authenticate for throwing in form and reaching sign-in in auth
export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }


const PostUserFormSchema = z.object({
    userId: z.string(),
    name: z.string().min(1, 'Name is required'),
    categoryId: z.string({
      invalid_type_error: 'Please select a category.',
    }),
})
  
const PostUser = PostUserFormSchema.omit({ userId: true });

export type UserState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};
  
export async function register(prevState: UserState, formData: FormData) {
    const session = await getSession();
    let url = 'user/register';

    const validatedData = PostUser.safeParse({
        email: formData.get('email'),
        password: formData.get('password'),
    });

    if (!validatedData.success) {
        return {
            errors: validatedData.error.flatten().fieldErrors,
            message: 'Missing fields.',
        };
    }

    try {
        await postMethod<Category>(url, {
            ...validatedData.data
        });

        try {
            await signIn('credentials', formData);
            
            revalidatePath('/dashboard');
            redirect('/dashboard');
        } catch (error) {
            if (error instanceof AuthError) {
                switch (error.type) {
                    case 'CredentialsSignin':
                    return 'Invalid credentials.';
                    default:
                    return 'Something went wrong.';
                }
            }
            throw error;
        }

    } catch (error) {
        console.log(error);
    }

}

  