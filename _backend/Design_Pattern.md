---
title: "軟體設計模式實戰：21種模式解決你的日常開發難題 (附Mermaid圖解)"
last_modified_at: 2025-09-12T18:00:00+08:00
categories:
  - Backend
tags:
  - Software Design
  - Design Patterns
  - Architecture
---

## 問題背景：為什麼你需要設計模式？

你是否曾感覺自己的代碼越來越難以維護？新增一個小功能，卻要修改十幾個地方；或者，你發現自己在不同的專案中，反复解決著相同的問題。設計模式（Design Patterns）就是前人總結出的、在特定情境下解決常見問題的優雅方案。

本指南將介紹 21 種最核心的設計模式，並通過實戰案例、Mermaid 圖解和模式比較，告訴你**在什麼時候**、**為什麼**以及**如何**使用它們。

- **目標讀者**: 希望寫出更靈活、可維護、可重用代碼的開發者。
- **結構**: 模式分為三大類：創建型（Creational）、結構型（Structural）和行為型（Behavioral）。

---

## 第一部分：創建型模式 (Creational Patterns)

> **核心思想**：將對象的創建過程與其使用者解耦，讓系統在創建對象時更具靈活性。

### 1. 工廠方法 (Factory Method)

-   **一句話解釋**: 定義一個用於創建對象的接口，但讓子類決定要實例化哪一個類。工廠方法讓一個類的實例化延遲到其子類。
-   **解決問題**: 當你不確定未來需要創建哪種類型的對象，或者希望將創建對象的邏輯與使用對象的客戶端代碼分離時。
-   **實戰比喻**: 你有一個物流系統，需要根據不同的運輸方式（陸運、空運）創建不同的交通工具對象。你可以定義一個`Logistics`基類，它有一個`createTransport()`工廠方法。`RoadLogistics`子類重寫這個方法返回`Truck`對象，而`SeaLogistics`子類則返回`Ship`對象。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Creator {
        +<<abstract>> factoryMethod()
        +someOperation()
      }
      class ConcreteCreator {
        +factoryMethod()
      }
      class Product {
        +<<interface>>
      }
      class ConcreteProduct {
        +operation()
      }
      Creator <|-- ConcreteCreator
      Product <|.. ConcreteProduct
      ConcreteCreator ..> ConcreteProduct : creates
      Creator ..> Product : uses
    ```

-   **與抽象工廠的比較**:
    -   **工廠方法** 使用繼承，通過子類來決定創建什麼對象。它一次只創建一個產品。
    -   **抽象工廠** 使用組合，通過傳入不同的工廠對象來創建一系列相關的產品。它一次創建一個產品家族。

### 2. 抽象工廠 (Abstract Factory)

-   **一句話解釋**: 提供一個接口，用於創建一系列相關或相互依賴的對象，而無需指定它們的具體類。
-   **解決問題**: 當你需要保證創建出的多個產品對象屬於同一個“家族”或“主題”時。
-   **實戰比喻**: 你要為一個 UI 框架創建一套主題組件。`GUIFactory`接口有`createButton()`和`createCheckbox()`方法。`WindowsFactory`會創建 Windows 風格的按鈕和複選框，而`MacFactory`則會創建 Mac 風格的按鈕和複選框。客戶端代碼只需要依賴`GUIFactory`接口，就可以在不同主題間輕鬆切換。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class AbstractFactory {
          <<interface>>
          +createProductA()
          +createProductB()
      }
      class ConcreteFactory1 {
          +createProductA()
          +createProductB()
      }
      class ConcreteFactory2 {
          +createProductA()
          +createProductB()
      }
      class AbstractProductA {
          <<interface>>
      }
      class AbstractProductB {
          <<interface>>
      }
      AbstractFactory <|.. ConcreteFactory1
      AbstractFactory <|.. ConcreteFactory2
      ConcreteFactory1 ..> ProductA1 : creates
      ConcreteFactory1 ..> ProductB1 : creates
      ConcreteFactory2 ..> ProductA2 : creates
      ConcreteFactory2 ..> ProductB2 : creates
      AbstractProductA <|.. ProductA1
      AbstractProductA <|.. ProductA2
      AbstractProductB <|.. ProductB1
      AbstractProductB <|.. ProductB2
    ```

