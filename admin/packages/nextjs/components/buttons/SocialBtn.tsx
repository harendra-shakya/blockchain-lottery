/* eslint-disable  @typescript-eslint/no-var-requires */
import Image from "next/image";
import Button from "./Button";
import rgbDataURL from "~~/lib/rgbDataURL";

const SocialBtn = ({ name, imgName, callback }: { name: string; imgName: string; callback: () => void }) => {
    return (
        <Button
            className="lg:w-[331px] w-[295px] text-13xl py-6 px-[60px] justify-center"
            text={name}
            image={
                <Image
                    width={24}
                    height={24}
                    loading="lazy"
                    className="w-12 h-12 shrink-0 overflow-hidden"
                    alt=""
                    src={`${imgName}`}
                    placeholder="blur"
                    blurDataURL={rgbDataURL(130, 51, 255)}
                />
            }
            onClick={callback}
        />
    );
};

export default SocialBtn;
