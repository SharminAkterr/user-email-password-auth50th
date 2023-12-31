import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase.config";
import { useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {

    const [regError, setError] = useState('');
    const [success, setSuccess] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.checkbox.checked;
        console.log(name, email, password, accepted);

        // clear error 
        setError("");
        setSuccess("");

        if (password.length < 6) {
            setError('you should give at least 6 character or longer')
            return;
        }

        // else if (!/[A-Z]/.test(password)) {
        //     setError('you should give at least one Uppercase character or longer')
        //     return;
        // }
        else if (!accepted) {
            setError("please accept our terms and conditions");
            return;
        }


        // create email 
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                setSuccess('Successfully created')

                // updateProfile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                    .then(() => {
                        alert("profile updated")
                    })
                    .catch(error => {
                        console.log(error)
                    })

                // send verification email
                sendEmailVerification(result.user)
                    .then(() => {
                        alert("please check your email and  verify your new account")
                    })
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }

    return (
        <div>
            <div className="hero rounded-lg bg-base-200 lg:w-[800px]">
                <div className="hero-content flex-col w-full">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold my-6">Register now!</h1>
                    </div>
                    <div className="card shrink-0 shadow-2xl bg-base-100 w-full">
                        <div className="card-body">
                            <form onSubmit={handleRegister}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" name="name" placeholder="Name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input
                                        type="email" placeholder="email" name="email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <div className="flex items-center relative">
                                        <input type={showPass ? "text" : "password"} placeholder="password" name="password" className="input input-bordered flex-1" required />
                                        <span className="absolute right-8" onClick={() => setShowPass(!showPass)}>{showPass ? <FaRegEyeSlash /> : <IoEyeOutline />}</span>
                                        {/* <span className="btn" onClick={() => setShowPass(!showPass)}>{showPass ? "show" : "Hide"}</span> */}
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <input type="checkbox" name="checkbox" id="" />
                                    <label className="ml-2">Accept our<a href="">Terms and Condition.</a></label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Register</button>
                                </div>
                                <div className="form-control mt-6">
                                    <span>Already have an account? <Link to="/login">Please login here.</Link></span>
                                </div>
                            </form>
                            <div>
                                {success && <p className="text-center text-green-600 text-lg font-bold">
                                    {success}</p>}
                            </div>
                            <div>
                                {regError && <p className="text-center text-red-600 text-lg font-bold">
                                    {regError}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;