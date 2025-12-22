import Link from 'next/link';

export default function HelloLayout() {
  return (
    <>
      <h1>hello layout</h1>
      <Link href={'/'}>HOme</Link>
    </>
  );
}
