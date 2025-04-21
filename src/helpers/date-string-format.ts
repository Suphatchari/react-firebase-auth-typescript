/**
 *
 * @param dateStr Date string.
 * @returns Date string with the format "DD MMM YYYY hh:mm"
 */
export const getDateWithTimeTHString = (dateStr: string) => {
  return dateStr
    ? new Date(dateStr).toLocaleString("th-TH", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";
};

/**
 *
 * @param dateStr Date string.
 * @returns Date string with the format "DDD, DD MMM YYYY - hh:mm"
 */
export const getDateWithTimeString = (dateStr: string) => {
  const date = new Date(dateStr);
  const dateformatStr = `${date.toLocaleDateString("en-GB", {
    weekday: "short",
  })}, ${date.toLocaleDateString("en-GB", { day: "2-digit" })} ${date
    .toLocaleDateString("en-GB", {
      month: "short",
    })
    .toUpperCase()} ${date.toLocaleDateString("en-GB", {
    year: "numeric",
  })} - ${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
  return dateformatStr;
};

/**
 *
 * @param dateStr Date string.
 * @returns Date string with the format "DDD, DD MMM YYYY"
 */
export const getOnlyDateString = (dateStr: string) => {
  const date = new Date(dateStr);

  const dateformatStr = `${date.toLocaleDateString("en-GB", {
    weekday: "short",
  })}, ${date.toLocaleDateString("en-GB", {
    day: "2-digit",
  })} ${date.toLocaleDateString("en-GB", {
    month: "short",
  })} ${date.toLocaleDateString("en-GB", {
    year: "numeric",
  })}`;
  return dateformatStr;
};

/**
 *
 * @param dateStr Date string.
 * @returns Time string with the format "hh:mm"
 */
export const getOnlyTimeString = (dateStr: string) => {
  const date = new Date(dateStr);
  const dateformatStr = `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
  return dateformatStr;
};
