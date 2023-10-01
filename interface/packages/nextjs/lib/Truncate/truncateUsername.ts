export default function truncateUsername(word: string): string {
    if (word.length > 13) {
        return word.slice(0, 4) + "...." + word.slice(-5);
    }
    return word;
}
