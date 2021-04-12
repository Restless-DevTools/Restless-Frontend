export default class Requests {
  constructor(api) {
    this.api = api;
  }

  getAllCollections() {
    return this.api.get('/collections/all');
  }

  // snippets
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
}
