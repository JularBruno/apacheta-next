import { Button } from "@/app/ui/buttons";
import { FormInput } from "@/app/ui/inputs";
import { NavigateDashboard } from "@/app/lib/actions";

export default function Form() {

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"> */}
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">Registrate!</h2> {/* esto tenía mt 10*/}
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action={NavigateDashboard}> 
            {/* <form className="space-y-6" action={async (formData) => await Navigate("home")}>  */}
                {/*  */}
                {/* aria-describedby="form-error" this for form error and this same should be in input */}

              <FormInput label="Email" name="email" type="email" placeholder="e-mail" />

              <FormInput label="Contraseña" name="password" type="password" placeholder="Contraseña" />

              <div>
                {/* <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button> */}
                <Button type="submit">
                    Registrarme
                </Button>
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