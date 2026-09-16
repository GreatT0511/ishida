function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Gemini 実践ガイド | 石田小学校 校内研修')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}
