import { useNavigate } from "react-router-dom";
import { useState } from "react";

import FormRegisterLogin from "../components/form-resgiter-login/Form-resgiter-login";
import type { FormData } from "../components/form-resgiter-login/Form-resgiter-login";

import { useUserStore } from "../../stores/user";

import LoadingModal from "../components/modals/LoandingModal";

interface LoginDataProps extends FormData {}

export default function Login() {
  const navigate = useNavigate();

  const ambiente = import.meta.env.VITE_AMBIENTE_API;

  const [isLoanding, setIsLoading] = useState(false);

  const { setUser } = useUserStore();

  const handleLoggin = async (data: LoginDataProps) => {
    const obj_to_login = {
      email: data.email,
      password: data.password,
    };

    try {
      setIsLoading(true);

      const response = await fetch(`${ambiente}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj_to_login),
      });

      if (!response.ok) {
        console.error("Failed to login:", response.statusText);

        throw new Error("Failed to login");
      }

      const responseData = await response.json();

      const user = responseData;

      if (user) {
        setUser(user);
      }

      navigate("/dashboard-admin");
    } catch (error) {
      console.error("Error during login:", error);

      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main
      className="
        relative overflow-hidden
        min-h-screen
        flex items-center justify-center
        bg-gradient-to-br
        from-slate-950
        via-slate-900
        to-slate-950
        px-6
      "
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-3xl rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/10 blur-3xl rounded-full" />

      {/* Grid */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)]
          bg-[size:70px_70px]
        "
      />

      {/* Content */}
      <div
        className="
          relative z-10
          w-full max-w-6xl
          grid lg:grid-cols-2
          items-center
          gap-12
        "
      >
        {/* Left */}
        <div className="hidden lg:flex flex-col">
          <div
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-cyan-500/20
              bg-cyan-500/10
              px-4 py-2
              text-sm text-cyan-300
              w-fit
              mb-6
            "
          >
            ✦ Multichannel Communication Platform
          </div>

          <h1
            className="
              text-6xl font-black
              tracking-tight
              leading-none
              text-white
            "
          >
            Manage campaigns with
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {" "}
              real-time communication
            </span>
          </h1>

          <p className="text-slate-400 text-lg mt-8 leading-relaxed max-w-xl">
            Powerful multichannel platform for managing campaigns, recipients,
            SMS delivery and email communication with real-time analytics.
          </p>

          {/* Stats */}
          <div className="flex items-center gap-6 mt-10">
            {[
              {
                title: "Messages",
                value: "2.4M+",
              },
              {
                title: "Delivery Rate",
                value: "98%",
              },
              {
                title: "Companies",
                value: "150+",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.03]
                  backdrop-blur-xl
                  px-6 py-5
                  min-w-[150px]
                "
              >
                <p className="text-slate-400 text-sm">
                  {item.title}
                </p>

                <h3 className="text-3xl font-black text-white mt-2">
                  {item.value}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="relative">
          <div
            className="
              absolute -top-10 -right-10
              w-40 h-40
              bg-cyan-400/10
              blur-3xl
              rounded-full
            "
          />

          <div
            className="
              relative
              rounded-[32px]
              border border-white/10
              bg-slate-900/80
              backdrop-blur-2xl
              shadow-2xl shadow-cyan-500/10
              p-8 md:p-10
            "
          >
            {/* Header */}
            <div className="mb-8">
              <div
                className="
                  w-16 h-16
                  rounded-3xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-500
                  flex items-center justify-center
                  text-2xl
                  shadow-lg shadow-cyan-500/30
                  mb-6
                "
              >
                ✦
              </div>

              <h2 className="text-4xl font-black text-white tracking-tight">
                Welcome back
              </h2>

              <p className="text-slate-400 mt-3">
                Login to continue managing your campaigns.
              </p>
            </div>

            {/* Form */}
            <div
              className="
                [&_input]:bg-white/[0.03]
                [&_input]:border
                [&_input]:border-white/10
                [&_input]:rounded-2xl
                [&_input]:text-white
                [&_input]:placeholder:text-slate-500
                [&_input]:px-4
                [&_input]:py-3
                [&_input]:outline-none
                [&_input]:transition-all
                [&_input]:focus:border-cyan-400
                [&_input]:focus:ring-2
                [&_input]:focus:ring-cyan-400/20

                [&_button]:rounded-2xl
                [&_button]:bg-gradient-to-r
                [&_button]:from-cyan-500
                [&_button]:to-blue-500
                [&_button]:text-white
                [&_button]:font-semibold
                [&_button]:py-3
                [&_button]:transition-all
                [&_button]:hover:scale-[1.02]
                [&_button]:shadow-lg
                [&_button]:shadow-cyan-500/20
              "
            >
              <FormRegisterLogin
                handleSubmitFun={handleLoggin}
                type="login"
              />
            </div>
          </div>
        </div>
      </div>

      <LoadingModal
        open={isLoanding}
        message="Authenticating user..."
      />
    </main>
  );
}