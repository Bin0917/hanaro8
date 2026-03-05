'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useIsMobile } from '@/hooks/use-mobile';
import { logout } from '@/lib/sign.action';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';

const DummyProfileImage = '/profile_dummy.png';

export default function UserProfile() {
  // session프로바이더에 session값을 추가해서 rootlayout에 적용!
  // session cookie에 접근할 수 있게됨
  const { data } = useSession();
  console.log('🚀 ~ UserProfile ~ session:', data);
  if (!data || !data.user) redirect('/sign');

  const profileImg = data.user.image || DummyProfileImage;
  const isMobile = useIsMobile();

  const Comp = isMobile ? Popover : HoverCard;
  const Trigger = isMobile ? PopoverTrigger : HoverCardTrigger;
  const Content = isMobile ? PopoverContent : HoverCardContent;

  //   이렇게 해도 된다~ 객체로 줘도 됨!
  //   const Comp = isMoblie ? {comp: Popover, Trigger: PopoverTrigger, Content: PopoverContent} : {};
  return (
    <Comp>
      {/* <Image src={d} width={200} height={200} alt="xx" /> */}
      <Trigger asChild>
        <Button
          variant="link"
          className="touch-none md:pointer-events-auto md:touch-auto"
        >
          <Avatar>
            <AvatarImage src={profileImg} />
            <AvatarFallback className="text-xl">
              {'guest'.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </Trigger>
      <Content side="right" className="w-auto max-w-80">
        <div className="flex justify-between gap-1">
          <div className="w-20">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profileImg} className="" />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
          </div>
          <div className="shrink-0 space-y-1">
            <h4 className="font-semibold text-sm">@{data.user.name}</h4>
            <p className="text-muted-foreground text-sm">{data.user.email}</p>
            <div className="text-muted-foreground text-xs">
              {12} Books
              {23} Marks 00 Followers
            </div>
            {/* 여기다 server comp  */}
            <Button onClick={logout} variant={'outline'}>
              Logout j
            </Button>
          </div>
        </div>
      </Content>
    </Comp>
  );
}
