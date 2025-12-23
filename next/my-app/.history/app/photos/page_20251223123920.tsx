import Image from 'next/image';
import { use } from 'react';

export default function Photos() {
  const data = fetch('https://picsum.photos/v2/list?limit=9').then((res) =>
    res.json(),
  );
  const photos = use(data);
  return (
    <div className="grid grid-cols-9">
      {photos.map((photo) => {
        <Image src={photo.download_url} />;
      })}
    </div>
  );
}
