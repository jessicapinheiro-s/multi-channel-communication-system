import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IMaskInput } from "react-imask";
import { Link } from "react-router-dom";

interface PropsData {
    type: "register" | "login";
    handleSubmitFun: (data: FormData) => Promise<any> | void;
}

export type FormData = {
    name?: string;
    email: string;
    password?: string;
    phone?: string;
    preferences?: string;
};

const loginSchema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const registerSchema = yup.object({
    name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    phone: yup.string().required("Phone number is required"),
    preferences: yup.string().optional(),
});

export default function FormRegisterLogin({ type, handleSubmitFun }: PropsData) {
    const chosenResolver = type === "register" ? yupResolver(registerSchema) : yupResolver(loginSchema);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: chosenResolver as any,
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
            preferences: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        if(type === "register" && (!data.email || !data.name || !data.phone || !data.preferences)) {
            console.error("Há propriedades vazias", data);
            return;
        }

        if(type === "login" && (!data.email || !data.password)) {
            console.error("Há propriedades vazias", data);
            return;
        }
        await handleSubmitFun(data);
    };

    return (
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8 text-gray-900"
            >
                <div className="mb-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-700">{type === "login" ? "Welcome back" : "Create your account"}</h1>
                    <p className="text-sm text-gray-500 mt-1">{type === "login" ? "Sign in to continue to the dashboard" : "Enter your details to receive messages"}</p>
                </div>

                <div className="flex flex-col gap-4">
                    {type === "register" && (
                        <>
                            <label className="text-sm font-medium text-gray-700">Name</label>
                            <input
                                {...register("name")}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                type="text"
                                placeholder="Your full name"
                                aria-label="name"
                            />
                            {errors.name && <p className="text-sm text-red-500">{(errors.name as any).message}</p>}

                            <label className="text-sm font-medium text-gray-700">Phone</label>
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <IMaskInput
                                        {...field}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                        mask="+55 (00) 00000-0000"
                                        placeholder="Phone Number"
                                        onAccept={(value: any) => field.onChange(value)}
                                    />
                                )}
                            />
                            {errors.phone && <p className="text-sm text-red-500">{(errors.phone as any).message}</p>}

                            <label className="text-sm font-medium text-gray-700">Preferences</label>
                            <input
                                {...register("preferences")}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                type="text"
                                placeholder="sms,email"
                                aria-label="preferences"
                            />
                        </>
                    )}

                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        {...register("email")}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        type="email"
                        placeholder="name@example.com"
                        aria-label="email"
                    />
                    {errors.email && <p className="text-sm text-red-500">{(errors.email as any).message}</p>}

                    {type === "login" && (
                        <>
                            <label className="text-sm font-medium text-gray-700">Password</label>
                            <input
                                {...register("password")}
                                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                                type="password"
                                placeholder="Your password"
                                aria-label="password"
                            />
                            {errors.password && <p className="text-sm text-red-500">{(errors.password as any).message}</p>}
                        </>
                    )}

                    <div className="flex flex-col gap-3 mt-4">
                        <button disabled={isSubmitting} type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 rounded-lg shadow-md hover:opacity-95">
                            {type === "register" ? "Create account" : "Sign in"}
                        </button>

                        <div className="text-center text-sm text-gray-500">
                            {type === "login" ? (
                                <Link to="/register" className="text-blue-600 underline">Create account</Link>
                            ) : (
                                <Link to="/login" className="text-blue-600 underline">Already have an account?</Link>
                            )}
                        </div>
                    </div>
                </div>
            </form>
    );
}