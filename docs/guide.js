'use strict';
const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (char) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const sourceLinks = (keys = []) => keys.length ? `<div class="source-links">${keys.map(key => `<a href="${escapeHTML(sources[key][1])}" target="_blank" rel="noopener noreferrer">${escapeHTML(sources[key][0])} ↗</a>`).join('')}</div>` : '';
const groundingPrompt = (key, title, prompt) => `<details class="grounding-prompt"><summary>${escapeHTML(title)}<span aria-hidden="true">＋</span></summary><div class="prompt-box"><div class="prompt-label"><span>Geminiに貼り付けて使う</span><button class="copy-btn" data-copy="grounding-prompt-${key}" aria-label="${escapeHTML(title)}をコピー">コピー</button></div><pre id="grounding-prompt-${key}">${escapeHTML(prompt)}</pre></div></details>`;
const groundingExtension = (key) => {
  const extension = groundingExtensions[key];
  if (!extension) return '';
  return `<section class="grounding-addon" aria-labelledby="grounding-title-${key}"><p class="eyebrow">応用 · 接地を見取るテスト</p><h4 id="grounding-title-${key}">${escapeHTML(extension.title)}</h4><p class="grounding-focus"><strong>見取りたいこと</strong>${escapeHTML(extension.focus)}</p>${groundingPrompt(key, extension.title + '：応用プロンプト', extension.prompt + groundingRules)}</section>`;
};
document.getElementById('grounding').innerHTML = `
  <div class="section-heading"><span class="chapter-no goal-mark">目標</span><div><p class="eyebrow">LEARNING GOAL</p><h2>言語化と接地を促す生成AI活用へ</h2></div></div>
  <p class="section-description">児童が体験と結び付けて理解し、自分の言葉で説明できる学びへ。ことばや数・式を具体物、行為、量、関係と結び付ける「接地」と、考えを表す「言語化」の両方を促すために、生成AIを活用します。</p>
  <figure class="grounding-figure"><a href="assets/verbalization-grounding.png" target="_blank" rel="noopener noreferrer" aria-label="言語化と接地の図を大きく開く"><img src="assets/verbalization-grounding.png" width="1668" height="943" loading="lazy" decoding="async" alt="知識の4象限。接地と言語化の両方がある状態は「わかる・説明できる」、接地があり言語化できない状態は「わかる・言葉にできない」、言語化できても接地がない状態は「言える・実感がない」、両方がない状態は「意味も言葉も未整理」。教育の到達目標は、体験と結び付き活用できる、接地を伴った言語化。"></a><figcaption><span>「言える」ことに加え、具体物で示す・操作する・別の場面で使う姿を確かめます。言葉にしにくい理解も、指さしや操作を通して見取ります。</span><a href="assets/verbalization-grounding.png" target="_blank" rel="noopener noreferrer">図を大きく見る ↗</a></figcaption></figure>
  <h3 class="grounding-subhead">接地を見取るテストをつくる</h3>
  <div class="grounding-example"><h3>たとえば「18 ÷ 3 = 6」。6は何の数？</h3><div class="grounding-pair"><p><strong>18個を3人に等しく分ける</strong>答えは1人分の<strong>6個</strong>。<br>おはじきを3人に分けて示せるか。</p><p><strong>18個を1人に3個ずつ配る</strong>答えは分けられる<strong>6人</strong>。<br>3個のまとまりを作って示せるか。</p></div><p class="grounding-caption">式の正答に、単位・図・操作での説明を合わせて見ます。違う数や場面でも確かめ、一つの反応だけで判断しません。</p></div>
  <div class="grounding-context"><p>目的は、児童がどこまで理解し、どこでつまずいている可能性があるかを見取り、次の支援を選ぶこと。ことば・数・式と、図・具体物・操作を行き来する問いや、題材・基準・視点を変えた問いを組み合わせます。この作成条件を、以下の全13本の応用プロンプトに含めています。</p><p class="grounding-note">AIで作る授業内の確認課題です。信頼性・妥当性は未検証のため、教師が問題を点検し、対話と観察を重ねて使います。一つの誤答や合計点で接地の有無を断定せず、支援前後の反応を分けて記録します。</p></div>
  <ol class="grounding-steps"><li><strong>初めの考えを残す</strong><span>必要な配慮を記録し、解き方のヒントを加える前の答え・図・操作を確認。</span></li><li><strong>支援を加えて確かめる</strong><span>読み上げや具体物など、加えた支援と、その後の反応を別に記録。</span></li><li><strong>別の場面で確かめる</strong><span>数や題材を変えた課題で再確認。正答だけでなく説明や操作を見る。</span></li></ol>
  ${groundingPrompt('common', 'まず試す：わり算の確認テストを作る共通プロンプト', groundingMasterPrompt)}
  <p class="grounding-locations">全6章の12の活用例に、<span class="grounding-badge">接地テストの応用あり</span>を付けました。各例を開くと、その場面に合わせたプロンプトをコピーできます。</p>
  <div class="grounding-links"><a href="#personal">教材・数量の意味</a><a href="#thinking">視点・図と操作</a><a href="#documents">印刷用のテスト</a><a href="#printing">支援前後の確認</a><a href="#japanese">ことばと場面</a><a href="#more">Gem・Canvas</a></div>`;
