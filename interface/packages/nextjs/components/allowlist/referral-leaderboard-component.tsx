interface ILeaderboardComponent {
    position: string;
    referralCode: string;
    name: string;
    totalPoints: string;
    bg?: string;
}

function LeaderboardComponent({ position, referralCode, name, totalPoints, bg }: ILeaderboardComponent) {
    const width = "xl:w-[1200px] w-full";

    const formatEthereumAddress = (address: string) => {
        if (address == "You") return padWord(address);
        const prefix = address.slice(0, 6);
        const suffix = address.slice(-4);
        return `${prefix}....${suffix}`;
    };

    function padWord(word: string, totalLength = 10, paddingChar = " "): string {
        const wordLength = word.length;
        const paddingLength = totalLength - wordLength;

        if (paddingLength <= 0) {
            return word; // No padding required if word length is greater than or equal to total length
        }

        const leftPaddingLength = Math.floor(paddingLength / 2);
        const rightPaddingLength = Math.ceil(paddingLength / 2);

        const leftPadding = paddingChar.repeat(leftPaddingLength);
        const rightPadding = paddingChar.repeat(rightPaddingLength);

        return leftPadding + word + rightPadding;
    }

    return (
        <div className="w-full mx-4">
            <div
                className={`mx-auto ${width} flex items-center h-full text-center rounded-3xl primary-gradient-r p-[1px]`}
            >
                <div className={`${width} bg-black rounded-3xl`}>
                    <div
                        className={`mx-auto flex-row flex items-center rounded-3xl  justify-between w-full ${width} h-[74px] ${
                            bg ? bg : "bg-black"
                        } `}
                    >
                        <p className="flex-1 mx-auto text-white">{position}</p>
                        <p className="flex-1 mx-auto text-white">{`${formatEthereumAddress(name)}`}</p>
                        <p className="flex-1 mx-auto xl:p-56"></p>

                        <p
                            className="flex-1 mx-auto xl:pr-10 cursor-pointer text-cyan "
                            onClick={() => {
                                navigator.clipboard.writeText(referralCode);
                            }}
                        >
                            {referralCode}
                        </p>
                        <p className="flex-1 mx-auto ">{totalPoints}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LeaderboardComponent;
