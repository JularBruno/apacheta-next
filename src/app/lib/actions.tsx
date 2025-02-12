'use server';

import { redirect } from 'next/navigation';

export async function NavigateDashboard(){ 
    redirect(`/dashboard`);
};

export async function NavigateHome(){ 
    redirect("/");
};