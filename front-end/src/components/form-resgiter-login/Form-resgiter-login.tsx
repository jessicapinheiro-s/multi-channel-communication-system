import { useState } from "react";

import { useForm, Controller } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";

import * as yup from "yup";

import { IMaskInput } from "react-imask";

import { Link } from "react-router-dom";

import {
  Mail,
  Lock,
  User,
  Phone,
  Bell,
  ArrowRight,
} from "lucide-react";

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
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  phone: yup.string().required("Phone number is required"),

  preferences: yup.string().optional(),
});

export default function FormRegisterLogin({
  type,
  handleSubmitFun,
}: PropsData) {
  const [focusField, setFocusField] = useState("");

  const chosenResolver =
    type === "register"
      ? yupResolver(registerSchema)
      : yupResolver(loginSchema);

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
    if (
      type === "register" &&
      (!data.email ||
        !data.name ||
        !data.phone ||
        !data.preferences)
    ) {
      console.error("Há propriedades vazias", data);

      return;
    }

    if (
      type === "login" &&
      (!data.email || !data.password)
    ) {
      console.error("Há propriedades vazias", data);

      return;
    }

    await handleSubmitFun(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-5"
    >
      {/* REGISTER */}
      {type === "register" && (
        <>
          {/* Name */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">
              Name
            </label>

            <div
              className={`
                flex items-center gap-3
                rounded-2xl
                border
                px-4 py-3
                transition-all
                bg-white/[0.03]
                ${focusField === "name"
                  ? "border-cyan-400 ring-2 ring-cyan-400/20"
                  : "border-white/10"
                }
              `}
            >
              <User className="w-5 h-5 text-slate-500" />

              <input
                {...register("name")}
                type="text"
                placeholder="Your Name"
                aria-label="name"
                onFocus={() => setFocusField("name")}
                onBlur={() => setFocusField("")}
                className="
                 w-full bg-transparent
                  outline-none
                  text-white
                  placeholder:text-slate-500
                "
              />
            </div>

            {errors.name && (
              <p className="text-sm text-red-400 mt-2">
                {(errors.name as any).message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">
              Phone
            </label>

            <div
              className={`
                flex items-center gap-3
                rounded-2xl
                border
                px-4 py-3
                transition-all
                bg-white/[0.03]
                ${focusField === "phone"
                  ? "border-cyan-400 ring-2 ring-cyan-400/20"
                  : "border-white/10"
                }
              `}
            >
              <Phone className="w-5 h-5 text-slate-500" />

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <IMaskInput
                    {...field}
                    mask="+55 (00) 00000-0000"
                    placeholder="+55 (11) 99999-9999"
                    onAccept={(value: any) =>
                      field.onChange(value)
                    }
                    onFocus={() => setFocusField("phone")}
                    onBlur={() => setFocusField("")}
                    className="
                      w-full bg-transparent
                      outline-none
                      text-white
                      placeholder:text-slate-500
                    "
                  />
                )}
              />
            </div>

            {errors.phone && (
              <p className="text-sm text-red-400 mt-2">
                {(errors.phone as any).message}
              </p>
            )}
          </div>

          {/* Preferences */}
          <div>
            <label className="text-sm font-medium text-slate-300 mb-2 block">
              Preferences
            </label>

            <div
              className={`
                flex items-center gap-3
                rounded-2xl
                border
                px-4 py-3
                transition-all
                bg-white/[0.03]
                ${focusField === "preferences"
                  ? "border-cyan-400 ring-2 ring-cyan-400/20"
                  : "border-white/10"
                }
              `}
            >
              <Bell className="w-5 h-5 text-slate-500" />

              <input
                {...register("preferences")}
                type="text"
                placeholder="sms,email"
                aria-label="preferences"
                onFocus={() => setFocusField("preferences")}
                onBlur={() => setFocusField("")}
                className="
                  w-full bg-transparent
                  outline-none
                  text-white
                  placeholder:text-slate-500
                "
              />
            </div>
          </div>
        </>
      )}

      {/* EMAIL */}
      <div>
        <label className="text-sm font-medium text-slate-300 mb-2 block">
          Email
        </label>

        <div
          className={`
                flex items-center gap-3
                rounded-2xl
                border
                px-4 py-3
                transition-all
                bg-white/[0.03]
                ${focusField === "preferences"
              ? "border-cyan-400 ring-2 ring-cyan-400/20"
              : "border-white/10"
            }
              `}
        >
          <Mail className="w-5 h-5 text-slate-500" />

          <input
            {...register("email")}
            type="email"
            placeholder="name@example.com"
            aria-label="email"
            onFocus={() => setFocusField("email")}
            onBlur={() => setFocusField("")}
            className="w-full !bg-transparent text-white placeholder:text-slate-500 border-none outline-none focus:outline-none focus:ring-0 p-0 m-0 box-border appearance-none"
          />
        </div>

        {errors.email && (
          <p className="text-sm text-red-400 mt-2">
            {(errors.email as any).message}
          </p>
        )}
      </div>

      {/* PASSWORD */}
      {type === "login" && (
        <div>
          <label className="text-sm font-medium text-slate-300 mb-2 block">
            Password
          </label>

          <div
            className={`
                flex items-center gap-3
                rounded-2xl
                border
                px-4 py-3
                transition-all
                bg-white/[0.03]
                ${focusField === "preferences"
                ? "border-cyan-400 ring-2 ring-cyan-400/20"
                : "border-white/10"
              }
              `}
          >
            <Lock className="w-5 h-5 text-slate-500" />

            <input
              {...register("password")}
              type="password"
              placeholder="Your password"
              aria-label="password"
              onFocus={() => setFocusField("password")}
              onBlur={() => setFocusField("")}
              className="w-full !bg-transparent text-white placeholder:text-slate-500 border-none outline-none focus:outline-none focus:ring-0 p-0 m-0 box-border appearance-none"
            />
          </div>

          {errors.password && (
            <p className="text-sm text-red-400 mt-2">
              {(errors.password as any).message}
            </p>
          )}
        </div>
      )}

      {/* BUTTON */}
      <button
        disabled={isSubmitting}
        type="submit"
        className="
          mt-3
          group
          flex items-center justify-center gap-2
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-500
          py-3.5
          font-semibold
          text-white
          shadow-lg shadow-cyan-500/20
          transition-all duration-300
          hover:scale-[1.02]
          disabled:opacity-50
        "
      >
        {type === "register"
          ? "Create Account"
          : "Sign In"}

        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </button>

      {/* FOOTER */}
      <div className="text-center text-sm text-slate-400 mt-2">
        {type === "login" && (
          <Link
            to="/register"
            className="
              text-cyan-400
              hover:text-cyan-300
              transition-colors
            "
          >
            Not an administrator? Create your account.
          </Link>
        )}
      </div>
    </form>
  );
}