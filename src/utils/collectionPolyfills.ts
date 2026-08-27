/** pdf.js 5 uses Map#getOrInsertComputed; some Chromium builds still lack it. */

type MapWithInsert<K, V> = Map<K, V> & {
  getOrInsertComputed?: (key: K, fn: (key: K) => V) => V;
};

type WeakMapWithInsert<K extends object, V> = WeakMap<K, V> & {
  getOrInsertComputed?: (key: K, fn: (key: K) => V) => V;
};

export function installCollectionPolyfills(): void {
  const mapProto = Map.prototype as MapWithInsert<unknown, unknown>;
  if (typeof mapProto.getOrInsertComputed !== 'function') {
    mapProto.getOrInsertComputed = function (key, fn) {
      if (this.has(key)) return this.get(key);
      const value = fn(key);
      this.set(key, value);
      return value;
    };
  }

  const weakProto = WeakMap.prototype as WeakMapWithInsert<object, unknown>;
  if (typeof weakProto.getOrInsertComputed !== 'function') {
    weakProto.getOrInsertComputed = function (key, fn) {
      if (this.has(key)) return this.get(key);
      const value = fn(key);
      this.set(key, value);
      return value;
    };
  }
}

installCollectionPolyfills();
