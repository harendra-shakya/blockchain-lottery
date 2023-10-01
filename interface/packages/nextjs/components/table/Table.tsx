import React from "react";
import TableComponent from "./TableComponent";
import TableNav from "./TableNav";
import truncateAddress from "~~/lib/Truncate/truncateAddress";

interface ITable {
    data?: any;
    titles: string[];
    keys: string[];
    classNames?: string[];
}

export default function Table({ data, titles, keys, classNames }: ITable) {
    return (
        <div>
            <TableNav titles={titles} classNames={classNames} />
            <div className="mx-auto text-xs w-full flex flex-col items-center justify-between gap-[12px] mb-10">
                {data?.map((row: any, i: number) => (
                    <TableComponent
                        rows={[(i + 1).toString(), truncateAddress(row[keys[0]]), "", row[keys[1]], row[keys[2]]]}
                        key={`basetable-${i}`}
                        classNames={classNames}
                    />
                ))}
            </div>
        </div>
    );
}