### 3. 單例 (Singleton)

-   **一句話解釋**: 確保一個類只有一個實例，並提供一個全局訪問點來獲取這個實例。
-   **解決問題**: 當你需要一個全局唯一的對象來協調系統中的行為時，例如日誌記錄器、配置管理器、數據庫連接池等。
-   **實戰比喻**: 一個國家的總統或國王。在任何時候，這個角色只能有一個人擔任。所有與國家元首相關的事務都必須通過這唯一的實例。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Singleton {
        -static instance
        -Singleton()
        +static getInstance()
      }
    ```

### 4. 建造者 (Builder)

-   **一句話解釋**: 將一個複雜對象的構建過程與其表示分離，使得同樣的構建過程可以創建不同的表示。
-   **解決問題**: 當一個對象的構造函數參數過多，或者創建過程非常複雜且包含多個步驟時。使用建造者可以讓代碼更具可讀性，並能精細控制對象的創建過程。
-   **實戰比喻**: 在賽百味點餐。你不是直接點一個“潛艇堡”，而是告訴店員（建造者）：“我要全麥麵包，加烤雞肉，加生菜和番茄，淋上西南醬。” 你通過一系列步驟來構建你的潛艇堡，而不是在構造函數裡傳入一大堆參數。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Director {
        -builder
        +construct()
      }
      class Builder {
        <<interface>>
        +buildPartA()
        +buildPartB()
        +getResult()
      }
      class ConcreteBuilder {
        +buildPartA()
        +buildPartB()
        +getResult()
      }
      class Product {
        -parts
        +addPart()
      }
      Director o-- Builder
      Builder <|.. ConcreteBuilder
      ConcreteBuilder --> Product
    ```

### 5. 原型 (Prototype)

-   **一句話解釋**: 使用一個原型實例指定創建對象的種類，並通過複製這個原型來創建新的對象。
-   **解決問題**: 當創建對象的成本非常高（例如，涉及複雜的計算或網絡請求），而你又需要多個屬性相似的對象時。
-   **實戰比喻**: 細胞分裂。一個細胞可以通過分裂（克隆）快速創建出一個與自身幾乎完全相同的新細胞，這比從頭合成一個新細胞要快得多。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Prototype {
        <<interface>>
        +clone()
      }
      class ConcretePrototype1 {
        -attribute
        +clone()
      }
      class ConcretePrototype2 {
        -attribute
        +clone()
      }
      Prototype <|.. ConcretePrototype1
      Prototype <|.. ConcretePrototype2
    ```

---

## 第二部分：結構型模式 (Structural Patterns)

> **核心思想**：關注如何將類和對象組合起來，形成更大的、更靈活的結構。

### 6. 適配器 (Adapter)

-   **一句話解釋**: 將一個類的接口轉換成客戶端所期望的另一個接口，使得原本接口不兼容的類可以一起工作。
-   **解決問題**: 當你需要集成一個第三方庫或遺留系統，但它的接口與你當前系統的接口規範不符時。
-   **實戰比喻**: 電源適配器。你的筆記本電腦需要三孔插座供電，但牆上的插座是兩孔的。你需要一個適配器來轉換接口。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Client {
        +request()
      }
      class Target {
        <<interface>>
        +request()
      }
      class Adapter {
        -adaptee
        +request()
      }
      class Adaptee {
        +specificRequest()
      }
      Client --> Target
      Target <|.. Adapter
      Adapter o-- Adaptee
    ```

### 7. 橋接 (Bridge)

