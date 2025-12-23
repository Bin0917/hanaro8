import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  login: ReactNode;
  profile: ReactNode;
};

export default function ParallelLayout({ children, login, profi;e }: Props) {
  return <div className="">
    <div className="">{children}</div>
    <div className="grid"><div>{login}</div>
    <div>{profile}</div>
    </div>
  </div>;
}
