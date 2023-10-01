// import type { NextPage } from "next";
// const FrontBots: NextPage = () => {
//   return (
//     <div
//       className="relative w-full h-auto pb-[37.5%]
// "
//     >
//       <Image width={800} height={800} loading="lazy"
//         className="absolute drop-shadow-2xl top-[9.5%] left-[56.3%] w-[43.9%] h-auto"
//         alt=""
//         src="/rightBot@2x.png" // rightBot@2x.png -> 3@2x.png
//       />
//       <Image width={800} height={800} loading="lazy"
//         className="absolute drop-shadow-2xl top-[22%] left-0 w-[37.8%] h-auto"
//         alt=""
//         src="/leftBot@2x.png" // leftBot@2x.png -> 2@2x.png
//       />
//       <Image width={800} height={800} loading="lazy"
//         className="absolute drop-shadow-2xl top-0 left-[11%] w-[78.3%] h-auto"
//         alt=""
//         src="/frontBot@2x.png" // frontBot@2x.png = 1@2x.png
//       />
//     </div>
//   );
// };
import Image from "next/image";
import frontBot from "../../public/images/bots/frontBot.png";
import leftBot from "../../public/images/bots/leftBot.png";
import rightBot from "../../public/images/bots/rightBot.png";
import type { NextPage } from "next";

const FrontBots: NextPage = () => {
    return (
        <div
            className="relative w-full h-auto pb-[130%] scale-[.95] 
"
        >
            <Image
                width={500}
                height={500}
                className="absolute drop-shadow-2xl top-[9.5%] left-[62.3%] w-[43.9%] h-auto"
                alt="Chain Warz Bot"
                src={rightBot}
                priority={true}
                placeholder="blur"
            />
            <Image
                width={500}
                height={500}
                className="absolute drop-shadow-2xl top-[15%] left-0  w-[43%] h-auto scale-125"
                alt="Chain Warz Bot"
                src={leftBot}
                priority={true}
                placeholder="blur"
            />
            <Image
                width={500}
                height={500}
                className="absolute drop-shadow-2xl top-0 left-[11%] w-[78.3%] h-auto"
                alt="Chain Warz Bot"
                src={frontBot}
                priority={true}
                placeholder="blur"
            />
        </div>
    );
};

export default FrontBots;
