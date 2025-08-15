#!/usr/bin/env python3
"""
画像配信サーバー（画像リストAPI対応）
CORS問題を回避するために画像を配信します
"""

import http.server
import socketserver
import os
import sys
import json
import glob
from urllib.parse import urlparse

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # CORSヘッダーを追加
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        # プリフライトリクエストに対応
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        # APIエンドポイントの処理
        if self.path == '/api/images':
            self.handle_images_api()
            return
        
        # 通常のファイル配信
        super().do_GET()

    def handle_images_api(self):
        """画像リストを提供するAPI"""
        try:
            # imagesフォルダ内の画像ファイルを取得
            image_extensions = ['*.jpg', '*.jpeg', '*.png', '*.gif', '*.webp', '*.svg']
            images = []
            
            for ext in image_extensions:
                pattern = os.path.join('images', ext)
                images.extend(glob.glob(pattern))
            
            # パスを正規化
            images = ['/' + img.replace('\\', '/') for img in images]
            
            # JSONレスポンスを返す
            response_data = {
                'images': images,
                'count': len(images)
            }
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(response_data, ensure_ascii=False).encode('utf-8'))
            
        except Exception as e:
            # エラーレスポンス
            error_data = {
                'error': str(e),
                'images': [],
                'count': 0
            }
            
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(error_data, ensure_ascii=False).encode('utf-8'))

def start_server(port=8000, directory="."):
    """サーバーを開始"""
    os.chdir(directory)
    
    with socketserver.TCPServer(("", port), CORSHTTPRequestHandler) as httpd:
        print(f"🚀 サーバーを開始しました: http://localhost:{port}")
        print(f"📁 配信ディレクトリ: {os.path.abspath(directory)}")
        print(f"🖼️  画像API: http://localhost:{port}/api/images")
        print(f"🖼️  画像URL例: http://localhost:{port}/images/your-image.jpg")
        print("")
        print("終了するには Ctrl+C を押してください")
        print("=" * 50)
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 サーバーを停止しました")

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="画像配信サーバー")
    parser.add_argument("-p", "--port", type=int, default=8080, help="ポート番号 (デフォルト: 8000)")
    parser.add_argument("-d", "--directory", default=".", help="配信ディレクトリ (デフォルト: 現在のディレクトリ)")
    
    args = parser.parse_args()
    
    start_server(args.port, args.directory)
