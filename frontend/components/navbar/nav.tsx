import Link from "next/link";
import { LogIn, LogOut, UserCircle } from "lucide-react";
import type { SessionUser } from "../../types/session";

export default function Nav({ user, onLogout }: { user?: SessionUser; onLogout?: () => void }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-b bg-white px-8 py-4">
      <Link href="/" className="flex items-center gap-2 rounded-md ...">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">D</div>
        <span className="text-xl font-bold tracking-tight text-gray-800">Donaton</span>
      </Link>

      <div className="flex items-center gap-6">
        <div className="hidden gap-6 text-sm font-medium text-gray-600 md:flex">
          <a href="/about-us" className="transition hover:text-blue-600">Acerca de Nosotros</a>
        </div>

        <div className="flex items-center gap-3 border-l pl-6">
          {!user ? (
            <>
              <Link href="/login" className="flex items-center gap-2 ...">
                <LogIn size={18} /> Iniciar sesión
              </Link>
              <Link href="/register" className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white">
                <UserCircle size={18} /> Registrarse
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Hola, {user.fullName}</span>
              <button onClick={onLogout} className="flex items-center gap-2 ...">
                <LogOut size={18} /> Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}