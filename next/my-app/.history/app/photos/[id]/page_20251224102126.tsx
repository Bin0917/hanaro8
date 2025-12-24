import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { blurDataURL } from '@/app/(routes)/hi/constants';
import type { photoProps } from '../page';

// //
// export const dynamicParams = false;
// export const generateStaticParams = async () => {
//   const photos: Awaited<photoProps[]> = await fetch(
//     `https://picsum.photos/v2/list?limit=${10}`,
//     { cache: 'no-store' },
//   ).then((res) => res.json());

//   // [{id: '0'}, {id: '1'}, ... ]
//   return photos.map(({ id }) => ({ id }));
// };

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
        blurDataURL={blurDataURL}
      />
      <Link href="/photos">To Photos</Link>
      <h2>{photo.download_url}</h2>
    </>
  );
}
