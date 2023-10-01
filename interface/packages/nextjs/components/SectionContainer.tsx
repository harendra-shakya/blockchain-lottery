import { ReactElement } from "react";
import { FC } from "react";

interface ISectionContainer {
    className?: string;
    id?: string;
    children: ReactElement<any, any>;
}

const SectionContainer: FC<ISectionContainer> = ({ className = "", id, children }) => {
    return (
        <section
            className={`${className} mx-auto flex flex-col w-full max-w-screen h-full pb-10 text-center max-h-full`}
            id={id}
        >
            {children}
        </section>
    );
};

export default SectionContainer;
