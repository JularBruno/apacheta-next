
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    type: string;
    // step: React.ReactNode;
    placeholder: string;
    // children: React.ReactNode;
  }
  
  
export function FormInput({ label, name, type, placeholder
    // , children 
}: InputProps) {
    return (
        <div>
            <label htmlFor={name} className="block text-sm/6 font-medium text-gray-900">{label}</label>
            <div className="mt-2">
                <input type={type} name={name} id={name} placeholder={placeholder}
                // autocomplete="email" required
                className="block w-full border border-gray-300 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-blue-500 placeholder:text-gray-400 sm:text-sm/6"/>
            </div>
        </div>
    );
}