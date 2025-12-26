'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type CsProp = {
  name: string;
  label: string;
  type: 'check' | 'switch';
  checkValue: string; // 변경요망
  variant: 'destructive' | 'muted' | 'secondary' | 'default';
};

export default function CheckSwitch({
  name,
  label,
  type,
  checkValue,
  variant,
}: CsProp) {
  <DropdownMenu onOpenChange={toggleOpen}>
    <DropdownMenuTrigger asChild>
      <Button variant={'outline'}>
        {folder.name}
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>게시판 선택</DropdownMenuLabel>
      <DropdownMenuSeparator />
      {FOLDERS.map((folder) => (
        <DropdownMenuItem key={folder.id} onClick={() => setFolder(folder)}>
          {folder.name}
        </DropdownMenuItem>
      ))}
    </DropdownMenuContent>
  </DropdownMenu>;
}
