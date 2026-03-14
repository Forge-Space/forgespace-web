import '@testing-library/jest-dom/vitest';

function createMemoryStorage(): Storage {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, String(value));
    },
  };
}

if (typeof window !== "undefined") {
  if (typeof window.matchMedia !== "function") {
    Object.defineProperty(window, "matchMedia", {
      configurable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }),
    });
  }

  const storage = window.localStorage as Partial<Storage> | undefined;
  const hasStorageMethods =
    typeof storage?.getItem === "function" &&
    typeof storage?.setItem === "function" &&
    typeof storage?.removeItem === "function" &&
    typeof storage?.clear === "function";

  const resolvedStorage = hasStorageMethods ? (storage as Storage) : createMemoryStorage();

  Object.defineProperty(window, "localStorage", {
    value: resolvedStorage,
    configurable: true,
  });

  Object.defineProperty(globalThis, "localStorage", {
    value: resolvedStorage,
    configurable: true,
  });
}
