import { parseDate } from "../lib/dates";

function getDayNumber(day) {
  return parseDate(day.date).getDate();
}

export default function DayStrip({
  plan,
  selectedDate,
  completed,
  onSelect,
}) {
  return (
    <div className="day-strip-wrap">
      <div className="day-strip" role="group" aria-label="35 天计划时间轴">
        {plan.map((day) => {
          const isComplete = completed.includes(day.date);
          const isSelected = selectedDate === day.date;
          const classes = [
            "day-cell",
            day.kind === "buffer" ? "is-buffer" : "",
            isComplete ? "is-complete" : "",
            isSelected ? "is-selected" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              type="button"
              className={classes}
              key={day.id}
              onClick={() => onSelect(day.date)}
              aria-pressed={isSelected}
              aria-label={`${day.id}，${day.date}，${day.title}${
                isComplete ? "，已完成" : "，未完成"
              }`}
              title={`${day.id} · ${day.title}`}
            >
              <span className="day-code">{day.id}</span>
              <span className="day-number">{getDayNumber(day)}</span>
              {isComplete && (
                <span className="day-complete-mark" aria-hidden="true" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
