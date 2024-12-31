export const formatCurrency = (amount: number, currency: string = "USD"): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount);
};

export const formatDate = (date: string, format: string = "MMM DD, YYYY h:mm A"): string => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options);
};
