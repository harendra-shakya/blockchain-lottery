interface ITableComponent {
    rowArray: React.ReactNode[];
    flexes?: string[];
}

export default function TableComponent({ rowArray }: ITableComponent) {
    return (
        <div className="default-scale mx-auto flex items-center h-full text-center rounded-3xl bg-gradient-to-r from-[#ff817d] via-[#8233ff] via-[#3857fd] to-[#22def1] p-[1px]  mb-2">
            <div className=" mx-auto flex-row flex items-center rounded-3xl  justify-between  h-[74px] bg-black w-[894px] ">
                {rowArray.map((row, i) => (
                    <div className="flex-1" key={`row-${i}`}>
                        {row}
                    </div>
                ))}
            </div>
        </div>
    );
}
