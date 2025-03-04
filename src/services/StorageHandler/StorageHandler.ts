import { isNull_Undefined } from "utils/common";
import { ClassConstructor__StorageHandler, StorageType } from "./constants";

export class StorageHandler {
  storage: Storage;
  storageType: StorageType;

  constructor({ storageType }: ClassConstructor__StorageHandler) {
    this.storageType = storageType;

    if (storageType === StorageType.localStorage) {
      this.storage = localStorage;
      return;
    }

    if (storageType === StorageType.sessionStorage) {
      this.storage = sessionStorage;
      return;
    }

    throw new Error("Unsupported storage type");
  }

  getDataByKey(key: string): any {
    const value = this.storage.getItem(key);

    if (isNull_Undefined(value)) return null;

    return JSON.parse(value as string);
  }

  setDataByKey(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  removeDataByKey(key: string) {
    this.storage.removeItem(key);
  }
}
