interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export default function Card({
    children
    // , ...props 
}
    : CardProps
) {
  return (
    <div className="flex flex-col gap-8 text-left justify-center items-center rounded-lg p-4
    
    shadow-[36px_12px_64px_0px_#020303b3]
    shadow-[-12px_-20px_56px_0px_#E8EDF30D]
    bg-gradient-to-br from-[#353C40] to-[#121416]/[74%] "
        // {...props} className={`card ${props.className || ''}`}
    >
        {children}
    </div>
  );
};
