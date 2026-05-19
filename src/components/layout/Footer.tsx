export function Footer() {
  return (
    <footer className=" bg-black mt-auto relative z-20">
      <div className="max-w-5xl mx-auto px-4 py-1 text-center">
        <p className="text-white text-xs leading-relaxed">
          &copy; {new Date().getFullYear()} Anglo Penca — Néstor Lesna & Departamento de Tecnología e Innovación de Anglo
        </p>
      </div>
    </footer>
  )
}
