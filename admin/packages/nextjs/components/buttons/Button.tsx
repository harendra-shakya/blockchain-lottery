/* eslint-disable  @typescript-eslint/no-var-requires */
import { Spinner } from "../Spinner";

interface IButton {
    className?: string;
    loading?: boolean;
    onClick?: () => void;
    text: string;
    image?: any;
    changeGap?: string;
    disabled?: boolean;
}

function Button({ className = "", loading, onClick, text, image, changeGap, disabled }: IButton) {
    return (
        <button
            className={`cw-btn flex ${className} ${loading || disabled ? "cursor-not-allowed bg-gray" : ""}`}
            onClick={onClick}
            disabled={loading || disabled}
        >
            <div className={`flex flex-row justify-center items-center ${!changeGap ? "gap-6" : changeGap}`}>
                {loading && (
                    <div className="md:scale-[1.5] text-[#ffffff]">
                        <Spinner />
                    </div>
                )}
                {!!image && !loading && image}
                <div className="text-gradient-br">{text}</div>
            </div>
        </button>
    );
}

export default Button;
