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
}
