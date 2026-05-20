import { useState } from "react";

import FormRegisterLogin from "../components/form-resgiter-login/Form-resgiter-login";

import LoadingModal from "../components/modals/LoandingModal";

import { Check, ShieldCheck, BellRing } from "lucide-react";

import { Toast } from "../components";

import type { ToastProps } from "../types/global-types";

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

  const [sucessRegister, setSucessRegister] =
    useState(false);

  const [toastOpen, setToastOpen] = useState(false);

  const [toastInfo, setToastInfo] =
    useState<ToastProps>({
      duration: 1000,
      message: "",
      title: "",
      type: "success",
    });

  const handleRegister = async (
    data: RegisterDataProps
  ) => {
    const obj_to_create = {
      name: data.name || "",

      email: data.email,

      phone: data.phone || "",

      preferences: data.preferences || "",
    };

    try {
      setIsLoading(true);

      const response = await fetch(
        `${ambiente}/recipients/create`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(obj_to_create),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error(
          "Failed to register user:",
          data.error
        );

        setToastInfo({
          message: data.error,
          title: "Failed to register user",
          type: "error",
        });

        setToastOpen(true);

        return;
      }

      setSucessRegister(true);
    } catch (error) {
      console.error(
        "Error during registration:",
        error
      );

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

      <LoadingModal
        open={isLoanding}
        message="Creating account..."
      />

      {/* SUCCESS */}
      {sucessRegister && !toastOpen ? (
        <div
          className="
            relative z-10
            w-full max-w-xl
            rounded-[32px]
            border border-white/10
            bg-slate-900/80
            backdrop-blur-2xl
            shadow-2xl shadow-cyan-500/10
            p-10
            text-center
          "
        >
          {/* Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-400/10 blur-3xl rounded-full" />

          {/* Icon */}
          <div className="relative z-10 flex justify-center mb-6">
            <div
              className="
                w-24 h-24
                rounded-[28px]
                bg-gradient-to-r
                from-emerald-500
                to-cyan-500
                flex items-center justify-center
                shadow-lg shadow-emerald-500/20
              "
            >
              <Check
                size={42}
                className="text-white"
              />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <h1
              className="
                text-4xl font-black
                tracking-tight
                text-white
              "
            >
              Registration Successful
            </h1>

            <p
              className="
                text-slate-400
                leading-relaxed
                mt-5
                text-lg
              "
            >
              Your account has been successfully
              registered in the notification system.
              <br />
              You can now receive campaigns,
              alerts and communication updates in
              real time.
            </p>

            {/* Benefits */}
            <div className="grid md:grid-cols-2 gap-4 mt-10">
              <div
                className="
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.03]
                  p-5
                  text-left
                "
              >
                <BellRing className="w-8 h-8 text-cyan-400 mb-3" />

                <h3 className="text-white font-semibold">
                  Instant Notifications
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  Receive SMS and email campaigns
                  instantly.
                </p>
              </div>

              <div
                className="
                  rounded-3xl
                  border border-white/10
                  bg-white/[0.03]
                  p-5
                  text-left
                "
              >
                <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />

                <h3 className="text-white font-semibold">
                  Secure Data
                </h3>

                <p className="text-slate-400 text-sm mt-2">
                  Your information is protected
                  using secure infrastructure.
                </p>
              </div>
            </div>

            {/* Footer */}
            <p className="text-xs text-slate-500 mt-10">
              Multichannel Communication Platform ©
              2026
            </p>
          </div>
        </div>
      ) : (
        <div
          className="
            relative z-10
            w-full max-w-6xl
            grid lg:grid-cols-2
            items-center
            gap-14
          "
        >
          {/* LEFT */}
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
              ✦ Smart Notification System
            </div>

            <h1
              className="
                text-6xl font-black
                tracking-tight
                leading-none
                text-white
              "
            >
              Receive important updates
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {" "}
                in real time
              </span>
            </h1>

            <p className="text-slate-400 text-lg mt-8 leading-relaxed max-w-xl">
              Register to receive alerts,
              campaigns and communication updates
              through SMS and email with high
              delivery reliability.
            </p>

            {/* Feature Cards */}
            <div className="flex flex-col gap-4 mt-10">
              {[
                {
                  title: "Real-time Delivery",
                  desc: "Receive alerts instantly through multiple channels.",
                },
                {
                  title: "Enterprise Security",
                  desc: "Your information is encrypted and securely protected.",
                },
                {
                  title: "High Availability",
                  desc: "Infrastructure built for scalability and reliability.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="
                    rounded-3xl
                    border border-white/10
                    bg-white/[0.03]
                    backdrop-blur-xl
                    p-5
                  "
                >
                  <h3 className="text-white font-semibold">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 text-sm mt-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
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
                  Create Account
                </h2>

                <p className="text-slate-400 mt-3">
                  Register to receive
                  notifications and communication
                  updates.
                </p>
              </div>

              {/* Form */}
              <FormRegisterLogin
                handleSubmitFun={handleRegister}
                type="register"
              />
            </div>
          </div>
        </div>
      )}

      <Toast
        open={toastOpen}
        duration={toastInfo.duration}
        message={toastInfo.message}
        title={toastInfo.title}
        type={toastInfo.type}
      />
    </main>
  );
}