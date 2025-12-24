import Image from 'next/image';
import { use } from 'react';
import type { photoProps } from '../page';

export default function PhotoPage({
  params, // 얘는 params로 고정!! 이름 바꾸면 next가 인식을 몬함
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const data = fetch(`https://picsum.photos/id/${id}/info`).then((res) =>
    res.json(),
  );
  const photo: photoProps = use(data);
  return (
    <>
      <h1>{photo.author}</h1>
      <Image
        src={photo.download_url}
        width={photo.width}
        height={photo.height}
        alt={photo.author}
      />
      <h2>{photo.download_url}</h2>
    </>
  );
}
