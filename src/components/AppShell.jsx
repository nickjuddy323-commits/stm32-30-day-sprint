import { useEffect, useState } from "react";
import AppIcon from "./AppIcon";
import { getPlanStatus } from "../lib/dates";

const navItems = [
  { id: "overview", label: "学习总览", icon: "overview" },
  { id: "plan", label: "30天计划", icon: "plan" },
  { id: "methods", label: "学习方法", icon: "method" },
  { id: "acceptance", label: "最终验收", icon: "target" },
];

export default function AppShell({
  view,
  onViewChange,
  selectedDay,
  completedStudy,
  children,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const planStatus = getPlanStatus();
  const currentNav = navItems.find((item) => item.id === view) ?? navItems[0];

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  function changeView(nextView) {
    onViewChange(nextView);
    setMenuOpen(false);
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">
        跳到主要内容
      </a>
      <aside className={`sidebar ${menuOpen ? "is-open" : ""}`}>
        <div className="brand-row">
          <span className="brand-mark">
            <AppIcon name="chip" size={25} />
          </span>
          <span>
            <strong>STM32</strong>
            <small>30日冲刺</small>
          </span>
          <button
            type="button"
            className="mobile-close"
            onClick={() => setMenuOpen(false)}
            aria-label="关闭导航"
          >
            <AppIcon name="close" size={20} />
          </button>
        </div>

        <div className="workspace-scope">
          <span>学习范围</span>
          <strong>F103C8T6 · 180 小时</strong>
        </div>

        <nav className="primary-nav" aria-label="主导航">
          {navItems.map((item) => (
            <button
              type="button"
              className={view === item.id ? "is-active" : ""}
              onClick={() => changeView(item.id)}
              aria-current={view === item.id ? "page" : undefined}
              key={item.id}
            >
              <AppIcon name={item.icon} size={17} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-foot">
          <div className="sidebar-progress">
            <span>课程进度</span>
            <strong>{completedStudy} / 30</strong>
          </div>
          <p>11.01 至 12.05</p>
          <p>30 个学习日 + 5 个缓冲日</p>
        </div>
      </aside>

      {menuOpen && (
        <button
          type="button"
          className="menu-scrim"
          aria-label="关闭导航"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <header className="topbar">
        <button
          type="button"
          className="menu-button"
          onClick={() => setMenuOpen(true)}
          aria-label="打开导航"
          aria-expanded={menuOpen}
        >
          <AppIcon name="menu" size={19} />
        </button>
        <div className="topbar-location">
          <span>STM32 冲刺</span>
          <i aria-hidden="true">/</i>
          <strong>{currentNav.label}</strong>
        </div>
        <div className="topbar-state">
          <span className={`plan-state ${planStatus.state}`}>
            {planStatus.label}
          </span>
          <span>
            当前 {selectedDay.id} · {completedStudy}/30 已完成
          </span>
        </div>
      </header>

      <main className="main-sheet" id="main-content">
        {children}
      </main>
    </div>
  );
}
