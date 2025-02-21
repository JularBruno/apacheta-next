"use client";

import { Button } from "@/app/ui/buttons";
import { FormInput } from "@/app/ui/inputs";
import { UserState, register } from '@/app/lib/actions/user';
import { useActionState } from "react";

export default function Form() {
      const initialState: UserState = { message: null, errors: {} };
  
      const [state, formAction] = useActionState(register, initialState);

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">Registrate!</h2> {/* esto tenía mt 10*/}
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action={formAction}> 
            {/* <form className="space-y-6" >  */}
            {/* <form className="space-y-6" action={async (formData) => await Navigate("home")}>  */}
                {/*  */}
                {/* aria-describedby="form-error" this for form error and this same should be in input */}

              <FormInput label="Email" name="email" type="email" placeholder="e-mail" />
              <div id="email-error" aria-live="polite" aria-atomic="true">
                {state.errors?.email &&
                  state.errors.email.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>

              <FormInput label="Contraseña" name="password" type="password" placeholder="Contraseña" />
              <div id="password-error" aria-live="polite" aria-atomic="true">
                {state.errors?.password &&
                  state.errors.password.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
              </div>

              <div>
                {/* <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button> */}
                <Button type="submit">
                    Registrarme
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

            {/* <p className="mt-10 text-center text-sm/6 text-gray-500">
              Not a member?
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
            </p> */}
          </div>
        </div>
    );
}