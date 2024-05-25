export function formatTimer(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const minutesString = minutes < 10 ? '0' + minutes : minutes.toString();
    const secondsString =
        remainingSeconds < 10
            ? '0' + remainingSeconds
            : remainingSeconds.toString();

    return `${minutesString}:${secondsString}`;
}

export function formatUnixTimestamp(unixTimestamp: number): string {
    // Create a new Date object from the Unix timestamp (in milliseconds)
    const date = new Date(unixTimestamp * 1000);

    // Extract the day, month, and year
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Months are zero-based
    const year = date.getUTCFullYear();

    // Format the day and month to ensure they are two digits (e.g., "01" instead of "1")
    const dayStr = day < 10 ? `0${day}` : day.toString();
    const monthStr = month < 10 ? `0${month}` : month.toString();

    // Return the formatted date string
    return `${dayStr} / ${monthStr} / ${year}`;
}
