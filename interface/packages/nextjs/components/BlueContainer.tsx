import { ReactElement } from "react";
import { FC } from "react";

interface IBlueContainer {
    className?: string;
    children: ReactElement<any, any>;
}

const BlueContainer: FC<IBlueContainer> = ({ className = "", children }) => {
    return (
        <div className="default-scale 2xl:mx-28">
            <div
                className={`mx-auto max-w-screen blue-gradient rounded-21xl w-full h-full overflow-hidden default-my ${className}`}
            >
                {children}
            </div>
        </div>
    );
};

export default BlueContainer;
