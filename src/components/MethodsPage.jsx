import { hardRules, learningLoop } from "../data";
import AppIcon from "./AppIcon";

export default function MethodsPage() {
  return (
    <div className="page methods-page">
      <header className="page-header">
        <div>
          <h1>学习方法</h1>
          <p>看会不等于会写。每天的任务，以关掉视频后能独立完成作为结束。</p>
        </div>
        <div className="page-header-meta rule-count">
          <span>不可妥协</span>
          <strong>{hardRules.length} 条硬规则</strong>
        </div>
      </header>

      <section className="method-section" aria-labelledby="learning-loop-title">
        <div className="section-title-row">
          <h2 id="learning-loop-title">每天怎么学</h2>
          <p>六步形成一个闭环，第二天从回忆开始，而不是从继续播放开始。</p>
        </div>
        <ol className="method-list">
          {learningLoop.map((item, index) => (
            <li key={item.title}>
              <span className="method-index" aria-hidden="true">
                {index + 1}
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="rules-section" aria-labelledby="hard-rules-title">
        <div className="section-title-row">
          <h2 id="hard-rules-title">硬性规则</h2>
          <p>状态差时可以少做选修，但这 14 条不能靠“明天补回来”绕过。</p>
        </div>
        <ol className="hard-rule-list">
          {hardRules.map((rule, index) => (
            <li key={rule}>
              <span>{index + 1}</span>
              <p>{rule}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="debug-section" aria-labelledby="debug-title">
        <div className="debug-copy">
          <h2 id="debug-title">调试日志模板</h2>
          <p>
            卡住时不要继续试运气。每次只改一个变量，让下一次实验能推翻一个明确假设。
          </p>
        </div>
        <pre>
          <code>{`现象：串口没有输出
假设：USART 时钟没有开启
实验：检查 RCC 时钟树和 USART1 时钟位
结果：开时钟并重新初始化后恢复
结论：初始化顺序对，但漏开外设时钟`}</code>
        </pre>
        <div className="debug-outcome">
          <AppIcon name="check" size={18} />
          <span>完成标准：问题被隔离、原因可解释、修复可复现。</span>
        </div>
      </section>
    </div>
  );
}
