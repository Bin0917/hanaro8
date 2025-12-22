'use client';

export default function SayHello({ name }: { name: string }) {
  return <button onClick={() => alert(`hello ${name}`)}>Hello, {name}</button>;
}
