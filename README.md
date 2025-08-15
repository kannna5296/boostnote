# BoostNote

週末の学習により沸いたモチベーションを平日に繋げる

## 機能

- 📝 学習内容、TODO、やる理由を入力
- 🎯 テンションレベルに応じたメールテンプレート生成
- 🖼️ モチベーション画像の表示
- 📋 テキストと画像を一緒にコピー
- 💾 フォーム内容の自動保存（localStorage）

## セットアップ

### 1. 画像配信サーバーの起動

画像の品質を保ったまま表示するために、簡単なHTTPサーバーを起動します：

```bash
# Pythonサーバーを起動
python3 server.py

# または、ポートを指定して起動
python3 server.py -p 8080
```

サーバーが起動すると、以下のURLでアクセスできます：
- アプリ: `http://localhost:8000/index.html`
- 画像例: `http://localhost:8000/images/24d48f09bb8cfa74384e32f3711dda40.jpg`

### 2. アプリケーションの使用

1. ブラウザで `index.html` を開く
2. 学習内容、TODO、やる理由を入力
3. テンションレベルを選択
4. 「メール内容を生成」ボタンをクリック
5. 生成された内容と画像をコピー

## ファイル構成

```
boostnote/
├── index.html              # メインHTMLファイル
├── server.py               # 画像配信サーバー
├── compress_images.sh      # 画像圧縮スクリプト
├── images/                 # 画像ファイル
│   └── 24d48f09bb8cfa74384e32f3711dda40.jpg
├── scripts/
│   ├── app.js             # メインアプリケーション
│   ├── contentGenerator.js # メール内容生成
│   └── localStorage.js    # データ保存管理
└── styles/
    └── main.css           # カスタムスタイル
```

## 技術仕様

- **フロントエンド**: Vanilla JavaScript, HTML5, Tailwind CSS
- **画像配信**: Python HTTP Server (CORS対応)
- **データ保存**: localStorage
- **画像形式**: JPG, PNG, WebP対応

## トラブルシューティング

### 画像が表示されない場合

1. サーバーが起動しているか確認
   ```bash
   python3 server.py
   ```

2. ブラウザのコンソールでエラーを確認
   - CORSエラーの場合はサーバーを再起動

3. 画像URLが正しいか確認
   - `http://localhost:8000/images/ファイル名.jpg`

### コピー機能が動作しない場合

- モダンブラウザ（Chrome, Firefox, Safari）を使用
- HTTPS環境では、localhostでも動作します

## ライセンス

MIT License