const sampleLinks = '<div class="ruby-preview"><div class="ruby-page" lang="ja"><p><ruby>朝<rt>あさ</rt></ruby>の<ruby>光<rt>ひかり</rt></ruby>が、<ruby>校庭<rt>こうてい</rt></ruby>の<ruby>木<rt>き</rt></ruby>を<ruby>照<rt>て</rt></ruby>らしています。</p><p><ruby>風<rt>かぜ</rt></ruby>がふくと、<ruby>葉<rt>は</rt></ruby>がゆっくりゆれました。</p></div><div><h4>ブラウザで、こんなふうに。</h4><p>本文の横に読みを添えた、A4の完成見本。印刷の流れを確かめてから、自分の教材へ置き換えましょう。</p><a class="btn-link" href="worksheet.html" target="_blank" rel="noopener noreferrer">印刷用の見本を開く ↗</a><a class="text-download" href="worksheet.html" download="縦書きとルビの見本.html">HTMLを保存</a></div></div>';
let total = 0;
document.getElementById('guide-content').innerHTML = chapters.map(chapter => `
  <section class="section-block" id="${chapter.id}">
    <div class="section-heading"><span class="chapter-no">${chapter.n}</span><div><p class="eyebrow">${chapter.en}</p><h2>${escapeHTML(chapter.title)}</h2></div><span class="chapter-count">5 IDEAS</span></div>
    <p class="section-description">${escapeHTML(chapter.description)}</p>
    <div class="boundary"><div><strong>Geminiが手伝えること</strong>${escapeHTML(chapter.can)}</div><div><strong>先生・ほかのアプリで行うこと</strong>${escapeHTML(chapter.human)}</div></div>
    ${chapter.note ? `<div class="callout">${escapeHTML(chapter.note)}</div>` : ''}
    ${chapter.walkthrough ? `<div class="walkthrough"><h3>${escapeHTML(chapter.walkthrough.title)}</h3><ol>${chapter.walkthrough.steps.map(step => `<li>${escapeHTML(step)}</li>`).join('')}</ol>${sourceLinks(chapter.walkthrough.sources)}${chapter.walkthrough.sample ? sampleLinks : ''}</div>` : ''}
    <div class="examples">${chapter.items.map(item => {
      const n = String(++total).padStart(2, '0');
      return `<details class="example" id="idea-${n}">
        <summary><span class="example-id">${n}</span><span class="example-title">${escapeHTML(item.title)}<span class="example-subtitle">${escapeHTML(item.sub)}</span>${groundingExtensions[n] ? '<span class="grounding-badge">接地テストの応用あり</span>' : ''}</span><span class="expand" aria-hidden="true">＋</span></summary>
        <div class="example-body"><div class="example-top"><span class="badge ${/条件|発展|HTML/.test(item.mode)?'conditional':''}">${escapeHTML(item.mode)}</span><span class="badge">${escapeHTML(item.time)}・目安</span></div>
        <h4>できあがるもの</h4><p>${escapeHTML(item.out)}</p><h4>進め方</h4><ol class="steps">${item.steps.map(step=>`<li>${escapeHTML(step)}</li>`).join('')}</ol>
        <div class="prompt-box"><div class="prompt-label"><span>コピーして、Geminiへ</span><button class="copy-btn" data-copy="prompt-${n}" aria-label="${escapeHTML(item.title)}のプロンプトをコピー">コピー</button></div><pre id="prompt-${n}">${escapeHTML(item.prompt)}</pre></div>
        <div class="follow-up"><strong>もう一度、こう頼む</strong>${escapeHTML(item.follow)}</div><div class="quality-check"><strong>先生が確認すること</strong><br>${escapeHTML(item.check)}</div>${sourceLinks(item.sources)}${groundingExtension(n)}</div>
      </details>`;
    }).join('')}</div>
  </section>`).join('');
