import { IterableX } from './iterablex';

export class TakeLastIterable<TSource> extends IterableX<TSource> {
  private _source: Iterable<TSource>;
  private _count: number;

  constructor(source: Iterable<TSource>, count: number) {
    super();
    this._source = source;
    this._count = count;
  }

  *[Symbol.iterator]() {
    if (this._count > 0) {
      let q = [] as TSource[];
      for (let item of this._source) {
        if (q.length >= this._count) {
          q.shift();
        }
        q.push(item);
      }

      while (q.length > 0) {
        yield q.shift()!;
      }
    }
  }
}

export function takeLast<TSource>(source: Iterable<TSource>, count: number): IterableX<TSource> {
  return new TakeLastIterable<TSource>(source, count);
}
