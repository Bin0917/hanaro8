type Props = {
  params: Promise<{ time: string }>;
};

export default function Hi({ params }: Props) {
  const { time } = use(params);
}
