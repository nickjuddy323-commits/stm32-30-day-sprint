import { formatShortDate, getPlanStatus } from "../lib/dates";
import { DayCheckPanel, DayTaskPanel } from "./DayWorkspace";
import ProgressPanel from "./ProgressPanel";

export default function Overview({
  plan,
  selectedDate,
  completed,
  progress,
  setProgress,
  onSelectDate,
  onOpenPlan,
  toggleComplete,
  toggleTest,
  updateNote,
}) {
  const day = plan.find((entry) => entry.date === selectedDate) ?? plan[0];
  const tests = progress.tests[day.date] ?? [];
  const note = progress.notes[day.date] ?? "";
  const isComplete = completed.includes(day.date);
  const planStatus = getPlanStatus();
  const testCount = tests.filter(Boolean).length;

  return (
    <div className="page overview-page">
      <header className="page-header">
        <div>
          <h1>学习总览</h1>
          <p>
            11月1日至12月5日 · 30 个学习日 · 5 个缓冲日
            {planStatus.state === "before" ? ` · ${planStatus.label}` : ""}
          </p>
        </div>
        <div className="page-header-meta">
          <span>当前选择</span>
          <strong>
            {day.id} · {formatShortDate(day.date)}
          </strong>
        </div>
      </header>

      <ProgressPanel
        plan={plan}
        completed={completed}
        selectedDate={selectedDate}
        onSelect={onSelectDate}
      />

      <div className="today-grid">
        <DayTaskPanel
          day={day}
          isComplete={isComplete}
          testCount={testCount}
          onToggleComplete={toggleComplete}
          onOpenPlan={onOpenPlan}
        />
        <DayCheckPanel
          day={day}
          tests={tests}
          note={note}
          isComplete={isComplete}
          onToggleTest={toggleTest}
          onNoteChange={updateNote}
        />
      </div>

      <section className="next-checkpoints" aria-labelledby="checkpoints-title">
        <div className="section-title-row">
          <h2 id="checkpoints-title">接下来三个关口</h2>
          <p>没过检查点，就用最近的缓冲日补课。</p>
        </div>
        <ol className="checkpoint-list">
          {plan
            .filter((entry) => ["R1", "R2", "R3", "R4", "R5"].includes(entry.id))
            .map((entry) => {
              const done = completed.includes(entry.date);
              return (
                <li key={entry.id} className={done ? "is-done" : ""}>
                  <button type="button" onClick={() => onSelectDate(entry.date)}>
                    <span className="checkpoint-date">
                      {formatShortDate(entry.date)}
                    </span>
                    <span className="checkpoint-copy">
                      <strong>{entry.title}</strong>
                      <span>{entry.output}</span>
                    </span>
                    <span className="checkpoint-state">
                      {done ? "已完成" : entry.id}
                    </span>
                  </button>
                </li>
              );
            })}
        </ol>
      </section>
    </div>
  );
}
