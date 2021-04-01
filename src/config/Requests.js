export default class Requests {
  constructor(api) {
    this.api = api;
  }

  getAllCollections() {
    return this.api.get('/collections/all');
  }
}
