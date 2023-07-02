import { ReactNode, createContext, useCallback, useContext, useState } from "react";


interface MovieDetailContextData {
  imdbId: string;
  setImdbId(imbdId: string): void;
}

interface MovieDetailProviderProps {
  children: ReactNode;
}

const MovieDetailContext = createContext({} as MovieDetailContextData)

export default function MovieDetailProvider({ children }: MovieDetailProviderProps) {

  const [imdbId, setImdbId] = useState("");

  const handleSetImdbId = useCallback((id: string) => {
    setImdbId(id)
  }, [])

  return (
    <MovieDetailContext.Provider
      value={{
        imdbId: imdbId,
        setImdbId: handleSetImdbId
      }}
    >
      {children}
    </MovieDetailContext.Provider>
  )
}

export function useMovieDetailContext() {
  return useContext(MovieDetailContext)
}
