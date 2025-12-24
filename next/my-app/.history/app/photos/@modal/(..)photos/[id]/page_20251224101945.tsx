import Image from 'next/image';
import { use } from 'react';
import { blurDataURL } from '@/app/(routes)/hi/constants';
import Modal from '@/components/Modal';
import type { photoProps } from '../../../page';

// dynamic to ssg
export const dynamicParams = false;

export const generateStaticParams = async () => {
  const photos: Awaited<photoProps[]> = await fetch(
    `https://picsum.photos/v2/list?limit=${10}`,
    {
      cache: 'no-store',
    },
  ).then((res) => res.json());

  // [{id: '0'}, {id: '1'}, ... ]
  return photos.map(({ id }) => ({ id }));
};

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
        placeholder="blur"
        blurDataURL={blurDataURL}
      />
      <h2>{photo.author}</h2>
    </Modal>
  );
}
