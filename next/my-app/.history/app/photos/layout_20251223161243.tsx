import type { ReactNode } from 'react';

type Props = {
  modal: ReactNode;
  children: ReactNode;
};

export default function photoLayout({ modal, children }: Props) {
  return (
    <>
      <h1 className="text-center text-xl">Photos</h1>
      <div>{modal}</div>
      <div>{children}</div>
    </>
  );
}
