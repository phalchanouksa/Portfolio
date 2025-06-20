export default function Home() {
  return (
    <section className="text-center space-y-4">
      <h1 className="text-3xl font-bold">Hi, I&apos;m Jane Doe</h1>
      <p className="max-w-xl mx-auto">
        Welcome to my personal portfolio built with Next.js. Here you&apos;ll find
        my latest projects and writings.
      </p>
      <div className="flex justify-center gap-4">
        <a href="https://github.com" className="text-blue-600 hover:underline">GitHub</a>
        <a href="https://twitter.com" className="text-blue-600 hover:underline">Twitter</a>
      </div>
    </section>
  );
}
