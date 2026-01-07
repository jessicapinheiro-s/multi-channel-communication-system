import { useState } from "react";

import { useNavigate } from "react-router-dom";
import FormRegisterLogin from "../components/form-resgiter-login/Form-resgiter-login";
import LoadingModal from "../components/modals/Loanding-modal";
interface RegisterDataProps {
    name?: string;
    email: string;
    password?: string;
    phone?: string;
}
export default function Register() {
    const navigate = useNavigate();
    const ambiente = import.meta.env.VITE_AMBIENTE_API;
    const [isLoanding, setIsLoading] = useState(false);
    const handleRegister = async (data: RegisterDataProps) => {
        const obj_to_create = {
            name: data.name || '',
            email: data.email,
            phone: data.phone || '',
            preferences: ''
        }
        try {
            setIsLoading(true);
            const response = await fetch(`${ambiente}/recipients/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj_to_create),
            });
            if (!response.ok) {
                console.error('Failed to register user:', response.statusText);
                throw new Error('Failed to register');
            }
            navigate('/login');

        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center">
            <FormRegisterLogin handleSubmitFun={handleRegister} type="register" />
            <LoadingModal open={isLoanding} message="Criando usuário.." />
        </main>
    );
}
