import { ReactElement } from "react";
import { FC } from "react";
import dynamic from "next/dynamic";
import Navbar from "../navbar";

const Footer = dynamic(() => import("../footer"), { ssr: false });

interface IMainLayout {
    className?: string;
    children: ReactElement<any, any>;
}

const MainLayout: FC<IMainLayout> = ({ className = "", children }) => {
    return (
        <main className={`mx-auto flex flex-col font-orbitron text-white overflow-hidden ${className}`}>
            <Navbar />
            {children}
            <Footer />
        </main>
    );
};

export default MainLayout;