-   **一句話解釋**: 將一個大的抽象拆分成兩個獨立的層次結構——抽象部分和實現部分，使它們可以獨立地變化。
-   **解決問題**: 當一個類存在兩個或多個獨立變化的維度時。如果不使用橋接，可能會導致類的數量爆炸式增長。
-   **實戰比喻**: 你有一個`Shape`（形狀）類和一個`Color`（顏色）類。形狀可以有`Circle`, `Square`；顏色可以有`Red`, `Blue`。橋接模式允許你將`Shape`和`Color`分離，然後在運行時動態組合它們（一個紅色的圓，一個藍色的方塊），而無需創建`RedCircle`, `BlueSquare`這樣的組合類。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Abstraction {
        -implementor
        +operation()
      }
      class RefinedAbstraction {
        +refinedOperation()
      }
      class Implementor {
        <<interface>>
        +operationImpl()
      }
      class ConcreteImplementorA {
        +operationImpl()
      }
      class ConcreteImplementorB {
        +operationImpl()
      }
      Abstraction <|-- RefinedAbstraction
      Abstraction o-- Implementor
      Implementor <|.. ConcreteImplementorA
      Implementor <|.. ConcreteImplementorB
    ```

### 8. 組合 (Composite)

-   **一句話解釋**: 將對象組合成樹形結構以表示“部分-整體”的層次結構，使得客戶端對單個對象和組合對象的使用具有一致性。
-   **解決問題**: 當你處理的對象具有樹形結構時，例如文件系統的目錄和文件，或 UI 中的容器和控件。
-   **實戰比喻**: 文件系統。一個目錄（組合對象）可以包含文件（葉子對象）和其他目錄。無論是文件還是目錄，你都可以對它們執行`getSize()`或`delete()`等操作。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Component {
        <<interface>>
        +operation()
        +add(Component)
        +remove(Component)
      }
      class Leaf {
        +operation()
      }
      class Composite {
        -children
        +operation()
        +add(Component)
        +remove(Component)
      }
      Component <|-- Leaf
      Component <|-- Composite
      Composite o-- Component
    ```

### 9. 裝飾器 (Decorator)

-   **一句話解釋**: 動態地給一個對象添加一些額外的職責，就增加功能來說，裝飾器模式相比生成子類更為靈活。
-   **解決問題**: 當你需要擴展一個類的功能，但又不希望通過繼承來實現，因為繼承是靜態的，且可能導致子類爆炸。
-   **實戰比喻**: 給你的手機套上手機殼。手機殼（裝飾器）給手機（核心對象）增加了防摔、美觀等功能，但手機本身並沒有改變。你可以隨時更換不同功能的手機殼。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Component {
        <<interface>>
        +operation()
      }
      class ConcreteComponent {
        +operation()
      }
      class Decorator {
        -component
        +operation()
      }
      class ConcreteDecoratorA {
        +addedBehavior()
      }
      class ConcreteDecoratorB {
        +addedState
      }
      Component <|.. ConcreteComponent
      Component <|-- Decorator
      Decorator <|-- ConcreteDecoratorA
      Decorator <|-- ConcreteDecoratorB
      Decorator o-- Component
    ```

### 10. 外觀 (Facade)

-   **一句話解釋**: 為子系統中的一組接口提供一個統一的高層接口，使得子系統更容易使用。
-   **解決問題**: 當你有一個非常複雜的系統（例如，包含多個模塊和類的庫），你希望為外部客戶端提供一個簡單的、易於使用的入口點。
-   **實戰比喻**: 電腦的開機按鈕。你只需要按一下按鈕（調用外觀接口），電腦內部複雜的 CPU、內存、硬盤、顯卡等子系統就會協同工作並啟動。你無需關心它們之間的交互細節。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Facade {
        -subsystem1
        -subsystem2
        +operation()
      }
      class Subsystem1 {
        +operation1()
      }
      class Subsystem2 {
        +operation2()
      }
      Facade o-- Subsystem1
      Facade o-- Subsystem2
      Client --> Facade
    ```

### 11. 享元 (Flyweight)

