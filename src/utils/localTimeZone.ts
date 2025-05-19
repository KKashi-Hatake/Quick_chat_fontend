

export const localTimeZone = (date: string) => {
    const incomingDate = new Date(date);
    if (isNaN(incomingDate.getTime()) && date !== incomingDate.toISOString()) {
        console.error("Invalid ISO date string");
        return null;
    }

    return incomingDate.toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
}