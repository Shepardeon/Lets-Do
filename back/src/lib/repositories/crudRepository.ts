export interface ICrudRepository<T> {
  insertAsync: (record: T) => Promise<T>
  insertListAsync: (records: T[]) => Promise<void>
  getByIdAsync: (id: number) => Promise<T | null>
  getAsync: (filter: any) => Promise<T | null>
  listAsync: (filter?: any) => Promise<T[]>
  updateAsync: (record: T) => Promise<T>
  deleteAsync: (record: T) => Promise<void>
}
