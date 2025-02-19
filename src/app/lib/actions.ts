'use server';

import { redirect } from 'next/navigation';
import { auth, signIn } from '../../auth'; // check this declaration hilarious
import { AuthError } from 'next-auth';
import { Category } from './definitions';

const url = 'https://neptuno-production.up.railway.app/v1';

export async function NavigateDashboard(){ 
    redirect(`/dashboard`);
};

export async function NavigateHome(){ 
    redirect("/");
};

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


export async function getCategoriesByUser(): Promise<Array<Category>> {
    const session = await auth();

    if (!session?.user?.id || !session?.accessToken) {
      // return { error: "Unauthorized" };
      throw new Error("Unauthorized");
    }

    try {
        const response = await fetch(`${url}/category/user/${session?.user.id}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${session?.accessToken}`,
            'Content-Type': 'application/json',
          }
        });

        const categories = await response.json();
        return categories;
    } catch (error) {
      if (error) {
        throw error;
      }
      throw error;
    }
  }