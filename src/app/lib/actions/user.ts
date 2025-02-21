'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { signIn } from '@/auth'; 
import { AuthError } from 'next-auth';
import { Category } from '@/app/lib/definitions';
import { z } from 'zod';
import { postMethod } from "./utils";

const PostUserFormSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long" })
        // .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter" })
        // .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter" })
        // .regex(/[0-9]/, { message: "Password must contain at least one number" })
        // .regex(/[\W_]/, { message: "Password must contain at least one special character" }),
});
  
// const PostUser = PostUserFormSchema.omit({ userId: true });

export type UserState = {
    errors?: {
        email?: string[];
        password?: string[];
    };
    message?: string | null;
};
  
export async function register(prevState: UserState, formData: FormData) {
    const url = 'user/register';

    const validatedData = PostUserFormSchema.safeParse({
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
            
        } catch (error) {
            if (error instanceof AuthError) {
                // switch (error.type) {
                //     case 'CredentialsSignin':
                //     return 'Invalid credentials.';
                //     default:
                //     return 'Something went wrong.';
                // }
                // throw error;
                console.log(error);
            }
        }

    } catch (error) {
        console.log(error);
    }
    
    revalidatePath('/dashboard');
    redirect('/dashboard');

}

  