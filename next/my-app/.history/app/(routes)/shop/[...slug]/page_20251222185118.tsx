import { use } from 'react';

type Props = {
  param: Promise<{ slug: number[] | string[] }>;
};

// dynamic seg 에서 진화한 catch-all seg
export default function Shop({ param }: Props) {
  const { slug } = use(param);
  return <>Slugs : {JSON.stringify(slug)}</>;
}
