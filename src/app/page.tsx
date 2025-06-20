export default function Home() {
  return (
    <section className="text-center space-y-6 py-12">
      <h1 className="text-4xl font-bold font-display">Hi, I&apos;m Jane Doe</h1>
      <p className="max-w-xl mx-auto text-lg">
        Welcome to my personal portfolio built with Next.js. Explore my latest
        writings and thoughts below.
      </p>
      <div className="flex justify-center gap-6">
        <a href="https://github.com" className="hover:text-accent">GitHub</a>
        <a href="https://twitter.com" className="hover:text-accent">Twitter</a>
      </div>
    </section>
  );
}
