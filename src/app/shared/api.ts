class API {
  private baseUrl = '';

  constructor(baseUrl: string){
    this.baseUrl = baseUrl;
  }

  async get<T>(url: string): Promise<T>{
    const response = await fetch(this.baseUrl + url);

    return response.json();
  }
}

export default new API('https://itunes.apple.com/');

export interface ListResponse<T> {
  resultCount: number;
  results: Array<T>;
}
