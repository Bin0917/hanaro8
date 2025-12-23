import { use } from "react";

export default function PhotoPage({param}:{param : Promise<{id:string}>}) {
    const {id} = use(param);
    const data = fetch(`https://picsum.photos/id/${}/info`).then((res) =>
        res.json(),
      );
      const photos = use(data);
    return <>
    
    
    </>
}