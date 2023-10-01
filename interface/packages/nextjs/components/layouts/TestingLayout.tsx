import { ReactElement } from "react";
import { FC } from "react";
import { Header } from "../Header";
import { Footer } from "../TFooter";

interface ITestingLayout {
    className?: string;
    children: ReactElement<any, any>;
}

const TestingLayout: FC<ITestingLayout> = ({ className = "", children }) => {
    return (
        <main
            className={`mx-auto flex flex-col font-orbitron text-white overflow-hidden ${className}`}
            data-theme="scaffoldEthDark"
        >
            <Header />
            {children}
            <Footer />
        </main>
    );
};

export default TestingLayout;
