/* eslint-disable  @typescript-eslint/no-var-requires */
import Image from "next/image";
import Button from "./Button";
import rgbDataURL from "~~/lib/rgbDataURL";

const EthBtn = ({
    name,
    imgName,
    callback,
    loading,
    disabled,
}: {
    name: string;
    imgName: string;
    callback?: () => void;
    loading?: boolean;
    disabled?: boolean;
}) => {
    return (
        <Button
            className="text-13xl py-6 px-[60px] justify-center max-w-[260px]"
            text={name}
            image={
                <Image
                    width={24}
                    height={24}
                    loading="lazy"
                    className="w-8 h-12"
                    alt=""
                    src={`${imgName}`}
                    placeholder="blur"
                    blurDataURL={rgbDataURL(130, 51, 255)}
                />
            }
            changeGap="gap-[6px]"
            loading={loading}
            onClick={callback}
            disabled={disabled}
        />
    );
};

export default EthBtn;
