import Blockies from "react-blockies";

const ChatList = ({ chat, currentUser }: { chat: any; currentUser: any }) => {
    console.log(currentUser);
    return (
        <div className="flex flex-row items-start justify-start gap-[16px]">
            <Blockies
                className="rounded-full stroke-white border-[2.5px] border-solid border-white"
                seed={chat.username?.toLowerCase() as string}
                scale={5.5}
            />
            <div className="flex flex-col items-start justify-start gap-[8px]">
                <div className="flex flex-col items-start justify-start text-base">
                    <p className="m-0 relative leading-[24px] uppercase">{chat.username}</p>
                    {/* <p className="m-0 relative text-xs leading-[24px] uppercase text-gray">{time}</p> */}
                </div>
                <p className="m-0 relative leading-[24px] uppercase text-gray inline-block md:w-[400px]">
                    {chat.message}
                </p>
            </div>
        </div>
    );
};

export default ChatList;
