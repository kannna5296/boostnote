// メール本文生成ロジック
class ContentGenerator {
  constructor() {
    this.templates = {
      default: {
        format: `今日の学び：{learning}
今日やること：{todo}
なぜやるのか：
{reason}`,
        prefix: '',
        suffix: ''
      },
      high: {
        format: `🔥 今日の学び：{learning}
🚀 今日やること：{todo}
💪 なぜやるのか：
{reason}`,
        prefix: '【高テンション】',
        suffix: '🔥 今日も頑張ろう！ 🔥'
      },
      normal: {
        format: `⚡ 今日の学び：{learning}
⚡ 今日やること：{todo}
⚡ なぜやるのか：
{reason}`,
        prefix: '【今日の目標】',
        suffix: '⚡ 着実に進めていこう ⚡'
      },
      calm: {
        format: `😌 今日の学び：{learning}
😌 今日やること：{todo}
😌 なぜやるのか：
{reason}`,
        prefix: '【今日の学び】',
        suffix: '😌 ゆっくり着実に 😌'
      }
    };

    // 利用可能な画像URL（サーバーから配信）
    this.availableImages = [
      '/images/24d48f09bb8cfa74384e32f3711dda40.jpg'
    ];
  }

  // ランダムな画像を選択
  getRandomImage() {
    const randomIndex = Math.floor(Math.random() * this.availableImages.length);
    return this.availableImages[randomIndex];
  }

  // 画像を表示
  displayImage() {
    const imageElement = document.getElementById('motivationImage');
    if (imageElement) {
      const randomImage = this.getRandomImage();
      imageElement.src = randomImage;

      // 画像読み込み時のエラーハンドリング
      imageElement.onerror = () => {
        console.warn('画像の読み込みに失敗しました:', randomImage);
        console.log('サーバーが起動しているか確認してください: python3 server.py');
        imageElement.style.display = 'none';
      };

      imageElement.onload = () => {
        imageElement.style.display = 'block';
      };
    }
  }

  // メール本文を生成
  generateEmailContent(formData) {
    const { learning, todo, reasons, tensionLevel } = formData;

    // 入力値の検証
    if (!learning || !todo || reasons.length === 0) {
      throw new Error('すべての項目を入力してください');
    }

    // テンションレベルに応じたテンプレートを選択
    const template = this.selectTemplate(tensionLevel);

    // 理由を整形（すべて箇条書き形式）
    const learningText = "\n•" + learning;
    const todoText = "\n•" + todo;
    const reasonText = reasons.map(reason => `• ${reason}`).join('\n');

    // 本文を生成
    let content = template.format
      .replace('{learning}', this.escapeHtml(learningText))
      .replace('{todo}', this.escapeHtml(todoText))
      .replace('{reason}', this.escapeHtml(reasonText));

    // プレフィックスとサフィックスを追加
    if (template.prefix) {
      content = template.prefix + '\n\n' + content;
    }
    if (template.suffix) {
      content = content + '\n\n' + template.suffix;
    }

    return content.trim();
  }

  // テンションレベルに応じたテンプレートを選択
  selectTemplate(tensionLevel) {
    switch (tensionLevel) {
      case '🔥高め':
        return this.templates.high;
      case '⚡普通':
        return this.templates.normal;
      case '😌穏やか':
        return this.templates.calm;
      default:
        return this.templates.default;
    }
  }

  // HTMLエスケープ
  escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // プレビュー用のHTMLを生成
  generatePreviewHtml(content) {
    return content.replace(/\n/g, '<br>');
  }

  // コピー用のテキストを生成（HTMLタグなし）
  generateCopyText(content) {
    return content.replace(/<br>/g, '\n');
  }

  // フォームデータを取得
  getFormData() {
    const learning = document.getElementById('learning').value.trim();
    const todo = document.getElementById('todo').value.trim();
    const reasons = this.getReasons();
    const tensionLevel = this.getSelectedTensionLevel();

    return {
      learning,
      todo,
      reasons,
      tensionLevel
    };
  }

  // 理由を取得
  getReasons() {
    const reasonElements = document.querySelectorAll('textarea[name="reason"]');
    const reasons = [];

    reasonElements.forEach(element => {
      const value = element.value.trim();
      if (value) {
        reasons.push(value);
      }
    });

    return reasons;
  }

  // 選択されたテンションレベルを取得
  getSelectedTensionLevel() {
    const selected = document.querySelector('input[name="tensionLevel"]:checked');
    return selected ? selected.value : '';
  }

  // 入力値のバリデーション
  validateFormData(formData) {
    const errors = [];

    if (!formData.learning) {
      errors.push('今日の学びを入力してください');
    }
    if (!formData.todo) {
      errors.push('今日やることを入力してください');
    }
    if (formData.reasons.length === 0) {
      errors.push('なぜやるのかを入力してください');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // 現在表示されている画像のURLを取得
  getCurrentImageUrl() {
    const imageElement = document.getElementById('motivationImage');
    if (imageElement && imageElement.src) {
      return imageElement.src;
    }
    return null;
  }
}

// グローバルインスタンスを作成
window.contentGenerator = new ContentGenerator();
