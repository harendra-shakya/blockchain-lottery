interface ITableComponent {
    rows: string[];
    classNames?: string[];
    bg?: string;
    width?: string;
}

export default function TableComponent({
    rows,
    classNames,
    bg = "bg-black",
    width = "xl:w-[1200px] w-full",
}: ITableComponent) {
    return (
        <div className="w-full mx-4">
            <div
                className={`mx-auto ${width} flex items-center h-full text-center rounded-3xl primary-gradient-r p-[1px]`}
            >
                <div className={`${width} bg-black rounded-3xl`}>
                    <div
                        className={`mx-auto flex-row flex items-center rounded-3xl  justify-between w-full ${width} h-[74px] ${bg} `}
                    >
                        {rows.map((row, i) => (
                            <p className={`text-white ${!classNames ? "flex-1" : classNames[i]}`} key={i}>
                                {row}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
