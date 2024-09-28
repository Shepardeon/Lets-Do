export interface ICrudRepository<T> {
  insertAsync: (record: T) => Promise<T>
  insertListAsync: (records: T[]) => Promise<void>
  getByIdAsync: (id: number) => Promise<T | null>
  listAsync: () => Promise<T[]>
  updateAsync: (record: T) => Promise<T>
  deleteAsync: (record: T) => Promise<void>
}
