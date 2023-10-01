interface ITableNav {
    data?: any;
    titles: string[];
    rowArray: React.ReactNode[];
    flexes?: string[];
    callback?: () => void;
}

export default function TableNav({ rowArray, titles }: ITableNav) {
    return (
        <div
            className={`mx-auto flex my-2 flex-row items-center justify-between  xl:w-[894px] lg:w-[894px] md:w-[700px] w-[350px] h-6 text-center  text-gray default-scale`}
        >
            {rowArray?.map((_, i) => (
                <p className="flex-1" key={i}>
                    {titles[i]}
                </p>
            ))}
        </div>
    );
}
