import { ReactElement } from "react";
import { FC } from "react";

interface IContentContainer {
    children: ReactElement<any, any>;
    className?: string;
}

const ContentContainer: FC<IContentContainer> = ({ children, className }) => {
    return <div className={`lg:mx-0 md:mx-10 mx-6 items-center ${className}`}>{children}</div>;
};

export default ContentContainer;
