import Image from 'next/image';
import { use } from 'react';
import type { photoProps } from '../page';

export default function PhotoPage({
  param,
}: {
  param: Promise<{ id: string }>;
}) {
  const { id } = use(param);
  const data = fetch(`https://picsum.photos/id/${id}/info`).then((res) =>
    res.json(),
  );
  const photo: photoProps = use(data);
  return (
    <>
      <h1>{photo.author}</h1>
      <Image
        src={photo.download_url}
        width={300}
        height={300}
        alt={photo.author}
      />
      <h2>{photo.download_url}</h2>
    </>
  );
}
