"use client";

import { Button } from "@/app/ui/buttons";
import { FormInput, FormSelect } from "@/app/ui/inputs";
import { postTag, TagState } from '@/app/lib/actions/tags';
import { Category } from '@/app/lib/definitions';
import { useActionState } from "react";

export default function Form({categories}: {categories: Array<Category>}) {
      const initialState: TagState = { message: null, errors: {} };
  
      const [state, formAction] = useActionState(postTag, initialState);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">Nuevo gasto</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action={formAction}> 
              <FormSelect label="Categoría" name="categoryId" data={categories}/>
              <div id="categoryId-error" aria-live="polite" aria-atomic="true">
                {state.errors?.categoryId &&
                  state.errors.categoryId.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>

              <FormInput label="Nombre del gasto" name="name" type="string" placeholder="Nombre" />
              <div id="name-error" aria-live="polite" aria-atomic="true">
                {state.errors?.name &&
                  state.errors.name.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>

              <div>
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