-   **一句話解釋**: 運用共享技術來有效地支持大量細粒度的對象，避免因對象數量過多而導致的內存溢出。
-   **解決問題**: 當一個應用程序需要生成大量相似的對象，而這些對象的大部分狀態都可以被外部化和共享時。
-   **實戰比喻**: 圍棋棋盤上的棋子。棋盤上有很多黑子和白子，但我們只需要創建一個黑子對象和一個白子對象（享元對象，包含顏色等內部狀態），然後在渲染棋盤時，傳入每個棋子的位置（x, y 坐標，外部狀態）即可。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class FlyweightFactory {
        -flyweights
        +getFlyweight(key)
      }
      class Flyweight {
        <<interface>>
        +operation(extrinsicState)
      }
      class ConcreteFlyweight {
        -intrinsicState
        +operation(extrinsicState)
      }
      FlyweightFactory o-- Flyweight
      Flyweight <|.. ConcreteFlyweight
      Client --> FlyweightFactory
      Client ..> Flyweight
    ```

### 12. 代理 (Proxy)

-   **一句話解釋**: 為其他對象提供一種代理以控制對這個對象的訪問。
-   **解決問題**: 當你需要在訪問一個對象時添加一些額外的邏輯，例如懶加載、權限控制、日誌記錄、緩存等。
-   **實戰比喻**: 信用卡是你的銀行賬戶的代理。你用信用卡進行支付（訪問代理），信用卡系統會進行驗證、記錄交易，然後才真正從你的銀行賬戶（真實對象）扣款。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Subject {
        <<interface>>
        +request()
      }
      class RealSubject {
        +request()
      }
      class Proxy {
        -realSubject
        +request()
      }
      Subject <|.. RealSubject
      Subject <|.. Proxy
      Proxy o-- RealSubject
      Client --> Proxy
    ```

---

## 第三部分：行為型模式 (Behavioral Patterns)

> **核心思想**：關注對象之間的通信、職責分配和算法封裝。

### 13. 責任鏈 (Chain of Responsibility)

-   **一句話解釋**: 使多個對象都有機會處理請求，從而避免請求的發送者和接收者之間的耦合關係。將這些對象連成一條鏈，並沿著這條鏈傳遞該請求，直到有一個對象處理它為止。
-   **解決問題**: 當一個請求的處理者不確定，或有多個潛在處理者時。你希望動態地組織這些處理者。
-   **實戰比喻**: 中間件 (Middleware) 架構，例如在 Express.js 或 ASP.NET Core 中，一個 HTTP 請求會依次通過日誌記錄、身份驗證、數據解析等多個中間件，每個中間件都可以處理請求或將其傳遞給下一個。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Handler {
        <<interface>>
        -successor
        +setSuccessor(Handler)
        +handleRequest(request)
      }
      class ConcreteHandler1 {
        +handleRequest(request)
      }
      class ConcreteHandler2 {
        +handleRequest(request)
      }
      Handler <|.. ConcreteHandler1
      Handler <|.. ConcreteHandler2
      Handler o-- Handler : successor
    ```

### 14. 命令 (Command)

-   **一句話解釋**: 將一個請求封裝為一個對象，從而使你可用不同的請求對客戶端進行參數化；對請求排隊或記錄請求日誌，以及支持可撤銷的操作。
-   **解決問題**: 當你需要將操作的請求者與操作的執行者解耦時，或者需要支持撤銷/重做、事務、異步執行等功能。
-   **實戰比喻**: 餐廳的訂單系統。顧客（請求者）創建一個訂單（命令對象），服務員將訂單傳遞給廚房，廚師（接收者）根據訂單內容執行烹飪操作。這個訂單可以被排隊、記錄，甚至取消。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Invoker {
        -command
        +executeCommand()
      }
      class Command {
        <<interface>>
        +execute()
      }
      class ConcreteCommand {
        -receiver
        +execute()
      }
      class Receiver {
        +action()
      }
      Invoker o-- Command
      Command <|.. ConcreteCommand
      ConcreteCommand o-- Receiver
      Client --> ConcreteCommand
      Client --> Invoker
    ```

