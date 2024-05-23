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
