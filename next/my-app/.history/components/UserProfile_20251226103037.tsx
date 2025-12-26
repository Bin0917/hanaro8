import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

export default function UserProfile() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button
          variant="link"
          className="touch-none md:pointer-events-auto md:touch-auto"
        >
          <Avatar>
            <AvatarImage src={DummyProfileImage} />
            <AvatarFallback className="text-xl">
              {'guest'.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </HoverCardTrigger>
      <HoverCardContent side="right" className="w-auto max-w-80">
        <div className="flex justify-between gap-1">
          <div className="w-20">
            <Avatar className="h-16 w-16">
              <AvatarImage src={DummyProfileImage} className="" />
              <AvatarFallback>DP</AvatarFallback>
            </Avatar>
          </div>
          <div className="shrink-0 space-y-1">
            <h4 className="font-semibold text-sm">@guest</h4>
            <p className="text-muted-foreground text-sm">guest@gmail.com</p>
            <div className="text-muted-foreground text-xs">
              {12} Books
              {23} Marks 00 Followers
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
