import FormRegisterLogin from "../components/form-resgiter-login/form-resgiter-login"

export default function Login() {
    const handleLoggin = async (data: any) => {

    }
    return (
        <main className="flex flex-col items-center justify-center">
            <FormRegisterLogin
                handleSubmitFun={handleLoggin}
                type="login"
            />
        </main>
    )
}