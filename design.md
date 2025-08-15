# BoostNote Webアプリ設計書

## 1. 概要
休日の学び・TODO・やる理由を入力し、朝のメール確認時にモチベーションを呼び覚ますためのWebアプリケーション。

## 2. 技術スタック
- **フロントエンド**: Vanilla JavaScript + HTML + Tailwind CSS
- **バックエンド**: 不要（ブラウザ上で完結）
- **データベース**: 不要（ローカルストレージ使用）
- **画像管理**: ローカルファイルシステム（ブラウザ上）

## 3. アーキテクチャ設計

### 3.1 ファイル構成
```
boostnote/
├── index.html                 # メインHTMLファイル
├── styles/
│   └── main.css              # カスタムCSS（必要に応じて）
├── scripts/
│   ├── app.js                # メインJavaScript
│   ├── contentGenerator.js   # メール本文生成ロジック
│   └── localStorage.js       # ローカルストレージ管理
├── requirements.md
└── design.md
```

### 3.2 データ構造
```javascript
// ブーストデータ
const boostData = {
  learning: '',      // 学び
  todo: '',          // TODO
  reason: '',        // やる理由
  tensionLevel: '',  // テンションレベル
  createdAt: new Date()  // 作成日時
};


```

## 4. 主要機能の実装方針

### 4.1 メール本文生成
- テンプレートベースの生成システム
- テンションレベルに応じた表現の調整
- クリップボードへのコピー機能

```javascript
// 生成例
const generateEmailContent = (boostData) => {
  return `
今日の学び：${boostData.learning}
今日やること：${boostData.todo}
なぜやるのか：${boostData.reason}
  `.trim();
};
```



### 4.2 データ永続化
- localStorageを使用したデータ保存
- 定期的なクリーンアップ機能

## 5. UI/UX設計

### 5.1 レイアウト
- シンプルで直感的なワンページ構成
- レスポンシブデザイン
- ダークモード対応

### 5.2 ユーザーフロー
1. フォーム入力（学び・TODO・理由・テンションレベル）
2. 「生成」ボタンクリック
3. 生成結果の表示
4. コピー＆貼り付けでメール送信

### 5.3 機能設計
- **入力フォーム**: 学び・TODO・理由・テンションレベル入力
- **生成結果表示**: メール本文の表示
- **コピー機能**: 生成結果をクリップボードにコピー
- **ローカルストレージ**: データの保存

## 6. 開発フェーズ

### Phase 1: 基本機能（1-2日）
- [ ] プロジェクトセットアップ
- [ ] 基本フォーム実装
- [ ] メール本文生成機能
- [ ] コピー機能



### Phase 2: データ永続化（1日）
- [ ] localStorage実装
- [ ] 履歴管理
- [ ] データクリーンアップ

### Phase 3: UI/UX改善（1日）
- [ ] レスポンシブ対応
- [ ] ダークモード
- [ ] アニメーション
- [ ] エラーハンドリング

## 7. 技術的考慮事項

### 7.1 パフォーマンス
- localStorageの容量制限（5-10MB）
- 軽量なDOM操作

### 7.2 セキュリティ
- XSS対策
- 入力値の検証

### 7.3 ブラウザ互換性
- モダンブラウザ対応
- localStorage対応確認

## 8. ファイル構成

```
boostnote/
├── index.html                 # メインHTMLファイル
├── styles/
│   └── main.css              # カスタムCSS（必要に応じて）
├── scripts/
│   ├── app.js                # メインJavaScript
│   ├── contentGenerator.js   # メール本文生成ロジック
│   └── localStorage.js       # ローカルストレージ管理
├── requirements.md
└── design.md
```

## 9. 依存関係（CDN使用）

```html
<!-- 依存関係（CDN使用） -->
<head>
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- 必要に応じて追加ライブラリ -->
  <!-- <script src="https://unpkg.com/clipboard@2/dist/clipboard.min.js"></script> -->
</head>
```

## 10. 今後の拡張可能性

- 画像アップロード機能
- PWA対応（オフライン利用）
- テンプレート機能
- 統計・分析機能
- エクスポート機能（PDF、画像）
- テーマカスタマイズ
- 音声入力対応
- 履歴管理機能
- 設定保存機能

