mdc.autoInit();
//
let longlink = document.querySelector('.url');
let shortlink = document.querySelector('.shortlink')
if (longlink) {
  longlink = new mdc.textField.MDCTextField(longlink);
  shortlink = new mdc.textField.MDCTextField(shortlink);
  new mdc.ripple.MDCRipple(document.querySelector('.submit'))
}
