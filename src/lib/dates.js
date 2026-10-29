import { END_DATE, START_DATE } from "../data";

export function parseDate(isoDate) {
  const [year, month, day] = isoDate.split("-").map(Number);
  return new Date(year, month - 1, day, 12, 0, 0);
}

export function toISODate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatShortDate(isoDate) {
  const date = parseDate(isoDate);
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

export function formatLongDate(isoDate) {
  return new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(parseDate(isoDate));
}

export function getDefaultPlanDate(plan, now = new Date()) {
  const today = toISODate(now);
  const exact = plan.find((day) => day.date === today);
  if (exact) return exact.date;

  const firstPending = plan.find(
    (day) => day.kind === "study" && day.date >= today,
  );
  if (firstPending) return firstPending.date;
  return plan[0]?.date ?? START_DATE;
}

export function getPlanStatus(now = new Date()) {
  const today = parseDate(toISODate(now));
  const start = parseDate(START_DATE);
  const end = parseDate(END_DATE);
  const dayMs = 24 * 60 * 60 * 1000;

  if (today < start) {
    return {
      state: "before",
      label: `距开营 ${Math.ceil((start - today) / dayMs)} 天`,
    };
  }

  if (today > end) {
    return { state: "after", label: "计划已结束" };
  }

  return { state: "during", label: "计划进行中" };
}
