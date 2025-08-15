#!/usr/bin/env python3
"""
簡単な画像配信サーバー
CORS問題を回避するために画像を配信します
"""

import http.server
import socketserver
import os
import sys
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

def start_server(port=8000, directory="."):
    """サーバーを開始"""
    os.chdir(directory)
    
    with socketserver.TCPServer(("", port), CORSHTTPRequestHandler) as httpd:
        print(f"🚀 サーバーを開始しました: http://localhost:{port}")
        print(f"📁 配信ディレクトリ: {os.path.abspath(directory)}")
        print(f"🖼️  画像URL例: http://localhost:{port}/images/24d48f09bb8cfa74384e32f3711dda40.jpg")
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
    parser.add_argument("-p", "--port", type=int, default=8000, help="ポート番号 (デフォルト: 8000)")
    parser.add_argument("-d", "--directory", default=".", help="配信ディレクトリ (デフォルト: 現在のディレクトリ)")
    
    args = parser.parse_args()
    
    start_server(args.port, args.directory)
