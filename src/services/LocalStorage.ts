export class LocalStorage {
  private static readonly namespace = "nocodegpt3";

  private constructor() {}

  static get(key: string): string | null {
    return localStorage.getItem(`${LocalStorage.namespace}:${key}`);
  }

  static set(key: string, value: string): void {
    localStorage.setItem(`${LocalStorage.namespace}:${key}`, value);
  }

  remove(key: string): void {
    localStorage.removeItem(`${LocalStorage.namespace}:${key}`);
  }
}
