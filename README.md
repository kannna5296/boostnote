# BoostNote

![](./screenshot.png)

週末の学習により沸いたモチベーションを平日に繋げる

## 機能

- 📝 学習内容、TODO、やる理由を入力
- 🎯 テンションレベルに応じたメールテンプレート生成
- 🖼️ モチベーション画像の表示
- 📋 テキストと画像を一緒にコピー
- 💾 フォーム内容の自動保存（localStorage）

## セットアップ

### 1. 必要な環境

**Python**: 3.6以上（推奨: 3.8以上）

```bash
# Pythonバージョン確認
python3 --version

# 必要要件（標準ライブラリのみ使用）
# requirements.txt を参照
```

### 2. 画像の設定

`images/`フォルダに好きな画像を入れてください：

```bash
# imagesフォルダを作成
mkdir images

# 画像ファイルを配置
# 例: images/motivation.jpg, images/inspiration.png など
```

**対応形式**: JPG, JPEG, PNG, GIF, WebP, SVG

**注意**: `images/`フォルダは`.gitignore`で除外されているため、画像はローカルでのみ使用されます。

### 3. ローカル開発用（オプション）

開発時は簡単なHTTPサーバーを起動できます：

```bash
# Pythonサーバーを起動
python3 server.py

# または、ポートを指定して起動
python3 server.py -p 8080

# ヘルプ表示
python3 server.py --help
```

サーバーが起動すると、以下のURLでアクセスできます：
- アプリ: `http://localhost:8000/index.html`
- 画像API: `http://localhost:8000/api/images`
- 画像例: `http://localhost:8000/images/your-image.jpg`

**画像の自動検出**: `images/`フォルダ内の画像は自動的に検出され、ランダムで表示されます。

### 4. アプリケーションの使用

1. ブラウザで `index.html` を開く
2. 学習内容、TODO、やる理由を入力
3. テンションレベルを選択
4. 「メール内容を生成」ボタンをクリック
5. 生成された内容と画像をコピー

## ファイル構成

```
boostnote/
├── index.html              # メインHTMLファイル
├── server.py               # 画像配信サーバー（ローカル開発用）
├── requirements.txt        # Python必要要件
├── .gitignore              # Git除外設定
├── images/                 # 画像ファイル（.gitignoreで除外）
│   └── your-images.jpg     # ユーザーが配置する画像
├── scripts/
│   ├── app.js             # メインアプリケーション
│   ├── contentGenerator.js # メール内容生成
│   └── localStorage.js    # データ保存管理
└── styles/
    └── main.css           # カスタムスタイル
```

## 技術仕様

- **フロントエンド**: Vanilla JavaScript, HTML5, Tailwind CSS
- **バックエンド**: Python 3.6+ (標準ライブラリのみ)
- **画像配信**: Python HTTP Server (CORS対応、ローカル開発用)
- **画像API**: 動的画像リスト取得 (`/api/images`)
- **データ保存**: localStorage
- **画像形式**: JPG, JPEG, PNG, GIF, WebP, SVG対応
- **著作権保護**: `.gitignore`で画像ファイルを除外

## トラブルシューティング

### 画像が表示されない場合

1. `images/`フォルダに画像が配置されているか確認
   ```bash
   ls images/
   ```

2. サーバーが起動しているか確認
   ```bash
   python3 server.py
   ```

3. ブラウザのコンソールでエラーを確認
   - CORSエラーの場合はサーバーを再起動

4. 画像URLが正しいか確認
   - `http://localhost:8000/images/your-image.jpg`

### コピー機能が動作しない場合

- モダンブラウザ（Chrome, Firefox, Safari）を使用
- HTTPS環境では、localhostでも動作します

## ライセンス

MIT License
