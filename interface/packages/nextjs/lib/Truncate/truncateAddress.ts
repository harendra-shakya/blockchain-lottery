export default function truncateAddress(address: string): string {
    if (address == "You") return address;
    const prefix = address.slice(0, 6);
    const suffix = address.slice(-4);
    return `${prefix}....${suffix}`;
}
