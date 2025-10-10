import { Client, Databases, ID, Query } from 'appwrite'

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID
const ENDPOINT = import.meta.env.VITE_APPWRITE_ENDPOINT

const client = new Client()
  .setEndpoint(ENDPOINT)
  .setProject(PROJECT_ID)

const databases = new Databases(client)

export const updateSearchCount = async (searchTerm, movie) => {
  try {
    // 🔍 Check if search term exists
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm),
    ])

    if (result.documents.length > 0) {
      const doc = result.documents[0]
      // 📈 Update count
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      })
    } else {
      // 🆕 Create new entry
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id || movie._id || ID.unique(),
        poster_url: movie.primaryImage?.url || '',
      })
    }
  } catch (error) {
    console.error('Error updating search count:', error)
  }
}

export const getTrendingMovies = async () => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc('count'),
      Query.limit(5),
    ])
    return result.documents
  } catch (error) {
    console.error('Error fetching trending movies:', error)
    return []
  }
}