document.getElementById('workshop-content').innerHTML = `
  <div class="timeline">
    <div><time>15:30–15:35</time><h3>準備する</h3><p>学校アカウントと利用条件を確認。架空データで最初のプロンプトを試す。</p></div>
    <div><time>15:35–15:50</time><h3>教材をつくる</h3><p>3段階のプリントを作成。接地の応用プロンプトで短い確認課題も作り、先生同士で解いて点検。</p></div>
    <div><time>15:50–16:00</time><h3>思考を深める</h3><p>ヒント係や誤答検討を実演。児童が考える場面を授業案に組み込む。</p></div>
    <div><time>16:00–16:15</time><h3>校務に使う</h3><p>文書移行と提出物の印刷手順を確認。自分の困りごとを一つ試す。</p></div>
    <div><time>16:15–16:25</time><h3>縦書きを試す</h3><p>ルビつきHTMLの見本を開く。印刷プレビューで確認し、PDFに保存。</p></div>
    <div><time>16:25–16:30</time><h3>一つ持ち帰る</h3><p>使う場面・必要な修正・確認する人を決め、明日の実践につなげる。</p></div>
  </div><div class="walkthrough"><h3>持ち帰るものは、この3点</h3><p>①自分の授業や校務用に直したプロンプト　②先生が点検した教材または作業手順　③実際に使う日と、確認すること。</p><p>15名程度なら近くの先生と2〜3人で確認すると、AIの見落としや説明の分かりにくさに気付きやすくなります。研修当日に全機能を使える必要はありません。</p></div>`;
document.getElementById('check-content').innerHTML = `
  <div class="safety-grid">
    <div class="safety-card"><h3>学校のアカウントを確認する</h3><p>Geminiにログインできるか、利用する機能が表示されるかを確認します。Google Workspace for Educationの契約、管理者の設定、年齢によって利用範囲が異なります。利用できない機能は通常チャットでの文案作成に置き換えます。</p>${sourceLinks(['account'])}</div>
    <div class="safety-card"><h3>入力する情報を選ぶ</h3><p>研修は架空データで行います。児童の氏名・顔・成績・健康・家庭事情、実際の名簿や個人が分かる記述は入力しません。番号に置き換えても個人を推測できる場合があります。学校の情報取扱いのルールを優先します。</p></div>
    <div class="safety-card"><h3>できあがりを確かめる</h3><ul><li>問題と解答を自分で確かめる</li><li>資料の出典を開いて照合する</li><li>漢字の読み・単位・日付を確認する</li><li>評価・配布・公開は教師が判断する</li></ul></div>
    <div class="safety-card"><h3>ほかのアプリで仕上げる</h3><p>文書はDocs、固定した配置はSlides、提出管理はClassroom、印刷はChromeやプリンタで行います。Geminiアプリを利用できても、各アプリ内のGemini機能やファイル連携がすべて使えるとは限りません。</p></div>
  </div>
  <h3 class="check-subhead">うまくいかないときは</h3>
  <div class="trouble-grid"><div><h4>ほしい結果にならない</h4><p>学年・目標・条件・出力形式を具体化し、「問題数だけ変える」など一度に一つ修正します。よい例を一つ添えるのも有効です。</p></div><div><h4>ボタンや機能が見当たらない</h4><p>画面表示や提供条件は変わります。下の公式ヘルプと管理者設定を確認し、添付の代わりに文章入力、Gemの代わりに定型文の貼り付けで進めます。</p></div></div>
  <h3 class="check-subhead">機能の確認に使った資料</h3><p class="source-intro">2026年9月16日に公式ヘルプ・技術資料を確認。操作名や利用上限は変更される場合があります。授業案とプロンプトは、この研修の要望に合わせて考案したもので、効果を保証するものではありません。</p>
  <ol class="source-list">${Object.values(sources).map(source=>`<li><a href="${escapeHTML(source[1])}" target="_blank" rel="noopener noreferrer">${escapeHTML(source[0])} ↗</a></li>`).join('')}</ol>
  <p class="source-intro">研修のねらい・対象・時間は、ご提供の「生成AI・ICT活用に関する校内研修について」（甲府市立石田小学校、2026年9月16日）を参照しました。学校の端末・契約・プリンタでの実動作は未確認のため、校内の環境に合わせて手順を調整してください。</p>`;

let toastTimer;
const showToast = (message, duration = 2400) => {
  const toast = document.getElementById('toast');
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), duration);
};
document.addEventListener('click', async (event) => {
  const button = event.target.closest('[data-copy]');
  if (!button) return;
  const text = document.getElementById(button.dataset.copy).textContent;
  try {
    await navigator.clipboard.writeText(text);
    showToast('プロンプトをコピーしました');
  } catch {
    const range = document.createRange();
    range.selectNodeContents(document.getElementById(button.dataset.copy));
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    showToast('文章を選択しました。Ctrl+C（Macは⌘C）でコピーできます', 5000);
  }
});

const navLinks = [...document.querySelectorAll('.sidebar nav a')];
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === '#' + entry.target.id;
      link.classList.toggle('current', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, {rootMargin:'-5% 0px -70% 0px',threshold:0});
document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
let printOpenStates = [];
const printDetails = () => [...document.querySelectorAll('.example, .grounding-prompt')];
window.addEventListener('beforeprint', () => {
  printOpenStates = printDetails().map(detail => detail.open);
  printDetails().forEach(detail => { detail.open = true; });
});
window.addEventListener('afterprint', () => {
  printDetails().forEach((detail, index) => { detail.open = printOpenStates[index] || false; });
});