### 15. 迭代器 (Iterator)

-   **一句話解釋**: 提供一種方法順序訪問一個聚合對象中各個元素，而又無須暴露該對象的內部表示。
-   **解決問題**: 為遍歷不同數據結構（如數組、列表、樹）提供一個統一的接口。
-   **實戰比喻**: 電視遙控器的“下一個頻道”按鈕。你不需要關心電視內部是如何存儲頻道的，只需要重複按按鈕，就能依次訪問所有頻道。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Aggregate {
        <<interface>>
        +createIterator()
      }
      class ConcreteAggregate {
        +createIterator()
      }
      class Iterator {
        <<interface>>
        +next()
        +hasNext()
      }
      class ConcreteIterator {
        -aggregate
        +next()
        +hasNext()
      }
      Aggregate <|.. ConcreteAggregate
      Iterator <|.. ConcreteIterator
      ConcreteAggregate ..> ConcreteIterator : creates
      Client ..> Aggregate
      Client ..> Iterator
    ```

### 16. 中介者 (Mediator)

-   **一句話解釋**: 用一個中介對象來封裝一系列的對象交互。中介者使各對象不需要顯式地相互引用，從而使其耦合鬆散，而且可以獨立地改變它們之間的交互。
-   **解決問題**: 當系統中對象之間存在複雜的網狀通信結構，導致“一對多”或“多對多”的依賴關係時。
-   **實戰比喻**: 機場的控制塔。所有飛機（同事對象）都只和控制塔（中介者）通信，由控制塔來協調它們的起飛和降落，避免了飛機之間的直接混亂通信。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Mediator {
        <<interface>>
        +notify(sender, event)
      }
      class ConcreteMediator {
        -component1
        -component2
        +notify(sender, event)
      }
      class Component {
        -mediator
      }
      class ComponentA {
        +operationA()
      }
      class ComponentB {
        +operationB()
      }
      Mediator <|.. ConcreteMediator
      Component <|-- ComponentA
      Component <|-- ComponentB
      ConcreteMediator o-- ComponentA
      ConcreteMediator o-- ComponentB
      Component o-- Mediator
    ```

### 17. 備忘錄 (Memento)

-   **一句話解釋**: 在不破壞封裝性的前提下，捕獲一個對象的內部狀態，並在該對象之外保存這個狀態。這樣以後就可將該對象恢復到原先保存的狀態。
-   **解決問題**: 當你需要實現撤銷/重做功能，或者需要對象的快照以便後續恢復時。
-   **實戰比喻**: 文本編輯器的“撤銷”功能。你每次的修改都會被保存為一個個的快照（備忘錄）。當你按下`Ctrl+Z`時，程序就從上一個快照中恢復編輯器的狀態。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Originator {
        -state
        +setState(state)
        +saveStateToMemento()
        +getStateFromMemento(Memento)
      }
      class Memento {
        -state
        +getState()
      }
      class Caretaker {
        -mementoList
        +add(Memento)
        +get(index)
      }
      Originator ..> Memento : creates
      Caretaker o-- Memento
    ```

### 18. 觀察者 (Observer)

-   **一句話解釋**: 定義對象間的一種一對多的依賴關係，當一個對象的狀態發生改變時，所有依賴於它的對象都得到通知並被自動更新。
-   **解決問題**: 當你希望一個對象的狀態變化能通知其他不相關的對象，而又不想讓它們之間產生緊密耦合時。
-   **實戰比喻**: 報紙訂閱。出版社（主題）是內容的發布者，訂閱者（觀察者）是內容的接收者。當新一期報紙出版時，所有訂閱者都會收到一份，而出版社無需關心具體有哪些訂閱者。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Subject {
        -observers
        +attach(Observer)
        +detach(Observer)
        +notify()
      }
      class ConcreteSubject {
        -subjectState
        +getState()
        +setState(state)
      }
      class Observer {
        <<interface>>
        +update()
      }
      class ConcreteObserver {
        -observerState
        +update()
      }
      Subject <|-- ConcreteSubject
      Observer <|.. ConcreteObserver
      Subject o-- Observer
      ConcreteSubject ..> ConcreteObserver : notifies
    ```

