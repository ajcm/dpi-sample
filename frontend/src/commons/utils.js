
export const getDateToString = (date) => (new Date(date)).toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");