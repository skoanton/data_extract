export function extractKeys(obj, prefix = '') {
    let keys = [];
    for (const key in obj) {
      const fullKey = prefix ? `${prefix}.${key}` : key;
      keys.push(fullKey);
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        // Recurse for nested objects or arrays
        keys = keys.concat(extractKeys(obj[key], fullKey));
      }
    }
    return keys;
  }