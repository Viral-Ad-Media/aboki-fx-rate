import * as prismic from '@prismicio/client'
import { PRISMIC_API_URL } from '@/config'

let client

const getClient = () => {
  if (!client) {
    client = prismic.createClient(PRISMIC_API_URL, {
      fetchOptions: { next: undefined },
    })
  }
  return client
}

/**
 * Fetch documents of one type, newest first.
 * @param {{ pageSize?: number, page?: number }} params
 * @param {string} type Prismic custom type (landing, news, ads)
 */
const docAPI = async (params, type) => {
  try {
    const response = await getClient().get({
      filters: [prismic.filter.at('document.type', type)],
      orderings: [{ field: 'document.last_publication_date', direction: 'desc' }],
      pageSize: params.pageSize || 20,
      page: params.page || 1,
    })
    return response
  } catch (error) {
    console.error(`docAPI failed for type "${type}"`, error && error.message ? error.message : error)
    return { results: [] }
  }
}

const newsPostAPI = async slug => {
  try {
    return await getClient().getByUID('news', slug)
  } catch (error) {
    console.error(`newsPostAPI failed for "${slug}"`, error && error.message ? error.message : error)
    return null
  }
}

export { docAPI, newsPostAPI }
