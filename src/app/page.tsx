import Image from "next/image";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col container">
      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl py-5 mt-20">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum
        justo dui, eu ullamcorper leo euismod id.
      </h1>
      <p className="text-xl text-muted-foreground tracking-tight">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum
        justo dui, eu ullamcorper leo euismod id. Maecenas ipsum metus,
        consequat non neque at, porta dictum ipsum. Mauris id tempus metus. Nunc
        at malesuada turpis,
      </p>
    </section>
  );
}
