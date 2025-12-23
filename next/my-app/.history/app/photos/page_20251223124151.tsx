import Image from 'next/image';
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
    <div className="grid grid-cols-9">
      {photos.map((photo: Props) => {
        <Image src={photo.download_url} width={150} height={150} alt="ph" />;
      })}
    </div>
  );
}
