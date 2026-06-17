import { postToBff } from "@/lib/bff";

export type RegisterFormData = {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    phone: string;
    address: string;
    region: string;
    comuna: string;
    acceptTerms: boolean;
};

// Modificamos la respuesta para que se adapte a lo que suele retornar Spring
export type RegisterResponse = {
    id?: number;
    name?: string;
    email?: string;
};

export const authService = {
    /**
     * Envía los datos transformándolos al formato exacto del DTO UserCreateRequest
     */
    register: async (formData: Omit<RegisterFormData, "confirmPassword" | "acceptTerms">) => {
        // Mapeo Espejo hacia el DTO de Java
        const userCreateRequest = {
            name: formData.fullName, // <--- Cambiado de fullName a name para tu DTO
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
            region: formData.region,
            comuna: formData.comuna
        };

        return await postToBff<RegisterResponse>("/api/register", userCreateRequest);
    }
};