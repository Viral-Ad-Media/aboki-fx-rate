function linkResolver(doc) {
    if (doc.type === 'news') {
        return `/news/${doc.uid}`;
    }
    return '/';
}

module.exports = {
    linkResolver
};