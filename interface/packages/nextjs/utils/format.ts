export const formatEthereumAddress = (address: string) => {
    if (address == "You") return address;
    const prefix = address.slice(0, 6);
    const suffix = address.slice(-4);
    return `${prefix}....${suffix}`;
};

// function padWord(word: string, totalLength = 10, paddingChar = " "): string {
//     const wordLength = word.length;
//     const paddingLength = totalLength - wordLength;

//     if (paddingLength <= 0) {
//         return word; // No padding required if word length is greater than or equal to total length
//     }

//     const leftPaddingLength = Math.floor(paddingLength / 2);
//     const rightPaddingLength = Math.ceil(paddingLength / 2);

//     const leftPadding = paddingChar.repeat(leftPaddingLength);
//     const rightPadding = paddingChar.repeat(rightPaddingLength);

//     return leftPadding + word + rightPadding;
// }
