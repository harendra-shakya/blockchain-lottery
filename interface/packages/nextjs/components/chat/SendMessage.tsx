import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

const SendMessage = ({
    handleSubmit,
    handleMessageChange,
    message,
}: {
    handleSubmit: () => void;
    handleMessageChange: () => void;
    message: any;
}) => {
    return (
        <form onSubmit={handleSubmit} className="flex flex-row gap-2 items-center">
            <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                className="[border:none]  text-xs bg-mediumslateblue-300 rounded-13xl flex flex-row p-4 items-center justify-center text-white md:w-[320px]"
                placeholder="Type a message..."
            />
            <button type="submit" className="bg-transparent">
                <PaperAirplaneIcon className="bg-transparent md:w-8 md:h-8 w-6 h-6 fill-blue cursor-pointer" />
            </button>
        </form>
    );
};

export default SendMessage;
