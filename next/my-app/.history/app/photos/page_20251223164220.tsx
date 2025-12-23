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

// 중복되는로직 함수로 빼기!!!
const getFetch = (n: number = 10): Promise<photoProps[]> =>
  fetch('https://picsum.photos/v2/list?limit=9').then((res) => res.json());
export default function Photos() {
  //   const data = fetch('https://picsum.photos/v2/list?limit=9').then((res) =>
  //     res.json(),
  //   );
  const photos = use(getFetch());
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2">
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
