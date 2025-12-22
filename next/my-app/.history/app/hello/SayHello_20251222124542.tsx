export default function SayHello({ name }: { name: string }) {
  return (
    <button
      className="cursor-pointer rounded-md border p-1"
      onClick={() => alert(`hello ${name}`)}
    >
      Hello, {name}
    </button>
  );
}
