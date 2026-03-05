import Prismic from 'prismic-javascript';
import { PRISMIC_API_URL } from '../config';

let prismicApiPromise;

const getPrismicAPI = () => {
    if (!prismicApiPromise) {
        prismicApiPromise = Prismic.api(PRISMIC_API_URL);
    }
    return prismicApiPromise;
};

const docAPI = async (params, docID) => {
    try {
        const API = await getPrismicAPI();
        const response = await API.query(
            Prismic.Predicates.at('document.type', docID),
            {
                orderings: '[document.last_publication_date desc]',
                ...params
            }
        );
        return response;
    } catch (error) {
        console.error(`docAPI failed for type "${docID}"`, error);
        return { results: [] };
    }
};

const newsPostAPI = async slug => {
    try {
        const API = await getPrismicAPI();
        const response = await API.query(
            Prismic.Predicates.at('my.news.uid', slug)
        );
        return response.results[0] || null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export { docAPI, newsPostAPI };
