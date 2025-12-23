export default function Photos() {
  const data = fetch('https://picsum.photos/v2/list?limit=10').then((res) =>
    res.json(),
  );
}
