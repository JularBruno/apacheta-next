import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    type: string;
    // step: React.ReactNode;
    placeholder: string;
    className?: string;
    // children: React.ReactNode;
}
  
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
}

export function FormInput({ label, name, type, placeholder, className
    // , children // choldren could be icons, will implement them later
}: InputProps) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <div className="">
                <input type={type} name={name} id={name} placeholder={placeholder}
                // autocomplete="email" required
                className={clsx(
                          "block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-blue-500 placeholder:text-gray-400 sm:text-sm/6",
                          className,
                        )}
                />
            </div>
        </div>
    );
}


export function FormSelect({ label, name
    // , children // choldren could be icons, will implement them later
}: SelectProps) {
    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">
                {label}
            </label>
            <div className="relative">

                <select
                    name={name} 
                    id={name}
                    className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-blue-500 placeholder:text-gray-400 sm:text-sm/6"
                    defaultValue=""
                    // aria-describedby="customer-error"
                >

                    <option value="" disabled>
                        Selecciona una {label}
                    </option>

                {/* {customers.map((customer) => (
                    <option key={customer.id} value={customer.id}>
                    {customer.name}
                    </option>
                ))} */}

            </select>

            {/* <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" /> */}
          </div>
          {/* <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div> */}
        </div>
    );
}
