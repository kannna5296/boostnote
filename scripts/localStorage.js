// ローカルストレージ管理
class LocalStorageManager {
  constructor() {
    this.storageKey = 'boostFormData';
    this.autoSaveDelay = 1000; // 1秒後に自動保存
    this.autoSaveTimer = null;
  }

  // フォームデータを保存
  saveFormData() {
    const formData = {
      learning: document.getElementById('learning').value,
      todo: document.getElementById('todo').value,
      reason: document.getElementById('reason').value,
      tensionLevel: this.getSelectedTensionLevel(),
      timestamp: new Date().toISOString()
    };

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(formData));
      console.log('フォームデータを保存しました');
    } catch (error) {
      console.error('ローカルストレージの保存に失敗しました:', error);
    }
  }

  // フォームデータを復元
  loadFormData() {
    try {
      const savedData = localStorage.getItem(this.storageKey);
      if (savedData) {
        const data = JSON.parse(savedData);

        // 24時間以内のデータのみ復元
        const savedTime = new Date(data.timestamp);
        const now = new Date();
        const hoursDiff = (now - savedTime) / (1000 * 60 * 60);

        if (hoursDiff < 24) {
          document.getElementById('learning').value = data.learning || '';
          document.getElementById('todo').value = data.todo || '';
          document.getElementById('reason').value = data.reason || '';
          this.setSelectedTensionLevel(data.tensionLevel);
          console.log('フォームデータを復元しました');
          return true;
        } else {
          // 古いデータは削除
          this.clearFormData();
        }
      }
    } catch (error) {
      console.error('ローカルストレージの読み込みに失敗しました:', error);
    }
    return false;
  }

  // フォームデータをクリア
  clearFormData() {
    try {
      localStorage.removeItem(this.storageKey);
      console.log('フォームデータをクリアしました');
    } catch (error) {
      console.error('ローカルストレージのクリアに失敗しました:', error);
    }
  }

  // 選択されたテンションレベルを取得
  getSelectedTensionLevel() {
    const selected = document.querySelector('input[name="tensionLevel"]:checked');
    return selected ? selected.value : '';
  }

  // テンションレベルを設定
  setSelectedTensionLevel(value) {
    if (value) {
      const radio = document.querySelector(`input[name="tensionLevel"][value="${value}"]`);
      if (radio) {
        radio.checked = true;
      }
    }
  }

  // 自動保存を開始
  startAutoSave() {
    const formElements = ['learning', 'todo', 'reason'];
    const radioButtons = document.querySelectorAll('input[name="tensionLevel"]');

    // テキスト入力の監視
    formElements.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('input', () => this.scheduleAutoSave());
      }
    });

    // ラジオボタンの監視
    radioButtons.forEach(radio => {
      radio.addEventListener('change', () => this.scheduleAutoSave());
    });
  }

  // 自動保存をスケジュール
  scheduleAutoSave() {
    if (this.autoSaveTimer) {
      clearTimeout(this.autoSaveTimer);
    }
    this.autoSaveTimer = setTimeout(() => {
      this.saveFormData();
    }, this.autoSaveDelay);
  }

  // 生成完了時の処理
  onGenerationComplete() {
    // 生成完了後はフォームデータをクリア
    this.clearFormData();

    // フォームをリセット
    document.getElementById('boostForm').reset();
  }
}

// グローバルインスタンスを作成
window.localStorageManager = new LocalStorageManager();
