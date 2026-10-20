const { NEWS_URL } = require('../config')

function linkResolver(doc) {
  if (doc.type === 'news' && doc.uid) {
    return `/${NEWS_URL}/${doc.uid}`
  }
  return '/'
}

module.exports = {
  linkResolver,
}
