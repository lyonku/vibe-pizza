export default function ProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <div className="">Продукт {id}</div>;
}
