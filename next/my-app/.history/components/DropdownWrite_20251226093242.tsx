'use client';

import { ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function DropdownWrite() {
  const [position, setPosition] = React.useState('공지사항');
  const [isOpen, toggleOpen] = React.useReducer((p) => !p, false);
  return (
    <DropdownMenu onOpenChange={toggleOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {position}
          {isOpen ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="공지사항">
            공지사항
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="뭐시라꼬">
            뭐시라꼬
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="두구두구">
            두구두구
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
