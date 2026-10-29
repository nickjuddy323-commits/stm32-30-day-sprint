import { useMemo, useState } from "react";
import { formatShortDate } from "../lib/dates";
import { tracks } from "../data";
import { DayCheckPanel, DayTaskPanel } from "./DayWorkspace";

const filters = [
  { id: "all", label: "全部 35 天" },
  { id: "standard", label: "标准库 18 天" },
  { id: "hal", label: "HAL 7 天" },
  { id: "project", label: "项目 5 天" },
  { id: "buffer", label: "缓冲 5 天" },
];

export default function PlanPage({
  plan,
  selectedDate,
  completed,
  progress,
  onSelectDate,
  toggleComplete,
  toggleTest,
  updateNote,
}) {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const filteredPlan = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return plan.filter((day) => {
      const matchesFilter = filter === "all" || day.track === filter;
      const matchesQuery =
        !normalizedQuery ||
        [
          day.id,
          day.title,
          day.course,
          day.output,
          ...day.tasks,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesFilter && matchesQuery;
    });
  }, [filter, plan, query]);

  const day = plan.find((entry) => entry.date === selectedDate) ?? plan[0];
  const tests = progress.tests[day.date] ?? [];
  const note = progress.notes[day.date] ?? "";
  const isComplete = completed.includes(day.date);
  const testCount = tests.filter(Boolean).length;
  const studyCompleted = plan.filter(
    (entry) =>
      entry.kind === "study" && completed.includes(entry.date),
  ).length;

  return (
    <div className="page plan-page">
      <header className="page-header">
        <div>
          <h1>30天计划</h1>
          <p>33 个教程日、2 个固定检查点，外加 5 个可追进度的缓冲日。</p>
        </div>
        <div className="page-header-meta">
          <span>学习日完成</span>
          <strong>{studyCompleted} / 30</strong>
        </div>
      </header>

      <div className="filter-bar" aria-label="计划筛选">
        <div className="filter-tabs" role="group" aria-label="课程分类">
          {filters.map((item) => (
            <button
              type="button"
              aria-pressed={filter === item.id}
              className={filter === item.id ? "is-active" : ""}
              onClick={() => setFilter(item.id)}
              key={item.id}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="search-field">
          <span className="sr-only">搜索任务</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索外设、任务或命令"
          />
        </label>
      </div>

      <div className="plan-layout">
        <section className="plan-list-panel" aria-labelledby="plan-list-title">
          <div className="plan-list-heading">
            <h2 id="plan-list-title">日期与任务</h2>
            <span>{filteredPlan.length} 个节点</span>
          </div>
          <div className="plan-table-head" aria-hidden="true">
            <span>日期</span>
            <span>课程</span>
            <span>任务</span>
            <span>状态</span>
          </div>
          <div className="plan-rows">
            {filteredPlan.map((entry) => {
              const isDone = completed.includes(entry.date);
              const isSelected = entry.date === selectedDate;
              return (
                <button
                  type="button"
                  className={`plan-row ${isSelected ? "is-selected" : ""}`}
                  onClick={() => onSelectDate(entry.date)}
                  aria-pressed={isSelected}
                  key={entry.id}
                >
                  <span className="plan-date">
                    <strong>{entry.id}</strong>
                    <span>{formatShortDate(entry.date)}</span>
                  </span>
                  <span className="plan-track">
                    {tracks.find((track) => track.id === entry.track)?.short}
                  </span>
                  <span className="plan-task">
                    <strong>{entry.title}</strong>
                    <span>{entry.course}</span>
                  </span>
                  <span
                    className={`row-state ${isDone ? "is-done" : ""} ${
                      entry.kind === "buffer" ? "is-buffer" : ""
                    }`}
                  >
                    {isDone
                      ? "已完成"
                      : entry.kind === "buffer"
                        ? "缓冲"
                        : "待学"}
                  </span>
                </button>
              );
            })}
            {filteredPlan.length === 0 && (
              <p className="empty-state">没有匹配的任务，换一个关键词试试。</p>
            )}
          </div>
        </section>

        <div className="plan-detail">
          <DayTaskPanel
            day={day}
            isComplete={isComplete}
            testCount={testCount}
            onToggleComplete={toggleComplete}
          />
          <DayCheckPanel
            day={day}
            tests={tests}
            note={note}
            isComplete={isComplete}
            onToggleTest={toggleTest}
            onNoteChange={updateNote}
            showRules={false}
          />
        </div>
      </div>
    </div>
  );
}
