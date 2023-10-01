export default function truncateAddressForUsername(address: string): string {
    if (!address) return "";
    const truncatedAddr = address.slice(0, 8).toLowerCase();
    return truncatedAddr;
}
