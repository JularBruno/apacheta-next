interface CollapsibleProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string,
    children: React.ReactNode;
}

export default function Collapsible({title, children}: CollapsibleProps) {
    return(
        <div className="w-full bg-white rounded-lg shadow-lg border-gray-700 text-black"
        // onClick={handleToggle}
        >
            <div className="card-title">
                <h2>{title}</h2>
            </div>
            <div
                className="card-collapse"
                // style={{ height: currentHeight + "px" }}
            >
                <div className="card-body" >
                    {children}
                </div>
            </div>
        </div>
    );
}