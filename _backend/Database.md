---
title: Database
layout: collection
permalink: /backend/database/
collection: backend
category: backend
tags:
  - backend
  - database
---

## 概述
資料庫是任何後端應用的心臟，負責持久化地儲存、管理和檢索數據。選擇正確的資料庫類型並進行合理的設計，對應用的效能、可擴展性和可維護性有著決定性的影響。本文件將介紹主流資料庫的類型、核心概念及設計原則。

- **適用場景**: 所有需要數據持久化的後端服務。
- **前提條件**: 無，本文件將從基礎概念開始介紹。
- **預期結果**: 能夠區分 SQL 和 NoSQL 資料庫的適用場景，並掌握基本的資料庫設計原則。

---

## 資料庫的兩大陣營：SQL vs. NoSQL

### 1. SQL (關聯式資料庫)

SQL (Structured Query Language) 資料庫以其嚴格的結構和事務性聞名，是數十年來的業界標準。

- **核心概念**:
  - **結構化數據**: 數據儲存在由行和列組成的「資料表 (Table)」中。
  - **預定義結構 (Schema-on-Write)**: 在寫入數據前，必須先定義好資料表的結構。
  - **關聯**: 透過主鍵 (Primary Key) 和外鍵 (Foreign Key) 在不同資料表之間建立關係。
  - **ACID 事務**: 保證數據操作的原子性 (Atomicity)、一致性 (Consistency)、隔離性 (Isolation) 和持久性 (Durability)。

- **何時使用 SQL?**
  - 數據結構穩定，很少變動。
  - 數據之間存在複雜的關聯查詢。
  - 需要強大的事務保證（例如：金融、訂單系統）。

- **主流產品**: PostgreSQL, MySQL, Oracle, SQL Server。

**範例：**
```sql
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, email) VALUES ('john_doe', 'john.doe@example.com');
```

### 2. NoSQL (非關聯式資料庫)

NoSQL ("Not Only SQL") 是一系列資料庫技術的總稱，為了解決大規模、高併發和非結構化數據的挑戰而生。

- **核心概念**:
  - **彈性結構 (Schema-on-Read)**: 不需要預先定義嚴格的結構，數據格式可以非常靈活。
  - **水平擴展**: 天生為分散式架構設計，易於透過增加伺服器來擴展。
  - **BASE 原則**: 基本可用 (Basically Available)、軟狀態 (Soft state)、最終一致性 (Eventually consistent)。這是對 ACID 的一種權衡，犧牲強一致性以換取高可用性和效能。

- **NoSQL 的主要類型**:

  - **文件資料庫 (Document Stores)**
    - **概念**: 將數據儲存為 JSON 或 BSON 格式的「文件」。
    - **適用場景**: 內容管理、使用者設定、大部分 Web 應用。
    - **產品**: MongoDB, Couchbase。
    - **範例**: `db.users.insert({ username: 'jane_doe', email: 'jane.doe@example.com', interests: ['reading', 'hiking'] })`

  - **鍵值資料庫 (Key-Value Stores)**
    - **概念**: 最簡單的數據模型，只有一個鍵和對應的值。
    - **適用場景**: 快取、Session 儲存、即時數據處理。
    - **產品**: Redis, Memcached。
    - **範例**: `SET user:123 '{"name":"Alice","score":100}'`

  - **寬列資料庫 (Column-Family Stores)**
    - **概念**: 數據按列儲存，適合大規模數據集的讀取和寫入。
    - **適用場景**: 大數據分析、日誌記錄、時間序列數據。
    - **產品**: Apache Cassandra, HBase。

  - **圖形資料庫 (Graph Databases)**
    - **概念**: 使用節點、邊和屬性來表示和儲存數據，專為處理數據間的複雜關係而設計。
    - **適用場景**: 社交網絡、推薦引擎、詐欺偵測。
    - **產品**: Neo4j, Amazon Neptune。

---

## 資料庫設計原則

### 1. 正規化 (Normalization) - [SQL]

正規化是減少數據冗餘、保證數據一致性的一系列規則。目標是讓每個數據只儲存一次。

- **第一正規形式 (1NF)**: 確保所有欄位都是不可分割的原子值。
- **第二正規形式 (2NF)**: 在 1NF 基礎上，消除部分依賴（非主鍵欄位完全依賴於整個主鍵）。
- **第三正規形式 (3NF)**: 在 2NF 基礎上，消除傳遞依賴（非主鍵欄位不依賴於其他非主鍵欄位）。

**實踐中，達到 3NF 通常被認為是良好設計的標準。**

### 2. 反正規化 (Denormalization) - [SQL/NoSQL]

反正規化是**故意**增加數據冗餘以換取讀取效能的過程。當需要頻繁進行複雜的 JOIN 操作時，可以考慮將一些常用數據冗餘到主表中，避免查詢時的 JOIN 開銷。

- **權衡**: 提升讀取速度，但增加了寫入的複雜度和儲存成本，並可能引入數據不一致的風險。

### 3. 索引 (Indexing)

索引是提升資料庫查詢速度的關鍵。它就像書的目錄，讓資料庫引擎能快速定位到數據，而無需掃描整張表。

- **原理**: 建立一個指向數據物理位置的數據結構（通常是 B-Tree）。
- **成本**: 
  - 佔用額外的儲存空間。
  - 降低寫入（INSERT, UPDATE, DELETE）效能，因為每次寫入操作都需要同時更新索引。

- **最佳實踐**: 
  - 在經常作為查詢條件（`WHERE` 子句）、排序（`ORDER BY`）和連接（`JOIN`）的欄位上建立索引。
  - 避免在低基數（值重複度高，如「性別」欄位）的欄位上建立索引。

---

## 進階主題

### 1. 複製 (Replication)
將數據從一個主資料庫（Primary/Master）複製到一個或多個從資料庫（Replica/Slave）。

- **主要目的**:
  - **讀寫分離**: 主資料庫處理寫入請求，從資料庫處理讀取請求，提升整體讀取吞吐量。
  - **高可用性**: 當主資料庫故障時，可以將一個從資料庫提升為新的主資料庫，實現故障轉移。

### 2. 分片 (Sharding / Partitioning)
當單一伺服器的寫入壓力和數據量達到瓶頸時，需要將數據水平分割到多個伺服器上，這個過程稱為分片。

- **原理**: 根據某個分片鍵（Shard Key，如用戶 ID），將數據路由到不同的資料庫實例中。
- **挑戰**: 跨分片的查詢和事務非常複雜，需要謹慎設計。

---

## 相關資源
- [PostgreSQL Tutorial](https://www.postgresqltutorial.com/)
- [MongoDB University](https://university.mongodb.com/)
- [Redis Documentation](https://redis.io/documentation)