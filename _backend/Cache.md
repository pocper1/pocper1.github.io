---
title: Cache
layout: collection
permalink: /backend/cache/
collection: backend
category: backend
tags:
  - backend
  - cache
---

## 概述

快取（Cache）是提升應用程式效能、降低延遲、減少後端負載的關鍵技術。它將頻繁存取的數據暫時儲存在高速儲存層（如記憶體）中，以便快速回應請求。這份文件將深入探討核心的快取策略和常見的設計模式。

-   **適用場景**: 高讀取量的應用、需要降低資料庫負載的系統、對回應時間有嚴格要求的服務。
-   **前提條件**: 了解基本的數據儲存和系統架構概念。
-   **預期結果**: 能夠根據業務場景選擇並實施最合適的快取策略，並解決常見的快取問題。

---

## 快取位置

快取可以存在於請求生命週期的多個環節：

-   **客戶端快取 (Client-Side Cache)**: 例如瀏覽器快取，儲存靜態資源（CSS, JS, 圖片）。
-   **CDN (Content Delivery Network)**: 內容分發網絡，將內容快取在全球各地的邊緣節點，加速地理上分散用戶的訪問。
-   **伺服器端快取 (Server-Side Cache)**:
    -   **應用內快取**: 在應用程式的記憶體中直接快取。優點是速度極快，缺點是無法在多個服務實例間共享。
    -   **分散式快取 (Distributed Cache)**: 如 Redis、Memcached。獨立於應用程式的快取服務，可以在多個實例間共享數據，是後端開發中最常使用的快取類型。

---

## 核心快取讀寫模式

選擇哪種模式，取決於你對數據一致性、效能和複雜度的權衡。

### 1. Cache-Aside (旁路快取)

這是最常見、最經典的快取模式。

-   **讀取流程**:

    1. 應用程式先從快取讀取數據。
    2. 如果快取命中 (Cache Hit)，直接返回數據。
    3. 如果快取未命中 (Cache Miss)，則從資料庫讀取數據。
    4. 將從資料庫讀到的數據寫入快取。
    5. 返回數據。

-   **寫入流程**: 直接更新資料庫，然後**使快取失效** (invalidate)。

```plaintext
// 讀取
data = cache.get(key)
if data is null:
    data = db.get(key)
    cache.set(key, data, ttl)
return data

// 寫入
db.update(data)
cache.delete(key)
```

-   **優點**:
    -   實現簡單，邏輯清晰。
    -   快取和資料庫的耦合度低，快取服務崩潰不影響主流程。
-   **缺點**:
    -   首次請求（或快取失效後）的延遲較高（Cache Miss Penalty）。
    -   在讀寫並發時，可能存在短暫的數據不一致。

### 2. Read-Through (讀穿透)

應用程式將快取視為主要數據源，由快取服務本身負責處理 Cache Miss。

-   **流程**: 應用程式只與快取互動。當快取未命中時，由快取服務自動從後端資料庫加載數據並返回。
-   **優點**: 應用程式邏輯更簡單。
-   **缺點**: 需要快取服務提供商支持此功能（例如 Ehcache），通用性不如 Cache-Aside。

### 3. Write-Through (寫穿透)

在更新數據時，保證快取和資料庫同步更新。

-   **流程**:

    1. 應用程式將數據寫入快取。
    2. 快取服務**同步**將數據寫入後端資料庫。
    3. 操作完成後返回。

-   **優點**:
    -   強一致性，快取和資料庫的數據始終一致。
-   **缺點**:
    -   寫入延遲較高，因為需要等待兩次寫入操作（快取 + 資料庫）。

### 4. Write-Back / Write-Behind (寫回)

為了極致的寫入效能，更新操作只針對快取，並在稍後異步刷入資料庫。

-   **流程**:

    1. 應用程式將數據寫入快取，立即返回。
    2. 快取服務在一段時間後（例如，累積一定數量的更新）**異步**將數據批量寫入資料庫。

-   **優點**:
    -   寫入延遲極低，吞吐量極高。
-   **缺點**:
    -   **有數據丟失的風險**。如果快取服務在數據刷入資料庫前崩潰，更新就會丟失。
    -   一致性較差。

---

## 快取淘汰策略 (Eviction Policies)

當快取滿了，需要決定淘汰哪些數據。

-   **LRU (Least Recently Used)**: 最近最少使用。淘汰最長時間未被訪問的數據。這是最常用的策略。
-   **LFU (Least Frequently Used)**: 最不經常使用。淘汰訪問次數最少的數據。
-   **FIFO (First-In, First-Out)**: 先進先出。按存入順序淘汰。
-   **TTL (Time-To-Live)**: 為每個快取鍵設置過期時間。
-   **Random**: 隨機淘汰。

---

## 常見快取問題與解決方案

### 1. 快取穿透 (Cache Penetration)

**問題**: 查詢一個**絕對不存在**的數據。請求會一直穿透快取，直接打到資料庫，導致資料庫壓力過大。

-   **解決方案**:
    -   **快取空值 (Cache Nulls)**: 如果資料庫查詢結果為空，也將這個「空結果」快取起來，但設定一個較短的 TTL（例如幾分鐘）。
    -   **布隆過濾器 (Bloom Filter)**: 在快取層前放置一個布隆過濾器，快速判斷請求的數據是否存在。如果不存在，直接拒絕請求。

### 2. 快取雪崩 (Cache Avalanche)

**問題**: 在同一時間，大量快取鍵集體失效（例如，服務重啟、或所有鍵的 TTL 設置為相同時間）。導致大量請求瞬間同時湧向資料庫。

-   **解決方案**:
    -   **過期時間加隨機值 (Jitter)**: 在基礎 TTL 上增加一個隨機時間，避免集體失效。
    -   **服務降級/熔斷**: 當偵測到資料庫壓力過大時，暫時拒絕部分非核心請求。
    -   **快取高可用**: 建立高可用的分散式快取叢集（例如 Redis Sentinel 或 Cluster）。

### 3. 快取擊穿 / 熱點失效 (Cache Stampede / Hotspot Invalidation)

**問題**: 某個**熱點數據**（高併發訪問）的快取剛好失效。此時，大量針對該數據的併發請求會同時穿透快取，打到資料庫上，可能導致資料庫崩潰。

-   **解決方案**:
    -   **互斥鎖 (Mutex Lock)**: 當 Cache Miss 發生時，只允許第一個請求去查詢資料庫並重建快取，其他請求則等待。查詢完成後，所有請求都能從快取中獲取數據。
    -   **熱點數據永不過期**: 對於極度熱點的數據，不設置 TTL，而是由後台任務異步更新快取。

---

## 相關資源

-   [Redis Caching Strategies](https://redis.com/ebook/part-2-core-concepts/appendices/appendix-a-caching-strategies-and-best-practices/)
-   [AWS Caching Best Practices](https://aws.amazon.com/caching/best-practices/)
-   [Google Cloud: Caching](https://cloud.google.com/architecture/framework/reliability/caching-best-practices)
