const projects = [
  { name: 'Project One', description: 'A cool project using Next.js.' },
  { name: 'Project Two', description: 'Another awesome project.' },
];

export default function Projects() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Projects</h1>
      <ul className="space-y-2">
        {projects.map((p) => (
          <li key={p.name}>
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
