'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

import { auth, signIn } from '@/auth'; 
import { AuthError } from 'next-auth';
import { Category, Tag } from '@/app/lib/definitions';
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
