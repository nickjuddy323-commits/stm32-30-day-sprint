import { useEffect, useState } from "react";
import { finalCriteria, projectScope } from "../data";
import AppIcon from "./AppIcon";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function AcceptancePage() {
  const [checked, setChecked] = useLocalStorage("stm32-plan-acceptance", []);
  const [savedAt, setSavedAt] = useState("");

  useEffect(() => {
    if (checked.length > 0) {
      setSavedAt("已自动保存");
    }
  }, [checked]);

  function toggle(index) {
    setChecked((current) =>
      current.includes(index)
        ? current.filter((value) => value !== index)
        : [...current, index],
    );
  }

  const percent = Math.round((checked.length / finalCriteria.length) * 100);

  return (
    <div className="page acceptance-page">
      <header className="page-header">
        <div>
          <h1>最终验收</h1>
          <p>12月5日前完成这些标准，才叫真正学完，而不是跟完两套视频。</p>
        </div>
        <div className="page-header-meta">
          <span>验收进度</span>
          <strong>{checked.length} / {finalCriteria.length}</strong>
        </div>
      </header>

      <section className="acceptance-lead" aria-labelledby="acceptance-list-title">
        <div className="acceptance-progress">
          <div>
            <h2 id="acceptance-list-title">独立完成能力</h2>
            <p>勾选前先做一次空白重建或口述，不接受“看懂了”。</p>
          </div>
          <strong>{percent}%</strong>
          <div className="progress-track" aria-hidden="true">
            <span style={{ width: `${percent}%` }} />
          </div>
        </div>
        <fieldset className="acceptance-list">
          <legend className="sr-only">最终验收标准</legend>
          {finalCriteria.map((criterion, index) => (
            <label className="acceptance-row" key={criterion}>
              <input
                type="checkbox"
                checked={checked.includes(index)}
                onChange={() => toggle(index)}
              />
              <span className="custom-check" aria-hidden="true">
                <AppIcon name="check" size={13} />
              </span>
              <span>{criterion}</span>
            </label>
          ))}
        </fieldset>
        <p className="save-stamp" aria-live="polite">
          {savedAt || "勾选结果保存在当前浏览器"}
        </p>
      </section>

      <section className="project-scope" aria-labelledby="scope-title">
        <div>
          <h2 id="scope-title">综合项目 MVP</h2>
          <p>
            固定做“数据采集与参数存储终端”。MVP 通过前，不增加 PID、RTOS、蓝牙和文件系统。
          </p>
        </div>
        <ul>
          {projectScope.map((item) => (
            <li key={item}>
              <AppIcon name="check" size={15} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="portfolio-close" aria-labelledby="portfolio-title">
        <h2 id="portfolio-title">最后交付</h2>
        <p>
          README、接线图、串口协议、演示视频和调试记录。让别人能照着文档复现，比再加一个外设更能证明你掌握了。
        </p>
      </section>
    </div>
  );
}
