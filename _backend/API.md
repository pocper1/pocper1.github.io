---
title: API
layout: collection
permalink: /backend/api/
collection: backend
category: backend
tags:
  - backend
  - api
---

## 概述
這份文件旨在提供一整套關於應用程式介面（API）設計的標準、原則和最佳實踐。無論是設計 RESTful API、GraphQL 還是 gRPC，遵循這些指南都能幫助你建立清晰、一致且易於使用的 API。

- **適用場景**: 所有需要與客戶端（網頁、移動端）或其他服務進行數據交換的後端應用。
- **前提條件**: 理解 HTTP 協議和基本的後端開發概念。
- **預期結果**: 設計出高效、可擴展、安全且易於維護的 API。

---

## API 架構風格
選擇合適的架構風格是 API 設計的第一步。

### 1. REST (Representational State Transfer)
REST 是目前最流行、最廣泛使用的 API 風格，基於 HTTP 協議。

- **核心思想**: 將所有事物視為「資源」，並通過 URL 來標識。
- **操作**: 使用標準 HTTP 方法（GET, POST, PUT, DELETE）對資源進行操作。
- **優點**:
  - 簡單、易於理解
  - 無狀態，易於擴展
  - 生態成熟，工具鏈豐富
- **缺點**:
  - 可能有效能問題（Over-fetching / Under-fetching）
  - 對複雜查詢支持不佳

### 2. GraphQL
由 Facebook 開發的查詢語言，專為了解決 REST 的效能問題而設計。

- **核心思想**: 客戶端精確地請求其所需要的數據。
- **操作**: 通常只有一個端點（e.g., `/graphql`），所有操作通過 POST 請求發送查詢語句。
- **優點**:
  - 解決 Over-fetching 和 Under-fetching
  - 強型別系統
  - API 自帶文檔
- **缺點**:
  - 學習曲線較陡峭
  - 伺服器端實現複雜
  - 緩存策略比 REST 複雜

### 3. gRPC
由 Google 開發的高效能 RPC (Remote Procedure Call) 框架。

- **核心思想**: 定義服務和消息，然後在不同語言的客戶端和伺服器之間生成代碼。
- **操作**: 基於 HTTP/2，使用 Protocol Buffers 作為接口定義語言 (IDL)。
- **優點**:
  - 極高效能，特別適合服務間通訊
  - 支持流式傳輸（Streaming）
  - 強型別，跨語言支持
- **缺點**:
  - 主要用於內部服務，對瀏覽器支持不佳
  - 可讀性差，除錯困難

---

## RESTful API 設計原則
由於 REST 是最常見的選擇，這裡詳細闡述其設計原則。

### 1. 使用名詞而非動詞來命名資源
API 的 URL 應該代表「資源」，而不是「動作」。

```
❌ 不推薦:
/getAllUsers
/createUser
/deleteUser/123

✅ 推薦:
GET /users
POST /users
DELETE /users/123
```

### 2. 正確使用 HTTP 方法
- **GET**: 讀取資源。冪等，無副作用。
- **POST**: 創建資源。非冪等。
- **PUT**: 完整更新資源。冪等。客戶端提供完整的資源表示。
- **PATCH**: 部分更新資源。非冪等。客戶端僅提供需要修改的字段。
- **DELETE**: 刪除資源。冪等。

### 3. 使用複數名詞表示資源集合
```
✅ /users
✅ /users/123/posts
```

### 4. 使用 HTTP 狀態碼傳達結果
- **2xx (成功)**
  - `200 OK`: 請求成功。
  - `201 Created`: 資源創建成功。
  - `204 No Content`: 請求成功，但沒有內容返回（例如 DELETE 請求）。
- **3xx (重定向)**
  - `301 Moved Permanently`: 資源永久移動。
- **4xx (客戶端錯誤)**
  - `400 Bad Request`: 請求語法錯誤。
  - `401 Unauthorized`: 未認證。
  - `403 Forbidden`: 已認證，但無權限。
  - `404 Not Found`: 資源不存在。
  - `429 Too Many Requests`: 請求過於頻繁（速率限制）。
- **5xx (伺服器錯誤)**
  - `500 Internal Server Error`: 伺服器內部錯誤。
  - `503 Service Unavailable`: 服務不可用。

### 5. 提供清晰的錯誤信息
當返回 4xx 或 5xx 錯誤時，應在響應體中提供結構化的錯誤信息。

```json
{
  "error": {
    "code": "INVALID_INPUT",
    "message": "Email address is not valid.",
    "field": "email"
  }
}
```

### 6. 支持分頁、篩選和排序
對於返回列表的 API，必須支持這些功能以避免效能問題。

- **分頁 (Pagination)**: `GET /users?page=1&limit=20`
- **篩選 (Filtering)**: `GET /posts?status=published`
- **排序 (Sorting)**: `GET /users?sort=-created_at` (負號表示降序)

### 7. API 版本管理
當 API 發生不兼容的變更時，需要引入版本。最常見的方式是將版本號放在 URL 中。

```
/api/v1/users
/api/v2/users
```

### 8. 安全性：使用 HTTPS 和認證
- **HTTPS**: 所有 API 都應使用 HTTPS 來加密傳輸過程中的數據。
- **認證 (Authentication)**:
  - **OAuth 2.0**: 最推薦的標準，適用於第三方應用授權。
  - **JWT (JSON Web Tokens)**: 適用於無狀態的認證機制，常用於單頁應用 (SPA) 和移動應用。
  - **API Key**: 簡單的認證方式，適用於內部或受信任的服務。

---

## API 文件
「沒有文件的 API 就是不存在的 API。」

### OpenAPI (Swagger)
OpenAPI 規範（前身為 Swagger）是定義 RESTful API 的標準。

- **優點**:
  - **標準化**: 形成機器可讀的 API 描述。
  - **自動生成**: 可自動生成客戶端代碼、伺服器存根和互動式 API 文檔。
  - **生態豐富**: 擁有大量工具支持（UI, Codegen, Gateway）。

**示例 (YAML):**
```yaml
openapi: 3.0.0
info:
  title: Simple User API
  version: 1.0.0
paths:
  /users/{id}:
    get:
      summary: Get a user by ID
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: A single user
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/User'
components:
  schemas:
    User:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        email:
          type: string
```

---

## 相關資源
- [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md)
- [Google Cloud API Design Guide](https://cloud.google.com/apis/design/)
- [GraphQL 官網](https://graphql.org/)
- [gRPC 官網](https://grpc.io/)
- [OpenAPI Specification](https://spec.openapis.org/oas/v3.1.0)