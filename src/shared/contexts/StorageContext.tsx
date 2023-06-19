import { ReactNode, createContext, useContext, useState } from "react";
import { MMKV } from "react-native-mmkv";


interface StorageContextData {
  storage: MMKV
  changedKey: string | undefined;
}

interface StorageProviderProps {
  children: ReactNode;
}

const StorageContext = createContext({} as StorageContextData)

export default function StorageProvider({ children }: StorageProviderProps) {

  const [changedKey, setChangedKey] = useState<string>();
  const storage = new MMKV()

  const listener = storage.addOnValueChangedListener((changedKey) => {
    setChangedKey(changedKey)
  })

  return (
    <StorageContext.Provider value={{
      storage: storage,
      changedKey: changedKey
    }}>
      {children}
    </StorageContext.Provider>
  )
}

export const useStorageContext = () => useContext(StorageContext);
