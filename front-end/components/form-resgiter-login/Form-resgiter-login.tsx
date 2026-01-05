import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IMaskInput } from "react-imask";
import { Link } from "react-router-dom";

interface PropsData {
    type: "register" | "login";
    handleSubmitFun: (data: FormData) => void;
}

export type FormData = {
    name?: string;
    email: string;
    password: string;
    phone?: string;
};

const loginSchema = yup.object({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const registerSchema = yup.object({
    name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    phone: yup.string().required("Phone number is required"),
});

export default function FormRegisterLogin({ type, handleSubmitFun }: PropsData) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormData>({
        resolver: yupResolver(type === "register" ? registerSchema : loginSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            phone: "",
        },
    });

    const onSubmit = async (data: FormData) => {
        await handleSubmitFun(data);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#191A29] flex flex-col gap-6 w-full md:w-3/6 border p-5 text-white"
        >
            <div>
                <h1 className="text-2xl font-semibold">{type === "login" ? "Welcome back!" : "Create your account"}</h1>
            </div>

            <div className="flex flex-col gap-4">
                {type === "register" && (
                    <>
                        <input
                            {...register("name")}
                            className="border rounded-2xl bg-transparent px-2 py-1"
                            type="text"
                            placeholder="Name"
                            aria-label="name"
                        />
                        {errors.name && <p className="text-sm text-red-400">{(errors.name as any).message}</p>}

                        <Controller
                            name="phone"
                            control={control}
                            render={({ field }) => (
                                <IMaskInput
                                    {...field}
                                    className="border rounded-2xl bg-transparent px-2 py-1"
                                    mask="+55 (00) 00000-0000"
                                    placeholder="Phone Number"
                                    onAccept={(value: any) => field.onChange(value)}
                                />
                            )}
                        />
                        {errors.phone && <p className="text-sm text-red-400">{(errors.phone as any).message}</p>}
                    </>
                )}

                <input
                    {...register("email")}
                    className="border rounded-2xl bg-transparent px-2 py-1"
                    type="email"
                    placeholder="E-mail"
                    aria-label="email"
                />
                {errors.email && <p className="text-sm text-red-400">{(errors.email as any).message}</p>}

                <input
                    {...register("password")}
                    className="border rounded-2xl bg-transparent px-2 py-1"
                    type="password"
                    placeholder="Password"
                    aria-label="password"
                />
                {errors.password && <p className="text-sm text-red-400">{(errors.password as any).message}</p>}

                <div className="flex items-center justify-between gap-4">
                    <button disabled={isSubmitting} type="submit" className="bg-slate-600 px-4 py-2 rounded">
                        {type === "register" ? "Register" : "Login"}
                    </button>

                    {type === "login" ? (
                        <Link to="/register" className="text-sm underline">
                            Create account
                        </Link>
                    ) : (
                        <Link to="/login" className="text-sm underline">
                            Already have an account?
                        </Link>
                    )}
                </div>
            </div>
        </form>
    );
}