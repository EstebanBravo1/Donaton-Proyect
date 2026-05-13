export default function AboutUsPage() {
	return (
		<div className="min-h-screen bg-white text-gray-900">
			<a
				href="#main-content"
				className="sr-only focus:not-sr-only inline-block p-2 m-2 bg-sky-600 text-white rounded focus:outline-2 focus:outline-offset-2 focus:outline-sky-800"
				aria-label="Saltar al contenido principal"
			>
				Saltar al contenido
			</a>

			<header className="bg-gradient-to-r from-sky-600 to-indigo-600 text-white">
				<div className="max-w-6xl mx-auto px-6 py-12">
					<div className="flex flex-col md:flex-row items-center justify-between gap-6">
						<div>
							<h1 className="text-3xl font-bold">Donaton</h1>
							<p className="mt-1 text-sky-100">Conectando donantes con causas reales</p>
						</div>
						<nav aria-label="Acciones principales">
							<a
								href="/register"
								className="inline-block bg-white text-sky-700 font-semibold px-4 py-2 rounded shadow focus-visible:outline-2 focus-visible:outline-white"
							>
								Únete
							</a>
						</nav>
					</div>
				</div>
			</header>

			<main id="main-content" role="main" aria-labelledby="about-heading" tabIndex={-1}>
				<section className="max-w-6xl mx-auto px-6 py-12">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
						<div>
							<h2 id="about-heading" className="text-4xl font-extrabold text-gray-900">
								Acerca de nosotros
							</h2>
							<p className="mt-4 text-lg text-gray-700">
								Donaton facilita donaciones seguras y transparentes para organizaciones y
								proyectos sociales. Diseñamos para la inclusión: navegación por teclado,
								foco visible y colores con contraste suficiente.
							</p>
						</div>

						<div className="mx-auto" aria-hidden="true">
							<svg width="360" height="240" viewBox="0 0 360 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-md">
								<rect width="360" height="240" rx="12" fill="#E6F6FF" />
								<circle cx="80" cy="80" r="36" fill="#06B6D4" />
								<rect x="140" y="50" width="160" height="28" rx="6" fill="#7DD3FC" />
								<rect x="140" y="90" width="120" height="16" rx="4" fill="#BAE6FD" />
								<rect x="140" y="116" width="100" height="16" rx="4" fill="#BAE6FD" />
							</svg>
						</div>
					</div>
				</section>

				<section className="bg-gray-50 py-10">
					<div className="max-w-6xl mx-auto px-6">
						<h3 className="text-2xl font-semibold text-gray-900">Qué hacemos</h3>
						<div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
							<article className="bg-white p-5 rounded shadow-sm focus-within:ring-2 focus-within:ring-sky-600">
								<h4 className="font-semibold">Conexión</h4>
								<p className="mt-2 text-sm text-gray-600">Unimos donantes con proyectos verificados.</p>
							</article>

							<article className="bg-white p-5 rounded shadow-sm focus-within:ring-2 focus-within:ring-sky-600">
								<h4 className="font-semibold">Transparencia</h4>
								<p className="mt-2 text-sm text-gray-600">Seguimiento claro del destino de las donaciones.</p>
							</article>

							<article className="bg-white p-5 rounded shadow-sm focus-within:ring-2 focus-within:ring-sky-600">
								<h4 className="font-semibold">Accesibilidad</h4>
								<p className="mt-2 text-sm text-gray-600">Diseño inclusivo para todas las personas.</p>
							</article>
						</div>
					</div>
				</section>

				<section className="max-w-6xl mx-auto px-6 py-10">
					<h3 className="text-xl font-semibold">Contacto</h3>
					<p className="mt-2 text-gray-700">Escríbenos a <a href="mailto:info@donatonproyect.org" className="text-sky-600 underline">info@donatonproyect.org</a></p>
				</section>
			</main>

			<footer className="bg-white border-t mt-8">
				<div className="max-w-6xl mx-auto px-6 py-6 text-sm text-gray-600">
					<p>© {new Date().getFullYear()} Donaton. Todos los derechos reservados.</p>
				</div>
			</footer>
		</div>
	);
}
