import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IMaskInput } from "react-imask";
import { useState } from "react";

const schema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    name: yup.string().min(2, "Name must be at least 2 characters").required("Name is required"),
    password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    phone: yup.string().matches(/^\(\d{3}\) \d{3}-\d{4}$/, "Phone number is not valid").required("Phone number is required"),
});


interface propsData {
    type: "register" | "login";
    handleSubmitFun: (data: any) => void;
}

type FormData = {
    name: string;
    email: string;
    password: string;
    phone: string;
};

export default function FormRegisterLogin(FormData: propsData) {
    const { type, handleSubmitFun } = FormData;
    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        password: "",
        phone: ""
    });

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const handleSubmitF = async (data: any) => {
        handleSubmitFun(data)
    }

    return (
        <form
            onSubmit={handleSubmit((data: any) => handleSubmitF(data))}
            className="bg-[#191A29] flex flex-col gap-6 w-full md:w-3/6 border p-5"
        >
            <div>
                <h1>{type === 'login' ? 'Welcome back!' : 'Welcome!'}</h1>
            </div>
            <div className="flex flex-col gap-4">
                <input
                    className="border rounded-2xl bg-transparent px-2 py-1"
                    type="text"
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({
                        ...form,
                        name: e.target.value
                    })}
                    required
                />
                <IMaskInput
                    className="border rounded-2xl bg-transparent px-2 py-1"
                    type="text"
                    mask="+55 (00) 00000-0000"
                    placeholder="Phone Number"
                    value={form.phone}
                    onAccept={(value: any) => setForm({
                        ...form,
                        phone: value
                    })}
                    required
                />
                <IMaskInput
                    className="border rounded-2xl bg-transparent px-2 py-1"
                    type="email"
                    mask={/^[\s\S]*$/}
                    placeholder="E-mail"
                    value={form.phone}
                    onAccept={(value: any) => setForm({
                        ...form,
                        email: value
                    })}
                    required
                />
                <IMaskInput
                    className="border rounded-2xl bg-transparent px-2 py-1"
                    type="password"
                    mask={/^[\s\S]*$/}
                    placeholder="Password"
                    value={form.phone}
                    onAccept={(value: any) => setForm({
                        ...form,
                        phone: value
                    })}
                    required
                />

                <button type="submit" className="bg-slate-600">
                    {type === "register" ? "Register" : "Login"}
                </button>

                {errors.email && <p>{errors.email.message}</p>}
            </div>
        </form>
    )
}