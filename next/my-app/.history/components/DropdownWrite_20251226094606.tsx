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

const FOLDERS = [
  { id: 1, name: '공지사항' },
  { id: 2, name: '자유게시판' },
  { id: 3, name: '앨범', type: 'file' },
];

type Folder = {
  id: number;
  name: string;
  type?: 'text' | 'file;';
};

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
          {FOLDERS.map((folder) => { return (
            <DropdownMenuRadioItem value={position} key={folder.id} onClick={}>
              {folder.name}
            </DropdownMenuRadioItem>
          )})}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
