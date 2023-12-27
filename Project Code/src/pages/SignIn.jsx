import {useState} from 'react'
import {Link, useNavigate} from "react-router-dom";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {toast} from 'react-toastify';
import OAuth from "../components/OAuth";

function SignIn() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData
    const navigate = useNavigate()

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()

        try {
            const auth = getAuth()

            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if (userCredential.user) {
                toast.success('Sign In Successful!')
                navigate('/')
            }
        } catch (error) {
            toast.error('Bad User Credentials')
        }
    }

    return (
        <div className="hero bg-base-100">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Welcome to Torres Online Ticket Reservation! Start your movie ticketing journey :) </p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text"
                                       placeholder="Email"
                                       className="input input-bordered"
                                       id="email"
                                       value={email}
                                       onChange={onChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password"
                                       placeholder="Password"
                                       className="input input-bordered"
                                       id="password"
                                       value={password}
                                       onChange={onChange}
                                />
                                <label className="label">
                                    <a href="/forgot-password" className="label-text-alt link link-hover float-left">Forgot password?</a>
                                    <a href="/sign-up" className="label-text-alt link link-hover float-right">Create an account</a>
                                </label>
                            </div>

                            <OAuth />
                            <form onSubmit={onSubmit}>
                                <div className="form-control mt-4">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                            </form>
                        </div>

                </div>
            </div>
        </div>
    )
}

export default SignIn