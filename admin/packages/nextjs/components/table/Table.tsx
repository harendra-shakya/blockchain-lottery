import React from "react";
import TableComponent from "./TableComponent";
import TableNav from "./TableNav";

interface ITable {
    data?: any;
    titles: string[];
    rowArray: React.ReactNode[];
    flexes?: string[];
    callback?: () => void;
}

export default function Table({ data, titles, rowArray }: ITable) {
    return (
        <div>
            <TableNav rowArray={rowArray} titles={titles} />
            <div className="mx-auto flex flex-col my-2">
                {data?.map((row: any, i: number) => (
                    <TableComponent rowArray={rowArray} key={`basetable-${i}`} />
                ))}
            </div>
        </div>
    );
}
