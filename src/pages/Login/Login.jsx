import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase.config";
import { useRef, useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";


const Login = () => {
    const [showPass, setShowPass] = useState(false);
    const [loginError, setLoginError] = useState('');
    const [success, setSuccess] = useState("");
    const emailRef = useRef(null);

    const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        // clear error 
        setLoginError("");
        setSuccess("");


        // add validation
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);

                if (result.user.emailVerified) {
                    setSuccess("You have Logged in successfully");
                }
                else {
                    alert("please verify your email")
                }
            })
            .catch(error => {
                console.log(error);
                setLoginError(error.message)
            })
    }

    const handleResetPass = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log("add a valid email", email);
            return;
        }
        else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov)$/i.test(email)) {
            console.log('write a valid email');
            return;
        }

        // send validation email 
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("go to Your gmail");
            })
            .catch(error => {
                console.log(error);
            })

    }

    return (
        <div>
            <div className="hero rounded-lg bg-base-200 lg:w-[800px]">
                <div className="hero-content flex-col w-full">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold my-6">Login now!</h1>
                    </div>
                    <div className="card shrink-0 shadow-2xl bg-base-100 w-full">
                        <div className="card-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        ref={emailRef}
                                        type="email"
                                        placeholder="email"
                                        name="email"
                                        className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="flex items-center relative">
                                        <input
                                            type={showPass ? "text" : "password"} placeholder="password" name="password" className="input input-bordered flex-1" required />
                                        <span className="absolute right-8" onClick={() => setShowPass(!showPass)}>{showPass ? <FaRegEyeSlash /> : <IoEyeOutline />}</span>
                                        {/* <span className="btn" onClick={() => setShowPass(!showPass)}>{showPass ? "show" : "Hide"}</span> */}
                                    </div>
                                    <label className="label">
                                        <Link onClick={handleResetPass} className="label-text-alt link link-hover">Forgot password?</Link>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>
                                </div>
                                <div className="form-control mt-6">
                                    <span>New here? <Link to="/register">Create a New Account.</Link></span>
                                </div>
                            </form>
                        </div>
                        <div>
                            {success && <p className="text-center text-green-600 text-lg font-bold mb-8">
                                {success}</p>}
                        </div>
                        <div>
                            {loginError && <p className="text-center text-red-600 text-lg font-bold mb-8">
                                {loginError}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;