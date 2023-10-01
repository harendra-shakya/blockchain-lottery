interface ITableNav {
    titles: string[];
    classNames?: string[];
    width?: string;
}

export default function TableNav({ titles, classNames, width = "xl:w-[1200px] w-full" }: ITableNav) {
    return (
        <div
            className={`${width} mx-auto text-gray flex flex-row items-center justify-between h-6 text-center text-3xs`}
        >
            {titles?.map((title, i) => (
                <p className={`${!classNames ? "flex-1" : classNames[i]}`} key={i}>
                    {title}
                </p>
            ))}
        </div>
    );
}
