export enum StorageType {
  localStorage = "localStorage",
  sessionStorage = "sessionStorage",
}

export interface ClassConstructor__StorageHandler {
  storageType: StorageType;
}
