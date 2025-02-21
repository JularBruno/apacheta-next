"use client";

import { Button } from "@/app/ui/buttons";
import { FormInput, FormSelect } from "@/app/ui/inputs";
import { postMovement, MovementState } from '@/app/lib/actions/movements';
import { Category } from '@/app/lib/definitions';
import { useActionState } from "react";

export default function Form() {
      const initialState: MovementState = { message: null, errors: {} };
  
      const [state, formAction] = useActionState(postMovement, initialState);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">Nuevo Ingreso</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action={formAction}> 

              <FormInput label="Monto del ingreso" name="amount" type="string" placeholder="Monto" />

              <FormInput label="Descripción del ingreso" name="description" type="string" placeholder="Descripción" />
              {/* <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                  state.errors.name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div> */}

              <div>
                 
                <Button // NOT REDIRECTING
                    formAction={async (formData: FormData) => {
                        formData.append('categoryId', '');
                        formData.append('tagId', '' + '');
                        formData.append('type', 'income');
                        await formAction(formData);
                    }}
                >
                {/* <Button type="submit"> */}
                    Crear
                </Button>
              </div>
              
              {/* <div id="form-error" aria-live="polite" aria-atomic="true">
                {state?.message &&
                    <p className="mt-2 text-sm text-red-500" key={state?.message}>
                        {state?.message}
                    </p>
                }
                    
              </div> */}
            </form>
          </div>
        </div>
    );
}