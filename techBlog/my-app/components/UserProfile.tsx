'use client';

import { redirect } from 'next/navigation';
import type { Session } from 'next-auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { logout } from '@/lib/sign.action';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const DummyProfileImage = '/profile_dummy.png';

export default function UserProfile({ data }: { data: Session }) {
  if (!data || !data.user) redirect('/sign');

  const profileImg = data.user.image || DummyProfileImage;
  const isMobile = useIsMobile();
  const { isadmin } = data.user;

  const Comp = isMobile
    ? { comp: Popover, trigger: PopoverTrigger, content: PopoverContent }
    : { comp: HoverCard, trigger: HoverCardTrigger, content: HoverCardContent };
  return (
    <Comp.comp>
      <Comp.trigger asChild>
        <Button
          variant="ghost"
          className="touch-none md:pointer-events-auto md:touch-auto"
          aria-label="프로필"
        >
          <Avatar>
            <AvatarImage src={profileImg} alt="유저이미지" />
          </Avatar>
        </Button>
      </Comp.trigger>
      <Comp.content side="right" className="w-auto max-w-80">
        <div className="flex justify-between gap-1">
          <div className="w-20">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profileImg} />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
          </div>
          <div className="shrink-0 space-y-1 text-center">
            <h4 className="font-semibold text-sm">@{data.user.name}</h4>
            <p className="text-muted-foreground text-sm">{data.user.email}</p>

            {isadmin && <p className="font-semibold text-blue-500">ADMIN</p>}

            <Button
              onClick={async () => {
                await logout();
              }}
              variant={'outline'}
              aria-label="로그아웃"
            >
              LogOut
            </Button>
          </div>
        </div>
      </Comp.content>
    </Comp.comp>
  );
}
