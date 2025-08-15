# BoostNote Webアプリ設計書

## 1. 概要
休日の学び・TODO・やる理由を入力し、朝のメール確認時にモチベーションを呼び覚ますためのWebアプリケーション。

## 2. 技術スタック
- **フロントエンド**: Vue 3 + TypeScript + Tailwind CSS
- **バックエンド**: 不要（ブラウザ上で完結）
- **データベース**: 不要（ローカルストレージ使用）
- **画像管理**: ローカルファイルシステム（ブラウザ上）

## 3. アーキテクチャ設計

### 3.1 フロントエンド構成
```
src/
├── components/
│   ├── BoostForm.vue          # メイン入力フォーム
│   ├── GeneratedContent.vue   # 生成結果表示
│   ├── ImageUpload.vue        # 画像アップロード・管理
│   ├── TensionSelector.vue    # テンションレベル選択
│   └── CopyButton.vue         # コピー機能
├── views/
│   └── Home.vue               # メインページ
├── types/
│   └── index.ts               # 型定義
├── composables/
│   ├── useBoostData.ts        # ブーストデータ管理
│   └── useImageStorage.ts     # 画像ストレージ管理
├── utils/
│   ├── contentGenerator.ts    # メール本文生成ロジック
│   ├── imageManager.ts        # 画像管理ロジック
│   └── localStorage.ts        # ローカルストレージ管理
├── App.vue
└── main.ts
```

### 3.2 データ構造
```typescript
// ブーストデータ
interface BoostData {
  learning: string;      // 学び
  todo: string;          // TODO
  reason: string;        // やる理由
  tensionLevel: string;  // テンションレベル
  createdAt: Date;       // 作成日時
}

// 画像データ
interface ImageData {
  id: string;
  name: string;
  dataUrl: string;       // Base64形式
  uploadedAt: Date;
}
```

## 4. 主要機能の実装方針

### 4.1 メール本文生成
- テンプレートベースの生成システム
- テンションレベルに応じた表現の調整
- クリップボードへのコピー機能

```typescript
// 生成例
const generateEmailContent = (boostData: BoostData): string => {
  return `
今日の学び：${boostData.learning}
今日やること：${boostData.todo}
なぜやるのか：${boostData.reason}
  `.trim();
};
```

### 4.2 画像管理
- File APIを使用したローカル画像アップロード
- Base64形式でローカルストレージに保存
- ランダム選択機能
- 画像プレビュー機能

### 4.3 データ永続化
- localStorageを使用したデータ保存
- 画像はBase64形式で保存
- 定期的なクリーンアップ機能

## 5. UI/UX設計

### 5.1 レイアウト
- シンプルで直感的なワンページ構成
- レスポンシブデザイン
- ダークモード対応

### 5.2 ユーザーフロー
1. フォーム入力（学び・TODO・理由・テンションレベル）
2. 画像アップロード（任意）
3. 「生成」ボタンクリック
4. 生成結果の表示
5. コピー＆貼り付けでメール送信

### 5.3 コンポーネント設計
- **BoostForm**: 入力フォーム（バリデーション付き）
- **GeneratedContent**: 生成結果表示（コピー機能付き）
- **ImageUpload**: ドラッグ&ドロップ対応画像アップロード
- **TensionSelector**: テンションレベル選択（🔥⚡など）
- **App.vue**: メインアプリケーションコンポーネント

## 6. 開発フェーズ

### Phase 1: 基本機能（1-2日）
- [ ] プロジェクトセットアップ
- [ ] 基本フォーム実装
- [ ] メール本文生成機能
- [ ] コピー機能

### Phase 2: 画像機能（1-2日）
- [ ] 画像アップロード機能
- [ ] 画像管理機能
- [ ] ランダム選択機能
- [ ] 画像プレビュー

### Phase 3: データ永続化（1日）
- [ ] localStorage実装
- [ ] 履歴管理
- [ ] データクリーンアップ

### Phase 4: UI/UX改善（1日）
- [ ] レスポンシブ対応
- [ ] ダークモード
- [ ] アニメーション
- [ ] エラーハンドリング

## 7. 技術的考慮事項

### 7.1 パフォーマンス
- 画像のBase64変換時のメモリ使用量
- localStorageの容量制限（5-10MB）
- 画像の圧縮処理

### 7.2 セキュリティ
- ファイルアップロードの検証
- XSS対策
- ファイルサイズ制限

### 7.3 ブラウザ互換性
- モダンブラウザ対応
- File API対応確認
- localStorage対応確認

## 8. ファイル構成

```
boostnote/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   ├── views/
│   ├── types/
│   ├── composables/
│   ├── utils/
│   ├── App.vue
│   └── main.ts
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── requirements.md
└── design.md
```

## 9. 依存関係

```json
{
  "dependencies": {
    "vue": "^3.3.0",
    "typescript": "^5.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.0",
    "@vue/tsconfig": "^0.4.0",
    "tailwindcss": "^3.3.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "vite": "^4.4.0"
  }
}
```

## 10. 今後の拡張可能性

- PWA対応（オフライン利用）
- テンプレート機能
- 統計・分析機能
- エクスポート機能（PDF、画像）
- テーマカスタマイズ
- 音声入力対応

