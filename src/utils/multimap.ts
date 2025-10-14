export class Multimap<Key, Value> extends Map<Key, Value[]> {
  /**
   * Adds a value to the multimap. Identical entries are allowed
   * @param key - key to append value to
   * @param value - value to add
   */
  public readonly add = (key: Key, value: Value): void => {
    const values: Value[] | undefined = this.get(key);
    if (values) values.push(value);
    else this.set(key, [value]);
  };

  /**
   * Get all unique values to a key. To get all values call `get()`
   * @param key - Key whose values to return
   * @returns - A Set of unique values
   */
  public readonly getUnique = (key: Key): Set<Value> => {
    return new Set(this.get(key) || []);
  };

  /**
   * Removes all instances of `value` from `key`
   * @param key - key to remove value from
   * @param value - value to remove
   * @returns number of removed elements
   */
  public readonly remove = (key: Key, value: Value): number => {
    const values: Value[] | undefined = this.get(key);
    if (values) {
      const length = values.length;
      this.set(
        key,
        values.filter((entry: Value): boolean => {
          return entry !== value;
        }),
      );
      return values.length - length;
    } else return 0;
  };
}
