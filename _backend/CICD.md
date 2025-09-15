---
title: CI/CD
layout: collection
permalink: /backend/cicd/
collection: backend
category: backend
tags:
  - backend
  - cicd
---

## 概述

CI/CD 是現代軟體開發的核心實踐，旨在透過自動化來加速軟體的交付速度、提升品質並降低風險。它串連了從程式碼提交到部署上線的整個流程。

-   **適用場景**: 所有希望實現快速迭代、可靠交付的軟體專案。
-   **前提條件**: 熟悉 Git 版本控制和基本的軟體開發流程。
-   **預期結果**: 理解 CI/CD 的核心概念，並能夠設計和實施基本的自動化交付流程。

---

## 核心概念

### 1. 持續整合 (Continuous Integration, CI)

CI 是一種開發實踐，要求開發人員頻繁地將程式碼變更合併到共享的主幹（main/master 分支）。

-   **核心目標**: 及早發現整合錯誤。
-   **關鍵活動**:
    -   **自動化建構 (Automated Build)**: 程式碼提交後自動編譯、打包。
    -   **自動化測試 (Automated Testing)**: 自動執行單元測試、整合測試等。
    -   **頻繁合併**: 開發者每天至少合併一次工作成果。

**CI 的價值在於，它讓「整合」這個步驟從一個充滿痛苦和不確定性的階段性任務，變成了一個日常的、無痛的、自動化的流程。**

### 2. 持續交付 (Continuous Delivery, CD)

持續交付是持續整合的自然延伸。它確保任何通過自動化測試的程式碼變更，都能夠**隨時被部署**到生產環境。

-   **核心目標**: 確保軟體永遠處於「可發布」狀態。
-   **關鍵活動**:
    -   將通過 CI 的產出物（Artifacts）自動部署到一個或多個測試環境（如 Staging）。
    -   進行更全面的自動化測試（如端對端測試、效能測試）。
    -   **生產環境的部署是手動觸發的**。這一步通常由產品負責人或團隊領導決定，是一個業務決策，而非技術決策。

### 3. 持續部署 (Continuous Deployment, CD)

持續部署是自動化的極致形式。它將持續交付的最後一個手動步驟也自動化了。

-   **核心目標**: 自動化整個發布流程。
-   **關鍵活動**:
    -   任何通過所有自動化測試的變更，都會**自動地、立即地**部署到生產環境。
    -   **無需任何手動干預**。

**CI → 持續交付 → 持續部署，是自動化程度不斷遞進的三個階段。**

| 比較           | 持續整合 (CI)       | 持續交付 (Delivery)   | 持續部署 (Deployment)  |
| :------------- | :------------------ | :-------------------- | :--------------------- |
| **目標**       | 快速發現整合問題    | 隨時可發布            | 自動化發布             |
| **自動化範圍** | 建構、單元/整合測試 | CI + 部署到類生產環境 | 整個流程，直到生產環境 |
| **生產部署**   | 手動                | **手動點擊按鈕**      | **自動觸發**           |

---

## CI/CD 管線 (Pipeline) 設計

一個典型的 CI/CD 管線包含以下階段：

**Source → Build → Test → Deploy → Monitor**

### 1. Source Stage (原始碼階段)

-   **觸發**: 開發者推送 (push) 程式碼到 Git 倉庫，或發起合併請求 (Merge Request)。
-   **最佳實踐**: 使用功能分支（Feature Branch），並透過 Pull Request / Merge Request 進行程式碼審查 (Code Review)。

### 2. Build Stage (建構階段)

-   **活動**: 編譯程式碼、處理依賴、打包應用程式。
-   **產出物 (Artifacts)**: Docker 映像檔、JAR 檔、二進制執行檔等。
-   **範例**: `docker build -t my-app:latest .`

### 3. Test Stage (測試階段)

-   **活動**: 執行不同層次的自動化測試，確保程式碼品質。
    -   **靜態分析 (Static Analysis)**: 檢查程式碼風格、潛在 Bug (e.g., ESLint, RuboCop)。
    -   **單元測試 (Unit Tests)**: 驗證獨立的函式或類別。
    -   **整合測試 (Integration Tests)**: 驗證模組間的互動。
    -   **安全性掃描 (Security Scanning)**: 檢查已知的安全漏洞。

### 4. Deploy Stage (部署階段)

將建構好的產出物部署到目標環境。部署策略至關重要。

-   **滾動部署 (Rolling Deployment)**: 逐一更新服務實例。實現簡單，但有短暫的新舊版本並存狀態。
-   **藍綠部署 (Blue-Green Deployment)**: 準備兩套完全相同的環境（藍色和綠色）。流量一次性從舊環境切換到新環境。優點是切換快、回滾容易；缺點是需要雙倍資源。
-   **金絲雀部署 (Canary Deployment)**: 先將少量流量（例如 5%）切換到新版本，觀察一段時間。如果沒有問題，再逐步擴大流量比例。這是風險最低的發布策略。

### 範例：GitHub Actions CI 設定

```yaml
# .github/workflows/ci.yml
name: CI Pipeline

on:
    push:
        branches: [main]
    pull_request:
        branches: [main]

jobs:
    build-and-test:
        runs-on: ubuntu-latest
        steps:
            - name: Checkout code
              uses: actions/checkout@v3

            - name: Set up Node.js
              uses: actions/setup-node@v3
              with:
                  node-version: "18"

            - name: Install dependencies
              run: npm install

            - name: Run linting
              run: npm run lint

            - name: Run unit tests
              run: npm test

            - name: Build Docker image
              if: github.ref == 'refs/heads/main' && github.event_name == 'push'
              run: |
                  docker build -t my-app:${{ github.sha }} .
                  # docker push ...
```

---

## 常用工具

-   **CI/CD 平台**:
    -   **GitHub Actions**: 與 GitHub 深度整合，社群生態活躍。
    -   **GitLab CI/CD**: 功能強大，與 GitLab 生態無縫結合。
    -   **Jenkins**: 老牌、開源、插件生態極其豐富，但配置較為複雜。
    -   **CircleCI**: 速度快，配置簡單。
-   **容器化**:
    -   **Docker**: 應用程式打包和執行的標準。
    -   **Kubernetes**: 容器編排和管理的標準。
-   **基礎設施即程式碼 (IaC)**:
    -   **Terraform**: 宣告式地管理雲端資源。
    -   **Ansible**: 組態管理和應用程式部署。

---

## 相關資源

-   [Atlassian: CI/CD Guide](https://www.atlassian.com/continuous-delivery/ci-cd)
-   [GitHub Actions Documentation](https://docs.github.com/en/actions)
-   [The Twelve-Factor App](https://12factor.net/)
