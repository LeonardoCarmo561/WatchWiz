import { ReactNode, createContext, useCallback, useContext, useState } from "react";


interface DetailScreenContextData {
  detailMovie: {
    imdbId: string;
    setImdbId(imbdId: string): void;
  },
  commentPost: {
    uuid: string;
    setUuid(e: string): void;
  }
}

interface DetailScreenProviderProps {
  children: ReactNode;
}

const DetailScreenContext = createContext({} as DetailScreenContextData)

export default function DetailScreenProvider({ children }: DetailScreenProviderProps) {

  const [imdbId, setImdbId] = useState("");
  const [postUuid, setPostUuid] = useState("");

  const handleSetImdbId = useCallback((id: string) => {
    setImdbId(id)
  }, [])

  return (
    <DetailScreenContext.Provider
      value={{
        detailMovie: {
          imdbId: imdbId,
          setImdbId: handleSetImdbId,
        },
        commentPost: {
          uuid: postUuid,
          setUuid: setPostUuid,
        }
      }}
    >
      {children}
    </DetailScreenContext.Provider>
  )
}

export function useDetailScreenContext() {
  return useContext(DetailScreenContext)
}
