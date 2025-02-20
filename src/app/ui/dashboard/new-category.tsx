"use client";

import { Button } from "@/app/ui/buttons";
import { FormInput } from "@/app/ui/inputs";
import { postCategory, State } from '@/app/lib/actions';
import { useActionState } from "react";
// import { useSearchParams } from 'next/navigation';


export default function Form() {
  const initialState: State = { message: null, errors: {} };

  const [state, formAction] = useActionState(postCategory, initialState);
  console.log('state ', state);
  
    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">Nueva categoría</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm" aria-describedby="form-error">
            {/* <form className="space-y-6" action={formAction}>  */}
            <form className="space-y-6" action={formAction}> 
              <FormInput label="Nombre de la categoría" name="name" type="string" placeholder="Nombre" />

              <div>
                {/* <input type="hidden" name="redirectTo" value={callbackUrl} /> */}
                <Button type="submit">
                    Crear
                </Button>
              </div>
              <div id="form-error" aria-live="polite" aria-atomic="true">
                {state?.message &&
                    <p className="mt-2 text-sm text-red-500" key={state?.message}>
                      {state?.message}
                    </p>
                    }
              </div>
            </form>
          </div>
        </div>
    );
}

