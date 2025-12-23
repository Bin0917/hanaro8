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
      <h1>photo.</h1>
    </>
  );
}
