/* eslint-disable  @typescript-eslint/no-var-requires */
import Image from "next/image";
import Button from "./Button";
import rgbDataURL from "~~/lib/rgbDataURL";

interface IShareOnTwitterButton {
    btnText: string;
    _tweetText: string;
    _tweetUrl?: string;
    _tweetHashtags?: string;
    className?: string;
    loading?: boolean;
}

function ShareOnTwitterButton({
    btnText,
    _tweetText,
    _tweetUrl,
    _tweetHashtags,
    className = "",
    loading,
}: IShareOnTwitterButton) {
    const tweet = () => {
        const url = `https://twitter.com/intent/tweet?text=${_tweetText}&url=${_tweetUrl}&hashtags=${_tweetHashtags}`;
        window.open(url);
    };

    return (
        <Button
            text={btnText}
            className={className}
            image={
                <Image
                    width={24}
                    height={24}
                    className="w-10 h-10 md:w-12 md:h-12 shrink-0 overflow-hidden"
                    alt=""
                    loading="lazy"
                    src="/icons/twitter/twitterGradient.svg"
                    placeholder="blur"
                    blurDataURL={rgbDataURL(130, 51, 255)}
                />
            }
            onClick={tweet}
            loading={loading}
        />
    );
}

export default ShareOnTwitterButton;
