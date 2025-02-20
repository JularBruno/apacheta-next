'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { auth, signIn } from '@/auth'; 
import { AuthError } from 'next-auth';
import { Category, Tag } from './definitions';
import type { Session } from 'next-auth';
import { z } from 'zod';

// Urls might need to be more better
const urlDev = 'https://neptuno-production.up.railway.app/v1';

// session is auth method way of reaching its callbacks (auth from auth.config.ts) has some ways of retrieving user logged
export async function getSession(): Promise<Session | null> {
    return await auth();
};

// what to do when user not logged? Redirect!
export async function unauthorized(): Promise<Session | null> {
    // throw new Error("Unauthorized");
    return redirect("/login");
};

//// Methods for using in the rest of functions
export async function getMethod<T>(url: string, id?: string | number): Promise<T> {
    const session = await getSession();

    if (!session?.user?.id || !session?.accessToken) {
        throw new Error("Unauthorized");
    }

    try {
        const response = await fetch(`${urlDev}/${url}/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json',
          }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
      if (error) {
        throw error;
      }
      throw error;
    }
};

export async function postMethod<T>(url: string, body?: Object): Promise<T> {
    const session = await getSession();

    if (!session?.user?.id || !session?.accessToken) {
    //   throw new Error("Unauthorized");
        unauthorized();
    }

    try {
        const response = await fetch(`${urlDev}/${url}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify(body)
        });

        const data = await response.json();
        return data;
    } catch (error) {
      if (error) {
        throw error;
      }
      throw error;
    }
};



export async function deleteMethod<T>(url: string, id: string): Promise<T> {
    const session = await getSession();

    if (!session?.user?.id || !session?.accessToken) {
    //   throw new Error("Unauthorized");
        unauthorized();
    }

    try {
        const response = await fetch(`${urlDev}/${url}/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json',
          }
        });

        const data = await response.json();
        return data;
    } catch (error) {
      if (error) {
        throw error;
      }
      throw error;
    }
};

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

export type State = {
    errors?: {
      name?: string[];
      categoryId?: string[];
    };
    message?: string | null;
};

export async function postCategory(prevState: State, formData: FormData) {
    const session = await getSession();
    let url = 'category';

    if (!session?.user.id) throw new Error('User ID is missing'); // not sure if required

        // let body = {
        //     name: formData.get('name'),
        //     userId: session?.user.id
        // };

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
            ...validatedData,
            userId: session.user.id
        });
    } catch (error) {
        // if (error instanceof z.ZodError) {
        //     return error.errors[0].message;
        // }
        console.log(error);
        // return 'Something went wrong';
    }
    revalidatePath('/dashboard');
    redirect('/dashboard');
}

//// All Tag methods
export async function getTagsByUser(): Promise<Array<Tag>> {
    const session = await getSession();
    let url = 'tag/user'

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
    let url = 'tag';

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

export async function postMovement(prevState: State, formData: FormData) {
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


export async function postTagMovement(prevState: State, formData: FormData) {
    // TODO do this instead of adding everything on form
}

