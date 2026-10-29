import DayStrip from "./DayStrip";

export default function ProgressPanel({
  plan,
  completed,
  selectedDate,
  onSelect,
}) {
  const studyDays = plan.filter((day) => day.kind === "study");
  const bufferDays = plan.filter((day) => day.kind === "buffer");
  const completedStudy = studyDays.filter((day) =>
    completed.includes(day.date),
  ).length;
  const completedBuffer = bufferDays.filter((day) =>
    completed.includes(day.date),
  ).length;
  const percent = Math.round((completedStudy / studyDays.length) * 100);
  const nextStudy = studyDays.find((day) => !completed.includes(day.date));

  return (
    <section className="panel progress-panel" aria-labelledby="progress-title">
      <div className="panel-heading">
        <div>
          <h2 id="progress-title">计划推进</h2>
          <p>
            {nextStudy
              ? `下一个硬任务：${nextStudy.id} · ${nextStudy.title}`
              : "30 个学习日已经全部完成"}
          </p>
        </div>
        <div className="progress-total" aria-label={`已完成 ${percent}%`}>
          <strong>{completedStudy}</strong>
          <span>/ {studyDays.length} 学习日</span>
        </div>
      </div>

      <div
        className="progress-track"
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={percent}
        aria-label="学习进度"
      >
        <span style={{ width: `${percent}%` }} />
      </div>

      <div className="progress-meta">
        <span>{percent}% 已完成</span>
        <span>{completedBuffer} / 5 缓冲日已使用</span>
        <span>30 学习日 × 6 小时 = 180 小时</span>
      </div>

      <DayStrip
        plan={plan}
        selectedDate={selectedDate}
        completed={completed}
        onSelect={onSelect}
      />

      <div className="legend-row" aria-label="图例">
        <span>
          <i className="legend-mark is-study" aria-hidden="true" />
          学习日
        </span>
        <span>
          <i className="legend-mark is-buffer" aria-hidden="true" />
          缓冲日
        </span>
        <span>
          <i className="legend-mark is-done" aria-hidden="true" />
          已完成
        </span>
      </div>
    </section>
  );
}
