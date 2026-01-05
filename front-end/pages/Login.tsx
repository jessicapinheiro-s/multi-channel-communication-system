import { useNavigate } from "react-router-dom";
import FormRegisterLogin from "../components/form-resgiter-login/form-resgiter-login"
import { useState } from "react";
import LoadingModal from "../components/modals/loanding-modal";

interface LoginDataProps {
    email: string;
    password: string;

}
export default function Login() {
    const navigate = useNavigate();
    const ambiente = import.meta.env.VITE_AMBIENTE_API;
    const [isLoanding, setIsLoading] = useState(false);
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

            console.log('Login successful, user:', user);


        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <main className="flex flex-col items-center justify-center">
            <FormRegisterLogin
                handleSubmitFun={handleLoggin}
                type="login"
            />

            <LoadingModal open={isLoanding} message="Registering user..." />

        </main>
    )
}