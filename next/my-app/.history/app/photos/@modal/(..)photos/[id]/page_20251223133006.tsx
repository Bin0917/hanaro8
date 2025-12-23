import Image from 'next/image';
import { use } from 'react';
import Modal from '@/components/Modal';
import type { photoProps } from '../../page';

export default function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const data = fetch(`https://picsum.photos/id/${id}/info`).then((res) =>
    res.json(),
  );
  const photo: photoProps = use(data);
  return (
    <Modal>
      <Image
        src={photo.download_url}
        width={400}
        height={400}
        alt={photo.author}
      />
      <h2>{photo.author}</h2>
    </Modal>
  );
}
