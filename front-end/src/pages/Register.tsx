import { useState } from "react";

import FormRegisterLogin from "../components/form-resgiter-login/Form-resgiter-login";
import LoadingModal from "../components/modals/Loanding-modal";
import { Check } from "lucide-react";
import { Toast } from "@/components";
import type { ToastProps } from "@/types/global-types";
interface RegisterDataProps {
    name?: string;
    email: string;
    password?: string;
    phone?: string;
    preferences?: string;
}
export default function Register() {
    const ambiente = import.meta.env.VITE_AMBIENTE_API;
    const [isLoanding, setIsLoading] = useState(false);
    const [sucessRegister, setSucessRegister] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
    const [toastInfo, setToastInfo] = useState<ToastProps>({
        duration: 1000,
        message: "",
        title: "",
        type: 'success'
    });


    const handleRegister = async (data: RegisterDataProps) => {
        const obj_to_create = {
            name: data.name || '',
            email: data.email,
            phone: data.phone || '',
            preferences: data.preferences || ''
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
            const data = await response.json();

            if (!response.ok) {
                console.error('Failed to register user:', data.error);
                setToastInfo({
                    message: data.error,
                    title: "Failed to register user",
                    type: 'error'
                })
                setToastOpen(true);
            }
            setSucessRegister(true);
            setIsLoading(false);

        } catch (error) {
            console.error('Error during registration:', error);
            setIsLoading(false);
            throw error;
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-center">
            <LoadingModal open={isLoanding} message="Criando usuário.." />
            {
                (sucessRegister && !toastOpen) ? (
                    <div className="min-h-screen flex items-center justify-center bg-white px-4">
                        <div className="w-full max-w-md rounded-xl bg-white p-8 text-center shadow-lg">
                            <div className="mb-4 flex flex-col items-center justify-center">
                                <div className="p-2 rounded-lg bg-green-600">
                                    <Check size={40} color="white" />
                                </div>
                            </div>

                            <h1 className="mb-3 text-2xl font-semibold text-gray-800">
                                Registration Successful!
                            </h1>

                            <p className="mb-6 text-sm leading-relaxed text-gray-600">
                                You have been registered in our system. You are now able to receive warning notifications.
                                <br />
                            </p>

                            <p className="mt-6 text-xs text-gray-400">
                                Your data is protected and handled securely.
                            </p>
                        </div>
                    </div>
                ) : (
                    <FormRegisterLogin handleSubmitFun={handleRegister} type="register" />
                )
            }

            <Toast open={toastOpen} duration={toastInfo.duration} message={toastInfo.message} title={toastInfo.title} type={toastInfo.type} />
        </main>
    );
}
