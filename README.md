# STM32 30日冲刺计划

一个可直接打卡的 STM32 学习工作台，覆盖 **2026 年 11 月 1 日至 12 月 5 日** 的完整安排。

## 在线访问

- Netlify：[nick-stm32-30-day-sprint.netlify.app](https://nick-stm32-30-day-sprint.netlify.app/)
- GitHub Pages：[nickjuddy323-commits.github.io/stm32-30-day-sprint](https://nickjuddy323-commits.github.io/stm32-30-day-sprint/)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/nickjuddy323-commits/stm32-30-day-sprint)

## 内容

- 30 个学习日 + 5 个缓冲日，共 35 个日期节点
- 江协科技标准库教程 18 天
- 铁头山羊 HAL/CubeMX 教程 7 天
- 数据采集终端综合项目 5 天
- 每日任务、硬性产出、三项自测与复盘笔记
- 浏览器本地保存打卡、自测、笔记和最终验收状态
- 标准库、HAL、项目和缓冲日筛选
- 桌面、平板和手机响应式布局

## 本地运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

## 数据保存

所有学习状态保存在当前浏览器的 `localStorage` 中，不会上传到服务器。

- `stm32-plan-tracker-v1`：每日打卡、自测和复盘笔记
- `stm32-plan-acceptance`：最终验收清单

更换浏览器或清除站点数据后，记录不会自动迁移。

## 课程参考

- [江协科技 STM32 入门教程](https://www.bilibili.com/video/BV1th411z7sn)
- [铁头山羊 STM32 HAL 入门教程](https://www.bilibili.com/video/BV1dQ4y1J7pD/)

本项目只整理学习顺序和任务，不包含两套课程的原始视频或配套资料。

## 部署

推送到 `main` 后，GitHub Actions 会构建 Vite 站点并发布到 GitHub Pages。项目根目录的 `netlify.toml` 也已配置好 Vite 构建目录，可直接用于 Netlify 持续部署。
