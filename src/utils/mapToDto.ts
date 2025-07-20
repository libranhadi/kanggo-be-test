import dayjs from 'dayjs';

export function mapToDTO<T>(source: Record<string, any>, dtoSample: T): T {
  const result = {} as T;

  for (const key in dtoSample) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      const value = source[key];
      result[key] =
        value instanceof Date
          ? (dayjs(value).format('YYYY-MM-DD HH:mm:ss') as any)
          : value;
    }
  }

  return result;
}
