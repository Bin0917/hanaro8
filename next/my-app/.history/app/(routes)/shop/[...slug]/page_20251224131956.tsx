import { use } from 'react';

type Props = {
  params: Promise<{ slug: number[] | string[] }>;
};

export const generateStaticParams = () => [
  {
    slug: ['X'],
  },
];

// dynamic seg 에서 진화한 catch-all seg
export default function Shop({ params }: Props) {
  const { slug } = use(params);
  return <>Slugs : {JSON.stringify(slug)}</>;
}
