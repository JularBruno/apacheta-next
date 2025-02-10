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
    <div className="flex flex-col gap-8 text-left justify-center items-center rounded-lg bg-white p-4"
        // {...props} className={`card ${props.className || ''}`}
    >
        {children}
    </div>
  );
};
