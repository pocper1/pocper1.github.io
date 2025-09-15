# 黃鉦鈞 個人網站

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://pocper1.github.io)
[![Jekyll](https://img.shields.io/badge/Jekyll-4.x-blue)](https://jekyllrb.com/)
[![Minimal Mistakes](https://img.shields.io/badge/Theme-Minimal%20Mistakes-red)](https://mmistakes.github.io/minimal-mistakes/)

歡迎來到我的個人網站！這是使用 Jekyll 和 Minimal Mistakes 主題建置的技術部落格。

🌐 **網站連結：** https://pocper1.github.io

## 📝 關於我

嗨，我是來自台灣的開發者黃鉦鈞。歡迎來到我的網站！我在這裡分享技術、生活與想法。

- 📍 位置：台灣
- 📧 聯絡信箱：pocper1@gmail.com
- 💻 GitHub：[@pocper1](https://github.com/pocper1)

## 🛠 技術架構

- **靜態網站生成器：** Jekyll 4.x
- **主題：** [Minimal Mistakes](https://mmistakes.github.io/minimal-mistakes/)
- **託管平台：** GitHub Pages
- **評論系統：** Giscus
- **語言：** 繁體中文 (zh-TW)

## 🚀 本地開發

### 環境需求

- Ruby (建議使用 Ruby 2.7+)
- Bundler
- Jekyll

### 安裝與執行

1. 複製專案到本地
```bash
git clone https://github.com/pocper1/pocper1.github.io.git
cd pocper1.github.io
```

2. 安裝相依套件
```bash
bundle install
```

3. 啟動本地開發伺服器
```bash
bundle exec jekyll serve
```

4. 在瀏覽器開啟 http://localhost:4000 查看網站

### 開發指令

- `bundle exec jekyll serve` - 啟動開發伺服器
- `bundle exec jekyll build` - 建置網站
- `bundle exec jekyll serve --livereload` - 啟動自動重載功能

## 📁 專案結構

```
├── _config.yml          # 網站設定檔
├── _data/              # 資料檔案
│   ├── navigation.yml  # 導覽選單設定
│   └── authors.yml     # 作者資訊
├── _includes/          # 重複使用的模板片段
├── _layouts/           # 頁面版型
├── _pages/             # 靜態頁面
│   ├── about.md        # 關於我
│   └── contact.md      # 聯絡資訊
├── _posts/             # 文章目錄
├── _sass/              # Sass 樣式檔案
├── assets/             # 靜態資源
│   ├── css/
│   ├── images/
│   └── js/
└── index.html          # 首頁
```

## ✍️ 發佈新文章

在 `_posts/` 目錄下建立新的 Markdown 檔案，檔名格式為 `YYYY-MM-DD-title.md`：

```markdown
---
title: "文章標題"
date: 2025-09-10
categories: [分類1, 分類2]
tags: [標籤1, 標籤2]
---

文章內容...
```

## 🎨 自訂設定

主要設定都在 `_config.yml` 中：

- **網站資訊：** 標題、描述、作者資訊
- **外觀主題：** Minimal Mistakes 皮膚
- **功能設定：** 評論系統、搜尋、分析工具
- **社群連結：** GitHub、Email 等聯絡方式

## 💬 評論系統

使用 [Giscus](https://giscus.app/) 作為評論系統，基於 GitHub Discussions。

## 📊 功能特色

- ✅ 響應式設計，支援行動裝置
- ✅ 內建搜尋功能
- ✅ 文章分類和標籤系統
- ✅ 社群分享按鈕
- ✅ 相關文章推薦
- ✅ 程式碼高亮顯示
- ✅ 評論互動系統
- ✅ SEO 最佳化

## 📄 授權條款

本專案採用 MIT 授權條款。詳細內容請參閱 [LICENSE](LICENSE) 檔案。

---

⭐ 如果你喜歡這個網站，歡迎給個 Star！

💌 有任何問題或建議，歡迎透過 [Issues](https://github.com/pocper1/pocper1.github.io/issues) 或 [Email](mailto:pocper1@gmail.com) 聯繫我。