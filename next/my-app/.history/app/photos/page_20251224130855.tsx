'use cache';
import { cacheLife } from 'next/cache';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

export type photoProps = {
  id: string;
  author: string;
  width: number;
  height: number;
  download_url: string;
};

// cache no-store일때 ㅣ거 건다고 무조건 static 되는거 아님.
// cache 조건 없애거나 force-cache로 바꿔야함
// export const revalidate = 86400; // sec 단위(1일임 이건)

// 중복되는로직 함수로 빼기!!!
const getFetch = (n: number = 20): Promise<photoProps[]> =>
  fetch(`https://picsum.photos/v2/list?limit=${n}`).then((res) => res.json());
export default async function Photos() {
  cacheLife('minutes');

  //   const data = fetch('https://picsum.photos/v2/list?limit=9').then((res) =>
  //     res.json(),
  //   );
  const photos = use(getFetch());
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {photos.map((photo: photoProps) => {
        return (
          <Link
            key={photo.id}
            href={`/photos/${photo.id}`}
            className="opacity-80 duration-200 hover:scale-105"
          >
            <Image
              src={photo.download_url}
              width={200}
              height={200}
              alt={photo.author}
            />
          </Link>
        );
      })}
    </div>
  );
}
