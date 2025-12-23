import type { ReactNode } from 'react';

type Props = {
  modal: ReactNode;
  children: ReactNode;
};

export default function photoLayout({ modal, children }: Props) {
  return (
    <>
      <div>{modal}</div>
      <div>{children}</div>
    </>
  );
}
