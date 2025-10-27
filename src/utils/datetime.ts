export const formatDuration = (duration: number): string => {
    const hours = Math.floor(Math.max(duration, 0) / 3600);
    const minutes = Math.floor((Math.max(duration, 0) % 3600) / 60);
    const seconds = Math.floor(Math.max(duration, 0) % 60);

    const pad = (n: number) => n.toString().padStart(2, "0");

    return hours > 0
        ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
        : `${pad(minutes)}:${pad(seconds)}`;
};

export const tripDate = (date: Date) => {
    let formatted = date.toLocaleDateString("es-ES", {
        month: "long",
        year: "numeric"
    });

    formatted = formatted.replace(" de ", " ");
    formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    return formatted;
};

export const timeAgo = (date: Date) => {
    const diff = Date.now() - date.getTime();
    const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

    const seconds = Math.round(diff / 1000);
    if (seconds < 60) {
        return rtf.format(-seconds, "second");
    }

    const minutes = Math.round(seconds / 60);
    if (minutes < 60) {
        return rtf.format(-minutes, "minute");
    }

    const hours = Math.round(minutes / 60);
    if (hours < 24) {
        return rtf.format(-hours, "hour");
    }

    const days = Math.round(hours / 24);
    if (days < 30) {
        return rtf.format(-days, "day");
    }

    const months = Math.round(days / 30);
    if (months < 12) {
        return rtf.format(-months, "month");
    }

    const years = Math.round(days / 365);
    return rtf.format(-years, "year");
};
