import { useEffect, useState } from "react";
import axios from "axios";
import Pusher from "pusher-js";
import { useAccount } from "wagmi";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import ChatList from "~~/components/chat/ChatList";
import SendMessage from "~~/components/chat/SendMessage";
import truncateAddressForUsername from "~~/lib/Truncate/truncateAddressForUsername";

interface ILiveChat {
    userLocation: string;
}

const LiveChat: React.FC<ILiveChat> = ({ userLocation }) => {
    const { address } = useAccount();
    const username = truncateAddressForUsername(address!) || "";

    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: "us3",
        // use jwts in prod
        authEndpoint: `/api/pusher/auth`,
        auth: { params: { username, userLocation } },
    });
    const [hidden, setHidden] = useState(false);

    const [chats, setChats] = useState([]);
    const [messageToSend, setMessageToSend] = useState("");

    useEffect(() => {
        const channel = pusher.subscribe("presence-channel");

        // updates chats
        // @ts-expect-error
        channel.bind("chat-update", function (data) {
            const { username, message } = data;
            // @ts-expect-error

            setChats(prevState => [...prevState, { username, message }]);
        });

        return () => {
            pusher.unsubscribe("presence-channel");
        };
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await axios.post("/api/pusher/chat-update", {
            message: messageToSend,
            username,
            userLocation,
        });
    };

    return (
        <div className="flex flex-col items-start justify-start gap-[24px] md:w-[486px]  text-left text-5xl text-white ">
            {/* Top */}
            <div
                className="flex flex-col gap-3 cursor-pointer"
                onClick={() => {
                    setHidden(!hidden);
                }}
            >
                <div className="flex flex-row items-center justify-start gap-[8px] ">
                    <div className=" leading-[32px] uppercase inline-block md:w-[454px] shrink-0">Live chat</div>
                    {!hidden ? (
                        <ChevronUpIcon className="w-7 h-7 fill-blue stroke-blue stroke-2" />
                    ) : (
                        <ChevronDownIcon className="w-7 h-7 fill-blue stroke-blue stroke-2" />
                    )}{" "}
                </div>
                <div className="rounded-t-8xs rounded-b-none bg-blue md:w-[486px] h-[5px]" />
            </div>

            {/* Msgs */}
            {!hidden && (
                <div className=" flex flex-col items-start justify-start gap-[32px] text-xs md:w-[464px]">
                    <div className="flex flex-col items-start justify-start gap-[24px]">
                        {chats.map((chat, id) => (
                            <ChatList key={id} chat={chat} currentUser={username} />
                        ))}
                    </div>
                </div>
            )}

            <SendMessage
                message={messageToSend}
                // @ts-expect-error

                handleMessageChange={e => setMessageToSend(e.target.value)}
                // @ts-expect-error

                handleSubmit={e => {
                    handleSubmit(e);
                }}
            />
        </div>
    );
};

export default LiveChat;

// const FormatedMessage = ({
//     name,
//     time,
//     message,
//     children,
// }: {
//     name: string;
//     time: string;
//     message: string;
//     children: ReactElement<any, any>;
// }) => {
//     const [reply, setReply] = useState(false);

//     return (
//         <div className="flex flex-row items-start justify-start gap-[16px]">
//             <Blockies
//                 className="rounded-full stroke-white border-[2.5px] border-solid border-white"
//                 seed={message?.toLowerCase() as string}
//                 scale={5.5}
//             />
//             <div className="flex flex-col items-start justify-start gap-[8px]">
//                 <div className="flex flex-col items-start justify-start text-base">
//                     <p className="m-0 relative leading-[24px] uppercase">{name}</p>
//                     <p className="m-0 relative text-xs leading-[24px] uppercase text-gray">{time}</p>
//                 </div>
//                 <p className="m-0 relative leading-[24px] uppercase text-gray inline-block md:w-[400px]">{message}</p>

//                 <div className="flex flex-row gap-3">
//                     <p
//                         className="m-0 relative leading-[24px] uppercase cursor-pointer"
//                         onClick={() => {
//                             setReply(!reply);
//                         }}
//                     >
//                         Reply
//                     </p>

