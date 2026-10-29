import { useMemo, useState } from "react";
import AppShell from "./components/AppShell";
import Overview from "./components/Overview";
import PlanPage from "./components/PlanPage";
import MethodsPage from "./components/MethodsPage";
import AcceptancePage from "./components/AcceptancePage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getDefaultPlanDate } from "./lib/dates";
import { plan } from "./data";

const initialProgress = {
  completed: [],
  tests: {},
  notes: {},
  selectedDate: null,
};

export default function App() {
  const [view, setView] = useState("overview");
  const [progress, setProgress] = useLocalStorage(
    "stm32-plan-tracker-v1",
    initialProgress,
  );

  const selectedDate =
    progress.selectedDate ?? getDefaultPlanDate(plan, new Date());
  const selectedDay =
    plan.find((day) => day.date === selectedDate) ?? plan[0];
  const completed = progress.completed ?? [];
  const completedStudy = useMemo(
    () =>
      plan.filter(
        (day) => day.kind === "study" && completed.includes(day.date),
      ).length,
    [completed],
  );

  function selectDate(date) {
    setProgress((current) => ({ ...current, selectedDate: date }));
  }

  function toggleComplete(day) {
    const isComplete = completed.includes(day.date);
    const dayTests = progress.tests[day.date] ?? [];
    const testCount = dayTests.filter(Boolean).length;

    if (!isComplete && day.kind === "study" && testCount < 2) {
      return;
    }

    setProgress((current) => {
      const currentCompleted = current.completed ?? [];
      return {
        ...current,
        completed: currentCompleted.includes(day.date)
          ? currentCompleted.filter((date) => date !== day.date)
          : [...currentCompleted, day.date],
      };
    });
  }

  function toggleTest(day, index) {
    setProgress((current) => {
      const currentTests = current.tests[day.date] ?? [];
      const nextTests = day.tests.map((_, testIndex) =>
        testIndex === index ? !currentTests[testIndex] : Boolean(currentTests[testIndex]),
      );
      return {
        ...current,
        tests: {
          ...current.tests,
          [day.date]: nextTests,
        },
      };
    });
  }

  function updateNote(day, note) {
    setProgress((current) => ({
      ...current,
      notes: {
        ...current.notes,
        [day.date]: note,
      },
    }));
  }

  return (
    <AppShell
      view={view}
      onViewChange={setView}
      selectedDay={selectedDay}
      completedStudy={completedStudy}
    >
      {view === "overview" && (
        <Overview
          plan={plan}
          selectedDate={selectedDate}
          completed={completed}
          progress={progress}
          setProgress={setProgress}
          onSelectDate={selectDate}
          onOpenPlan={() => setView("plan")}
          toggleComplete={toggleComplete}
          toggleTest={toggleTest}
          updateNote={updateNote}
        />
      )}
      {view === "plan" && (
        <PlanPage
          plan={plan}
          selectedDate={selectedDate}
          completed={completed}
          progress={progress}
          onSelectDate={selectDate}
          toggleComplete={toggleComplete}
          toggleTest={toggleTest}
          updateNote={updateNote}
        />
      )}
      {view === "methods" && <MethodsPage />}
      {view === "acceptance" && <AcceptancePage />}
    </AppShell>
  );
}
