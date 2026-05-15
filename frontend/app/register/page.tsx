"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Heart, UserCircle } from "lucide-react";
import { extractErrorMessage, postToBff } from "../../lib/bff";
import { rememberUser, setCurrentSessionUser } from "../../lib/session";

type FormData = {
	fullName: string;
	email: string;
	password: string;
	confirmPassword: string;
	acceptTerms: boolean;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

type StoredUser = {
	fullName: string;
	email: string;
	createdAt: string;
};

type RegisterResponse = {
	id?: number;
	name?: string;
	email?: string;
};

const initialFormData: FormData = {
	fullName: "",
	email: "",
	password: "",
	confirmPassword: "",
	acceptTerms: false,
};

export default function RegisterPage() {
	const router = useRouter();
	const [formData, setFormData] = useState<FormData>(initialFormData);
	const [errors, setErrors] = useState<FormErrors>({});
	const [statusMessage, setStatusMessage] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const validateForm = () => {
		const nextErrors: FormErrors = {};

		if (!formData.fullName.trim()) {
			nextErrors.fullName = "Ingresa tu nombre completo.";
		}

		if (!formData.email.trim()) {
			nextErrors.email = "Ingresa un correo electrónico.";
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
			nextErrors.email = "Ingresa un correo con formato válido.";
		}

		if (formData.password.length < 8) {
			nextErrors.password = "Tu contraseña debe tener al menos 8 caracteres.";
		}

		if (formData.confirmPassword !== formData.password) {
			nextErrors.confirmPassword = "Las contraseñas no coinciden.";
		}

		if (!formData.acceptTerms) {
			nextErrors.acceptTerms = "Debes aceptar los términos para continuar.";
		}

		return nextErrors;
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const nextErrors = validateForm();
		setErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) {
			setIsSubmitted(false);
			setStatusMessage("Hay errores en el formulario. Revisa los campos marcados.");
			return;
		}

		const userToStore: StoredUser = {
			fullName: formData.fullName.trim(),
			email: formData.email.trim().toLowerCase(),
			createdAt: new Date().toISOString(),
		};

		try {
			const response = await postToBff<RegisterResponse>("/api/register", {
				fullName: userToStore.fullName,
				email: userToStore.email,
				password: formData.password,
			});

			if (!response.ok) {
				const fallbackMessage = `No se pudo completar el registro (${response.status}).`;
				const message = extractErrorMessage(response.body, fallbackMessage);
				setErrors({ email: message });
				setIsSubmitted(false);
				setStatusMessage(message);
				return;
			}

			rememberUser(userToStore);
			setCurrentSessionUser(userToStore);
		} catch {
			setErrors({ email: "Hubo un problema al conectar con el BFF." });
			setIsSubmitted(false);
			setStatusMessage("Hubo un problema al conectar con el BFF.");
			return;
		}

		setIsSubmitted(true);
		setErrors({});
		setFormData(initialFormData);

		setTimeout(() => {
			router.push("/");
		}, 1000);
	};

	return (
		<main className="min-h-screen bg-white">
			<a
				href="#register-form"
				className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-blue-700 focus:outline focus:outline-2 focus:outline-blue-700"
			>
				Saltar al formulario de registro
			</a>

			<nav className="sticky top-0 z-50 flex items-center justify-between border-b bg-white px-8 py-4">
				<Link
					href="/"
					className="flex items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
					aria-label="Ir al inicio de Donaton"
				>
					<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 font-bold text-white">
						D
					</div>
					<span className="text-xl font-bold tracking-tight text-gray-800">Donaton</span>
				</Link>

				<div className="flex items-center gap-6">
					<div className="hidden gap-6 text-sm font-medium text-gray-600 md:flex">
						<a href="/about-us" className="transition hover:text-blue-600 focus-visible:text-blue-600">
							Acerca de Nosotros
						</a>
					</div>

					<div className="flex items-center gap-3 border-l pl-6">
						<Link
							href="/login"
							className="rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:text-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
						>
							Iniciar sesión
						</Link>
						<span
							className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm"
							aria-current="page"
						>
							<UserCircle size={18} aria-hidden="true" />
							Registrarse
						</span>
					</div>
				</div>
			</nav>

			<section className="relative bg-blue-600 px-6 py-16 text-white">
				<div className="mx-auto flex max-w-6xl flex-col gap-10 lg:flex-row lg:items-start">
					<div className="max-w-2xl pt-2 lg:w-1/2">
						<div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
							<Heart className="text-yellow-400" size={28} fill="currentColor" aria-hidden="true" />
						</div>
						<h1 className="text-4xl font-extrabold leading-tight md:text-5xl">
							Crea tu cuenta en Donaton
						</h1>
						<p className="mt-5 max-w-xl text-lg opacity-95">
							Completa el registro para gestionar tus donaciones, seguir campañas y ver el impacto de tu ayuda en tiempo real.
						</p>
					</div>

					<div className="lg:w-1/2">
						<div className="rounded-2xl bg-white p-6 text-gray-900 shadow-2xl md:p-8">
							<h2 className="text-2xl font-bold">Registro de usuario</h2>
							<p className="mt-2 text-sm text-gray-600">Todos los campos son obligatorios.</p>

							<p
								role="status"
								aria-live="polite"
								className={`mt-4 rounded-md border px-3 py-2 text-sm ${
									statusMessage
										? isSubmitted
											? "border-green-300 bg-green-50 text-green-800"
											: "border-red-300 bg-red-50 text-red-800"
										: "sr-only"
								}`}
							>
								{statusMessage}
							</p>

							<form id="register-form" className="mt-6 space-y-5" noValidate onSubmit={handleSubmit}>
								<div>
									<label htmlFor="fullName" className="mb-1.5 block text-sm font-semibold">
										Nombre completo
									</label>
									<input
										id="fullName"
										name="fullName"
										type="text"
										autoComplete="name"
										value={formData.fullName}
										onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))}
										aria-invalid={Boolean(errors.fullName)}
										aria-describedby={errors.fullName ? "fullName-error" : undefined}
										className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
										placeholder="Ej: Laura Martínez"
										required
									/>
									{errors.fullName && (
										<p id="fullName-error" className="mt-1.5 text-sm font-medium text-red-700">
											{errors.fullName}
										</p>
									)}
								</div>

								<div>
									<label htmlFor="email" className="mb-1.5 block text-sm font-semibold">
										Correo electrónico
									</label>
									<input
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										value={formData.email}
										onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
										aria-invalid={Boolean(errors.email)}
										aria-describedby={errors.email ? "email-error" : undefined}
										className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
										placeholder="tu.correo@ejemplo.com"
										required
									/>
									{errors.email && (
										<p id="email-error" className="mt-1.5 text-sm font-medium text-red-700">
											{errors.email}
										</p>
									)}
								</div>

								<div>
									<label htmlFor="password" className="mb-1.5 block text-sm font-semibold">
										Contraseña
									</label>
									<input
										id="password"
										name="password"
										type="password"
										autoComplete="new-password"
										value={formData.password}
										onChange={(event) => setFormData((prev) => ({ ...prev, password: event.target.value }))}
										aria-invalid={Boolean(errors.password)}
										aria-describedby="password-hint password-error"
										className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
										placeholder="Mínimo 8 caracteres"
										required
									/>
									<p id="password-hint" className="mt-1.5 text-xs text-gray-600">
										Usa al menos 8 caracteres combinando letras, números y símbolos.
									</p>
									{errors.password && (
										<p id="password-error" className="mt-1.5 text-sm font-medium text-red-700">
											{errors.password}
										</p>
									)}
								</div>

								<div>
									<label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-semibold">
										Confirmar contraseña
									</label>
									<input
										id="confirmPassword"
										name="confirmPassword"
										type="password"
										autoComplete="new-password"
										value={formData.confirmPassword}
										onChange={(event) =>
											setFormData((prev) => ({ ...prev, confirmPassword: event.target.value }))
										}
										aria-invalid={Boolean(errors.confirmPassword)}
										aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
										className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
										placeholder="Repite tu contraseña"
										required
									/>
									{errors.confirmPassword && (
										<p id="confirmPassword-error" className="mt-1.5 text-sm font-medium text-red-700">
											{errors.confirmPassword}
										</p>
									)}
								</div>

								<div>
									<div className="flex items-start gap-3">
										<input
											id="acceptTerms"
											name="acceptTerms"
											type="checkbox"
											checked={formData.acceptTerms}
											onChange={(event) =>
												setFormData((prev) => ({ ...prev, acceptTerms: event.target.checked }))
											}
											aria-invalid={Boolean(errors.acceptTerms)}
											aria-describedby={errors.acceptTerms ? "acceptTerms-error" : "acceptTerms-hint"}
											className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
											required
										/>
										<div>
											<label htmlFor="acceptTerms" className="text-sm text-gray-800">
												Acepto los términos y condiciones de Donaton.
											</label>
											<p id="acceptTerms-hint" className="text-xs text-gray-600">
												Puedes leer nuestra política de privacidad antes de continuar.
											</p>
										</div>
									</div>
									{errors.acceptTerms && (
										<p id="acceptTerms-error" className="mt-1.5 text-sm font-medium text-red-700">
											{errors.acceptTerms}
										</p>
									)}
								</div>

								<button
									type="submit"
									className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
								>
									Crear cuenta
								</button>
							</form>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}
