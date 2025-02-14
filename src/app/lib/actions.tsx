'use server';

import { redirect } from 'next/navigation';
import { signIn } from '../../../auth'; // check this declaration hilarious
import { AuthError } from 'next-auth';

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