class LocalStorage {
  set<T>(key: string, value: T): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  get<T>(key: string): T | null {
    const value: string | null = localStorage.getItem(key);

    if (value) {
      return JSON.parse(value);
    }

    return null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}

export default new LocalStorage();
