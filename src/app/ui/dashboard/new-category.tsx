import { Button } from "@/app/ui/buttons";
import { FormInput } from "@/app/ui/inputs";
import { NavigateDashboard } from "@/app/lib/actions";

export default function Form() {

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className=" text-center text-2xl/9 font-bold tracking-tight text-gray-900">Nueva categoría</h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action={NavigateDashboard}> 
              <FormInput label="Nombre de la categoría" name="name" type="string" placeholder="Nombre" />

              <div>
                <Button type="submit">
                    Crear
                </Button>
              </div>
            </form>
          </div>
        </div>
    );
}