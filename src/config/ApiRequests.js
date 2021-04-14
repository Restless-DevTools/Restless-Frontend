export default class Requests {
  constructor(api) {
    this.api = api;
  }

  // Collections
  getAllCollections() {
    return this.api.get('/collections/all');
  }

  createCollection(collection) {
    return this.api.post('/collections/create', collection);
  }

  // Snippets
  getSnippets() {
    return this.api.get('/snippets/all');
  }

  createSnippet(payload) {
    return this.api.post('/snippets/create', payload);
  }

  editSnippet(snippetId, payload) {
    return this.api.put(`/snippets/update/${snippetId}`, payload);
  }

  deleteSnippet(snippetId) {
    return this.api.delete(`/snippets/delete/${snippetId}`);
  }

  // Groups
  createGroup(group) {
    return this.api.post('/groups/create', group);
  }

  getGroupsByCollection(filters) {
    return this.api.get('/groups/get-by-collection', {
      params: {
        ...filters,
      },
    });
  }
}
