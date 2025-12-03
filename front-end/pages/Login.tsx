import FormRegisterLogin from "../components/form-resgiter-login/form-resgiter-login"

export default function Login() {
    const handleLoggin = async (data: any) => {

    }
    return (
        <main>
            <FormRegisterLogin
                handleSubmitFun={handleLoggin}
                type="login"
            />
        </main>
    )
}