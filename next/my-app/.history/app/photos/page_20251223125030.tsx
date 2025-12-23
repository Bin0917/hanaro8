import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';

type Props = {
  id: string;
  author: string;
  width: string;
  height: string;
  url: string;
  download_url: string;
};

export default function Photos() {
  const data = fetch('https://picsum.photos/v2/list?limit=9').then((res) =>
    res.json(),
  );
  const photos = use(data);
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-2">
      {photos.map((photo: Props) => {
        return (
          <Link key={photo.id} href={`photos/${photo.id}`}>
            <Image src={photo.download_url} width={200} height={200} alt="ph" />
          </Link>
        );
      })}
    </div>
  );
}
