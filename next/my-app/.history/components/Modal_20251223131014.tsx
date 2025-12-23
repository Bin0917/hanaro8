'use client';
import { useRouter } from 'next/navigation';
import { type MouseEventHandler, useEffect, useRef } from 'react';

// 복붙하고 설명해주심
export default function Modal({ children }: { children: React.ReactNode }) {
  const overlay = useRef(null);
  const wrapper = useRef(null);
  const router = useRouter();

  // 주소를 한단계 뒤로 돌려 모달 끄기
  const onDismiss = () => router.back();

  const onClick: MouseEventHandler = (e) => {
    if (e.target === overlay.current || e.target === wrapper.current) {
      onDismiss();
    }
  };
  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onDismiss();
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
    // biome-ignore lint/correctness/useExhaustiveDependencies: 잠시대기
  }, [onKeyDown]);

  return (
    // 까만색 구간 = 모달 바깥쪽!
    // biome-ignore lint/a11y/noStaticElementInteractions: click하면 close!
    // biome-ignore lint/a11y/useKeyWithClickEvents: click하면 close!
    <div
      ref={overlay}
      className="fixed top-0 right-0 bottom-0 left-0 z-10 mx-auto bg-black/60 p-10"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 p-6 sm:w-10/12 md:w-8/12 lg:w-2/5"
      >
        <div className="bg-white p-3">{children}</div>
      </div>
    </div>
  );
}
