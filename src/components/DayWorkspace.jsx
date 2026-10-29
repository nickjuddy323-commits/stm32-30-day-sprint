import AppIcon from "./AppIcon";
import { formatLongDate } from "../lib/dates";
import { hardRules } from "../data";

export function DayTaskPanel({
  day,
  isComplete,
  testCount,
  onToggleComplete,
  onOpenPlan,
}) {
  const canComplete =
    day.kind === "buffer" || testCount >= 2 || isComplete;

  return (
    <section className="panel task-panel" aria-labelledby="today-title">
      <div className="panel-heading task-heading">
        <div>
          <p className="day-meta">
            {day.id} · {formatLongDate(day.date)} · {day.hours} 小时
          </p>
          <h2 id="today-title">{day.title}</h2>
          <p className="course-code">{day.course}</p>
        </div>
        <span
          className={`status-mark ${
            isComplete ? "is-complete" : day.kind === "buffer" ? "is-buffer" : ""
          }`}
        >
          {isComplete
            ? "已完成"
            : day.kind === "buffer"
              ? "缓冲日"
              : "待完成"}
        </span>
      </div>

      <div className="task-list-block">
        <h3>今天做什么</h3>
        <ul className="task-list">
          {day.tasks.map((task) => (
            <li key={task}>
              <span className="task-dot" aria-hidden="true" />
              <span>{task}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="output-block">
        <span>硬性产出</span>
        <p>{day.output}</p>
      </div>

      <div className="task-actions">
        <button
          type="button"
          className="button button-primary"
          onClick={() => onToggleComplete(day)}
          disabled={!canComplete}
        >
          {isComplete ? (
            "撤销本次打卡"
          ) : day.kind === "buffer" ? (
            "结束缓冲日"
          ) : (
            <>
              <AppIcon name="check" size={16} />
              完成今日任务
            </>
          )}
        </button>
        {onOpenPlan && (
          <button type="button" className="button button-ghost" onClick={onOpenPlan}>
            查看完整日程
            <AppIcon name="arrow" size={15} />
          </button>
        )}
      </div>

      {!canComplete && (
        <p className="action-note" aria-live="polite">
          至少完成 2 项自测，才算通过今天。
        </p>
      )}
    </section>
  );
}

export function DayCheckPanel({
  day,
  tests,
  note,
  isComplete,
  onToggleTest,
  onNoteChange,
  showRules = true,
}) {
  const testCount = tests.filter(Boolean).length;

  return (
    <aside className="panel check-panel" aria-labelledby="check-title">
      <div className="panel-heading compact">
        <div>
          <h2 id="check-title">{day.kind === "buffer" ? "复盘记录" : "今日自测"}</h2>
          <p>
            {day.kind === "buffer"
              ? "记录补课结果，收住进度。"
              : `${testCount} / ${day.tests.length} 项通过`}
          </p>
        </div>
        <span className="completion-count" aria-live="polite">
          {isComplete ? "已打卡" : "未打卡"}
        </span>
      </div>

      {day.kind === "study" ? (
        <fieldset className="self-tests">
          <legend className="sr-only">今日自测</legend>
          {day.tests.map((test, index) => (
            <label className="check-row" key={test}>
              <input
                type="checkbox"
                checked={Boolean(tests[index])}
                onChange={() => onToggleTest(day, index)}
              />
              <span className="custom-check" aria-hidden="true">
                <AppIcon name="check" size={13} />
              </span>
              <span>{test}</span>
            </label>
          ))}
        </fieldset>
      ) : (
        <div className="buffer-note">
          <p>
            缓冲日不学新外设。只补课、复盘或休息；状态正常时不额外加任务。
          </p>
        </div>
      )}

      <label className="note-field">
        <span>复盘笔记</span>
        <textarea
          value={note}
          onChange={(event) => onNoteChange(day, event.target.value)}
          placeholder="记录报错、原因、修复方法和明天第一件事…"
          rows={4}
        />
      </label>

      {showRules && (
        <div className="rule-snapshot">
          <h3>不能破的三条线</h3>
          <ul>
            {hardRules.slice(0, 3).map((rule) => (
              <li key={rule}>{rule}</li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
