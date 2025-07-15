  export function SetAuthor(author: string, source: string) {
    if (author === null) {
      return <p className="my-2 font-semibold">Source: { source }</p>
    } else {
      return <p className="my-2 font-semibold">{author} | Source : {source}</p>
    }
  }