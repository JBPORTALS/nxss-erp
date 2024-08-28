export default async function Template(props: { children: React.ReactNode }) {
  return <section className="w-full">{props.children}</section>;
}
