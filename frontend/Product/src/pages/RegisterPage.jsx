import { useForm } from "react-hook-form"
import { useAuth } from "../context/authContext.jsx";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"

function RegisterPage(){
    const {
        register, 
        handleSubmit, 
        formState: {errors}
    } = useForm();
    const { signup, isAuthenticated, errors: registerErrors } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if(isAuthenticated) navigate('/inventory') 
    }), [isAuthenticated]

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    })

    return(
        <div className='flex h-[calc(100vh-100px)] items-center justify-center'>
            {
                registerErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white text-center my-2" key={i}>
                        {error}
                    </div>
                ))
            }
            <div className=' max-w-md w-full p-10 rounded-md'>
                <h1 className="text-2xl font-bold">Registro de usuarios</h1>

                <form onSubmit={onSubmit}>
                    <input type="text" name="username" {... register("username", {required: true})}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder="Username"
                    />
                    {errors.username && (
                        <p className="text-red-500">
                            el username es requerido
                        </p>
                    )}

                    <input type="text" name="Nombre" {... register("name", {required: true})}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder="Nombre"
                    />
                    {errors.username && (
                        <p className="text-red-500">
                            El nombre es requerido
                        </p>
                    )}

                    <input type="text" name="apellido" {... register("lastname", {required: true})}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder="Apellido"
                    />
                    {errors.username && (
                        <p className="text-red-500">
                            El apellido es requerido
                        </p>
                    )}

                    <input type="email" name="email" {... register("email", {required: true})} 
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder="Email"
                    />
                    {errors.email && (
                        <p className="text-red-500">
                            El correo es requerido
                        </p>
                    )}
                    <input type="password" name="password" {... register("password", {required: true})}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                        placeholder="Contraseña"
                    />
                    {errors.password && (
                        <p className="text-red-500">
                            La contraseña es requerida
                        </p>
                    )}
                    <button type="submit" className="bg-zinc-500 p-2 rounded-md">
                        Registrar
                    </button>
                </form>
                <p className='flex gap-x-2 justify-between'>
                    ¿Ya posee una cuenta? <Link to="/" className='text-sky-500'>Iniciar Sesión</Link>
                </p>
            </div>
        </div>
    );
}

export default RegisterPage;