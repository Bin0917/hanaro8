import { SearchIcon } from 'lucide-react';

// app/(page)/SearchBar.tsx (Server Component)
export default function SearchForm({ q = '' }: { q?: string }) {
  return (
    <form method="GET" className="flex gap-2">
      <input
        name="q"
        defaultValue={q}
        placeholder="Search.."
        className="w-full rounded border px-3 py-2 shadow-xs"
      />
      <button type="submit" className="rounded p-3">
        <SearchIcon />
      </button>
    </form>
  );
}