//                     {reply && (
//                         <p
//                             className="m-0 relative leading-[24px] uppercase cursor-pointer"
//                             onClick={() => {
//                                 setReply(!reply);
//                             }}
//                         >
//                             Close
//                         </p>
//                     )}
//                 </div>

//                 {reply && (
//                     <div className="flex flex-row gap-2 items-center">
//                         <textarea
//                             className="[border:none]  text-xs bg-mediumslateblue-300 rounded-13xl flex flex-row p-4 items-center justify-center text-white md:w-[320px]"
//                             placeholder="Type a message..."
//                         />
//                         {/* <button className="rounded-xl flex flex-row items-center justify-center md:w-[80px] md:h-[40px] bg-cyan text-white">
//                                 Send
//                             </button> */}
//                         <PaperAirplaneIcon className="md:w-8 md:h-8 w-6 h-6 fill-blue cursor-pointer" />
//                     </div>
//                 )}
//                 {children}
//             </div>
//         </div>
//     );
// };

// const Reply = () => (
//     <div className="rounded-13xl bg-mediumslateblue-300 flex flex-col py-4 pr-6 pl-4 items-center justify-center">
//         <FormatedMessage
//             name="Beegoe"
//             time="23:53"
//             message=" Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
//         >
//             <div className="flex flex-row items-center justify-start gap-[8px] text-cyan">
//                 <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/chat.svg" />
//                 <p className="m-0 relative leading-[24px] uppercase">6 more replies</p>
//                 <div className="flex flex-row items-start justify-start">
//                     <Blockies
//                         className="rounded-full stroke-white border-[2.5px] border-solid border-white"
//                         seed={Math.random()?.toString().toLowerCase() as string}
//                         scale={3.5}
//                     />
//                     <Blockies
//                         className="rounded-full stroke-white border-[2.5px] border-solid border-white ml-[-8px]"
//                         seed={Math.random()?.toString().toLowerCase() as string}
//                         scale={3.5}
//                     />
//                     <Blockies
//                         className="rounded-full stroke-white border-[2.5px] border-solid border-white ml-[-8px]"
//                         seed={Math.random()?.toString().toLowerCase() as string}
//                         scale={3.5}
//                     />
//                     <Blockies
//                         className="rounded-full stroke-white border-[2.5px] border-solid border-white ml-[-8px]"
//                         seed={Math.random()?.toString().toLowerCase() as string}
//                         scale={3.5}
//                     />
//                     <Blockies
//                         className="rounded-full stroke-white border-[2.5px] border-solid border-white ml-[-8px]"
//                         seed={Math.random()?.toString().toLowerCase() as string}
//                         scale={3.5}
//                     />
//                 </div>
//             </div>
//         </FormatedMessage>
//     </div>
// );

// const ChatMessage = () => {
//     const [showReplies, setShowReplies] = useState(false);

//     return (
//         <FormatedMessage
//             name="Beegoe"
//             time="23:53"
//             message=" Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
//         >
//             {!showReplies ? (
//                 <div
//                     className="rounded-13xl bg-mediumslateblue-300 flex flex-col p-4 items-center justify-center text-cyan cursor-pointer"
//                     onClick={() => {
//                         setShowReplies(!showReplies);
//                     }}
//                 >
//                     <div className="flex flex-row items-start justify-start">
//                         <div className="flex flex-row items-center justify-start gap-[8px]">
//                             <img className="relative w-6 h-6 overflow-hidden shrink-0" alt="" src="/chat.svg" />
//                             <p className="m-0 relative leading-[24px] uppercase">
//                                 <span>show replies</span>
//                                 <span className="text-gray">(2)</span>
//                             </p>
//                             <div className="flex flex-row items-start justify-start">
//                                 <Blockies
//                                     className="rounded-full stroke-white border-[2.5px] border-solid border-white"
//                                     seed={Math.random()?.toString().toLowerCase() as string}
//                                     scale={3.5}
//                                 />
//                                 <Blockies
//                                     className="rounded-full stroke-white border-[2.5px] border-solid border-white ml-[-8px]"
//                                     seed={Math.random()?.toString().toLowerCase() as string}
//                                     scale={3.5}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             ) : (
//                 <Reply />
//             )}
//         </FormatedMessage>
//     );
// };
