import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  login: ReactNode;
  profile: ReactNode;
};

export default function ParallelLayout({ children, login, profile }: Props) {
  return (
    <div className="">
      <div className="">{children}</div>
      <div className="grid grid-cols-2">
        <div className="border">{login}</div>
        <div className="border">{profile}</div>
      </div>
    </div>
  );
}
