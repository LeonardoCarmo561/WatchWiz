import { ReactNode, createContext, useCallback, useContext, useState } from "react";
import { PostContent, WatchedMovie } from "../services/api";


interface DetailScreenContextData {
  detailMovie: {
    imdbId: string;
    setImdbId(imbdId: string): void;
  },
  commentPost: {
    uuid: string;
    setUuid(e: string): void;
  },
  postData: {
    data: PostContent | null;
    setData(value: PostContent): void;
  },
  watchedData: {
    data: WatchedMovie | null,
    setData(e: WatchedMovie): void;
  }
}

interface DetailScreenProviderProps {
  children: ReactNode;
}

const DetailScreenContext = createContext({} as DetailScreenContextData)

export default function DetailScreenProvider({ children }: DetailScreenProviderProps) {

  const [imdbId, setImdbId] = useState("");
  const [postUuid, setPostUuid] = useState("");
  const [postData, setPostData] = useState<PostContent | null>(null);

  const [watchedData, setWatchedData] = useState<WatchedMovie | null>(null)

  const handleSetImdbId = useCallback((id: string) => {
    setImdbId(id)
  }, [])

  const handleSetPostUuid = useCallback((e: string) => {
    setPostUuid(e)
  }, [])

  const handleSetPostData = useCallback((e: PostContent) => {
    setPostData(e)
  }, [])

  const handelSetWatchedData = useCallback((e: WatchedMovie) => {
    setWatchedData(e)
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
          setUuid: handleSetPostUuid,
        },
        postData: {
          data: postData,
          setData: handleSetPostData
        },
        watchedData: {
          data: watchedData,
          setData: handelSetWatchedData
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
