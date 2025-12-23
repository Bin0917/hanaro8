import { use } from 'react';

type Props = {
  param: Promise<{ slug: number[] | string[] }>;
};

export default function Shop({ param }: Props) {
  const { slug } = use(param);
  return <>Slugs : {slug}</>;
}
