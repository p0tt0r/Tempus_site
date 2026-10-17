// Версия для слабовидящих: применяется до первой отрисовки (логика дублирует src/lowVision/lowVision.ts)
try {
  var lv = JSON.parse(localStorage.getItem('umc-low-vision'));
  if (lv && lv.enabled === true) {
    var h = document.documentElement;
    h.setAttribute('data-lv', 'on');
    h.setAttribute('data-lv-size', ['large', 'xlarge'].indexOf(lv.size) > -1 ? lv.size : 'normal');
    h.setAttribute('data-lv-scheme', ['wb', 'blue'].indexOf(lv.scheme) > -1 ? lv.scheme : 'bw');
    if (lv.images === false) h.setAttribute('data-lv-images', 'off');
  }
} catch (e) {}
