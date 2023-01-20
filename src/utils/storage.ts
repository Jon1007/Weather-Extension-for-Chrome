import { OpenWeatherTempScale } from "./api";

export interface LocalStorage {
  hasAutoOverlay: boolean;
  cities?: string[];
  options?: LocalStorageOptions;
}

export interface LocalStorageOptions {
  homeCity: string;
  tempScale: OpenWeatherTempScale;
}

export type LocalStorageKeys = keyof LocalStorage;

export function setStoredCities(cities: string[]): Promise<void> {
  const valuEs: LocalStorage = {
    cities,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(valuEs, () => resolve());
  });
}

export function getStoredCities(): Promise<string[]> {
  const keys: LocalStorageKeys[] = ["cities"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result: LocalStorage) => {
      resolve(result.cities ?? []);
    });
  });
}

export function setStoredOptions(options: LocalStorageOptions): Promise<void> {
  const valuEs: LocalStorage = {
    options,
  };
  return new Promise((resolve) => {
    chrome.storage.local.set(valuEs, () => {
      resolve();
    });
  });
}

export function getStoredOptions(): Promise<LocalStorageOptions> {
  const keys: LocalStorageKeys[] = ["options"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (result: LocalStorage) => {
      resolve(result.options);
    });
  });
}
