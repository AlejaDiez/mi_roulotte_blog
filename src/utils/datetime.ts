export const formatDuration = (duration: number): string => {
    const hours = Math.floor(Math.max(duration, 0) / 3600);
    const minutes = Math.floor((Math.max(duration, 0) % 3600) / 60);
    const seconds = Math.floor(Math.max(duration, 0) % 60);

    const pad = (n: number) => n.toString().padStart(2, "0");

    return hours > 0
        ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
        : `${pad(minutes)}:${pad(seconds)}`;
};
