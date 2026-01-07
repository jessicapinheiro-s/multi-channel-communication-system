import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FormRegisterLogin from "../components/form-resgiter-login/Form-resgiter-login";
import type { FormData } from "../components/form-resgiter-login/Form-resgiter-login";

import { useUserStore } from "../../stores/user";
import LoadingModal from "../components/modals/Loanding-modal";
interface LoginDataProps extends FormData {}
export default function Login() {
    const navigate = useNavigate();
    const ambiente = import.meta.env.VITE_AMBIENTE_API;
    const [isLoanding, setIsLoading] = useState(false);
    const { setUser } = useUserStore();
    const handleLoggin = async (data: LoginDataProps) => {
        const obj_to_login = {
            email: data.email,
            password: data.password
        }
        try {
            setIsLoading(true);
            const response = await fetch(`${ambiente}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(obj_to_login)
            });

            if (!response.ok) {
                console.error('Failed to login:', response.statusText);
                throw new Error('Failed to login');
            }
            const responseData = await response.json();
            const user = responseData;
            if(user) {
                setUser(user);
            }
            navigate('/dashboard-admin');
            console.log('Login successful, user:', user);


        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <main className="min-h-screen flex flex-col items-center justify-center">
            <FormRegisterLogin
                handleSubmitFun={handleLoggin}
                type="login"
            />

            <LoadingModal open={isLoanding} message="Logando.." />

        </main>
    )
}