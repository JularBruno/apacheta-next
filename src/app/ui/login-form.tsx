'use client';

import { Button } from "@/app/ui/buttons";
import { FormInput } from "@/app/ui/inputs";
// import { NavigateDashboard } from "@/app/lib/actions";

import { useActionState } from 'react';
import { authenticate } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';


export default function Form() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  // const [errorMessage, formAction, isPending] = useActionState(
  const [errorMessage, formAction ] = useActionState(
    authenticate,
    undefined,
  );

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">Ingresa a tu cuenta!</h2> {/* esto tenía mt 10*/}
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action={formAction}> 

              <FormInput label="Email" name="email" type="email" placeholder="e-mail" />

              <FormInput label="Contraseña" name="password" type="password" placeholder="Contraseña" />

              <div>
                <input type="hidden" name="redirectTo" value={callbackUrl} />
                <Button type="submit">
                    Ingresar
                </Button>
              </div>
              {errorMessage && (
                <>
                  {/* <ExclamationCircleIcon className="h-5 w-5 text-red-500" /> */}
                  <p className="text-sm text-red-500">{errorMessage}</p>
                </>
              )}
            </form>
          </div>
        </div>
    );
}