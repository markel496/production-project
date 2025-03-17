module.exports = {
  diffingEngine: 'looks-same',
  fetchFailIgnore:
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
  configurations: {
    'chrome.laptop': {
      target: 'chrome.app',
      width: 1366,
      height: 768,
      deviceScaleFactor: 1,
      mobile: false
    },
    'chrome.iphone7': {
      target: 'chrome.app',
      preset: 'iPhone 7'
    }
  }
}
