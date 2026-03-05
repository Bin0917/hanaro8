import SearchForm from '@/components/SearchForm';
import { getSearchedUsers } from '@/lib/posts.action';

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function UserList({ searchParams }: Props) {
  const q = (await searchParams)?.q ?? '';

  const users = await getSearchedUsers(q);
  return (
    <div className="space-y-2">
      <SearchForm q={q} />
      <div className="rounded-md p-5 shadow-md">
        <div className="border-b pb-2 text-2xl">User List</div>
        <ol className="list-inside list-decimal">
          {users.map((user) => (
            <li key={user.id} className="p-3">
              {user.name}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
