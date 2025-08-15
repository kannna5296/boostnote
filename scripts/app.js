// メインアプリケーション
class BoostNoteApp {
  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.initializeApp();
  }

  // DOM要素の初期化
  initializeElements() {
    this.form = document.getElementById('boostForm');
    this.resultSection = document.getElementById('resultSection');
    this.generatedContent = document.getElementById('generatedContent');
    this.copyButton = document.getElementById('copyButton');
    this.clearButton = document.getElementById('clearButton');
  }

  // イベントのバインド
  bindEvents() {
    // フォーム送信
    this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));

    // コピーボタン
    this.copyButton.addEventListener('click', () => this.copyToClipboard());

    // クリアボタン
    this.clearButton.addEventListener('click', () => this.clearForm());

    // キーボードショートカット
    document.addEventListener('keydown', (e) => this.handleKeyboardShortcuts(e));
  }

  // アプリケーションの初期化
  initializeApp() {
    // ローカルストレージからデータを復元
    if (window.localStorageManager) {
      window.localStorageManager.loadFormData();
      window.localStorageManager.startAutoSave();
    }

    // 結果セクションを非表示
    this.hideResultSection();

    console.log('BoostNote アプリケーションが初期化されました');
  }

  // フォーム送信の処理
  async handleFormSubmit(e) {
    e.preventDefault();

    try {
      // フォームデータを取得
      const formData = window.contentGenerator.getFormData();

      // バリデーション
      const validation = window.contentGenerator.validateFormData(formData);
      if (!validation.isValid) {
        this.showError(validation.errors.join('\n'));
        return;
      }

      // ローディング表示
      this.showLoading();

      // メール本文を生成
      const content = window.contentGenerator.generateEmailContent(formData);

      // 結果を表示
      this.showResult(content);

      // ローカルストレージをクリア
      if (window.localStorageManager) {
        window.localStorageManager.onGenerationComplete();
      }

    } catch (error) {
      console.error('エラーが発生しました:', error);
      this.showError(error.message);
    }
  }

  // 結果を表示
  showResult(content) {
    // 結果セクションを表示
    this.resultSection.classList.remove('hidden');

    // 内容を設定
    this.generatedContent.textContent = content;

    // 結果セクションまでスクロール
    this.resultSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });

    // コピーボタンを有効化
    this.copyButton.disabled = false;
    this.copyButton.textContent = '📋 コピー';
  }

  // 結果セクションを非表示
  hideResultSection() {
    this.resultSection.classList.add('hidden');
  }

  // ローディング表示
  showLoading() {
    const submitButton = this.form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = '生成中...';

    // 少し遅延を入れてローディング感を演出
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }, 500);
  }

  // エラー表示
  showError(message) {
    // 簡単なアラートで表示（後で改善可能）
    alert('エラー: ' + message);
  }

  // クリップボードにコピー
  async copyToClipboard() {
    try {
      const content = this.generatedContent.textContent;

      // モダンブラウザ用
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(content);
      } else {
        // フォールバック（古いブラウザ用）
        const textArea = document.createElement('textarea');
        textArea.value = content;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }

      // 成功メッセージ
      this.showCopySuccess();

    } catch (error) {
      console.error('コピーに失敗しました:', error);
      this.showError('コピーに失敗しました');
    }
  }

  // コピー成功の表示
  showCopySuccess() {
    const originalText = this.copyButton.textContent;
    this.copyButton.textContent = '✅ コピー完了！';
    this.copyButton.classList.add('bg-green-600');

    setTimeout(() => {
      this.copyButton.textContent = originalText;
      this.copyButton.classList.remove('bg-green-600');
    }, 2000);
  }

  // フォームをクリア
  clearForm() {
    // フォームをリセット
    this.form.reset();

    // 結果セクションを非表示
    this.hideResultSection();

    // ローカルストレージをクリア
    if (window.localStorageManager) {
      window.localStorageManager.clearFormData();
    }

    // 最初の入力フィールドにフォーカス
    document.getElementById('learning').focus();
  }

  // キーボードショートカット
  handleKeyboardShortcuts(e) {
    // Ctrl+Enter でフォーム送信
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      this.form.dispatchEvent(new Event('submit'));
    }

    // Ctrl+C でコピー（結果が表示されている場合）
    if (e.ctrlKey && e.key === 'c' && !this.resultSection.classList.contains('hidden')) {
      e.preventDefault();
      this.copyToClipboard();
    }

    // Escape でクリア
    if (e.key === 'Escape') {
      this.clearForm();
    }
  }
}

// DOM読み込み完了後にアプリケーションを初期化
document.addEventListener('DOMContentLoaded', () => {
  window.boostNoteApp = new BoostNoteApp();
});
