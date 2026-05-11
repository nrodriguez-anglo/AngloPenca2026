export function Footer() {
  return (
    <footer className="border-t border-border bg-zinc-800 mt-auto">
      <div className="max-w-5xl mx-auto px-4 py-3 text-center">
        <p className="text-zinc-300 text-xs leading-relaxed">
          &copy; {new Date().getFullYear()} Anglo Penca — Néstor Lesna & Departamento de Tecnología e Innovación de Anglo
        </p>
      </div>
    </footer>
  )
}