### 19. 狀態 (State)

-   **一句話解釋**: 允許一個對象在其內部狀態改變時改變它的行為。對象看起來似乎修改了它的類。
-   **解決問題**: 當一個對象的行為由其狀態決定，並且它有大量與狀態相關的條件判斷語句時（大量的`if/else`或`switch`）。
-   **實戰比喻**: 自動售貨機。它有“無幣”、“有幣”、“售罄”等狀態。在“無幣”狀態下，你投幣，它會切換到“有幣”狀態；在“有幣”狀態下，你選擇商品，它會出貨並可能切換回“無幣”狀態。每個狀態下的行為都不同。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Context {
        -state
        +request()
        +setState(State)
      }
      class State {
        <<interface>>
        +handle(Context)
      }
      class ConcreteStateA {
        +handle(Context)
      }
      class ConcreteStateB {
        +handle(Context)
      }
      Context o-- State
      State <|.. ConcreteStateA
      State <|.. ConcreteStateB
    ```

-   **與策略模式的比較**:
    -   **狀態模式** 關注的是對象在不同狀態下的行為切換，狀態的改變通常由對象自身或狀態對象內部觸發。
    -   **策略模式** 關注的是算法的替換，策略的選擇通常由客戶端決定。
    -   簡言之：狀態模式是“我是誰，我就怎麼做”，策略模式是“客戶端讓我怎麼做，我就怎麼做”。

### 20. 策略 (Strategy)

-   **一句話解釋**: 定義一系列的算法,把它們一個個封裝起來, 並且使它們可相互替換。本模式使得算法可獨立於使用它的客戶而變化。
-   **解決問題**: 當你需要對同一類問題提供多種處理方式（算法），並希望客戶端可以在運行時選擇使用哪一種時。
-   **實戰比喻**: 地圖應用的路線規劃。對於從 A 點到 B 點，你可以選擇“駕車策略”、“步行策略”或“公交策略”。應用會根據你的選擇，使用不同的算法來計算路線。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class Context {
        -strategy
        +Context(Strategy)
        +contextInterface()
      }
      class Strategy {
        <<interface>>
        +algorithmInterface()
      }
      class ConcreteStrategyA {
        +algorithmInterface()
      }
      class ConcreteStrategyB {
        +algorithmInterface()
      }
      Context o-- Strategy
      Strategy <|.. ConcreteStrategyA
      Strategy <|.. ConcreteStrategyB
    ```

### 21. 模板方法 (Template Method)

-   **一句話解釋**: 在一個方法中定義一個算法的骨架，而將一些步驟延遲到子類中。模板方法使得子類可以不改變一個算法的結構即可重定義該算法的某些特定步驟。
-   **解決問題**: 當你有多個類包含幾乎相同的算法，只有一些細微差別時。可以將相同的代碼提升到一個基類中。
-   **實戰比喻**: 泡一杯飲料的流程是固定的：1. 燒水；2. 沖泡；3. 倒入杯中；4. 加調料。這就是模板方法。對於`泡咖啡`和`泡茶`這兩個子類，它們都遵循這個流程，只是在第 2 步（用咖啡粉還是茶葉）和第 4 步（加糖奶還是檸檬）有所不同。

-   **Mermaid 圖解**:
    ```mermaid
    classDiagram
      class AbstractClass {
        +templateMethod()
        +<<abstract>> primitiveOperation1()
        +primitiveOperation2()
      }
      class ConcreteClass {
        +primitiveOperation1()
        +primitive_operation2()
      }
      AbstractClass <|-- ConcreteClass
    ```