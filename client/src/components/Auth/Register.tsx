import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { registerUser } from "../../redux/reducers/user/userSlice";
import { useSelector } from "react-redux";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NavLink } from "react-router-dom";

const registerSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(4, "Password must be at least 4 characters long"),
    companyName: z.string().min(4, "Company name must be at least 4 characters long"),
    companyWebsite: z.string().url("Invalid URL"),
    phoneNumber: z.string().min(10, "Invalid phone number").max(10, "Invalid phone number")
});

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { error, isAuthenticated, loading } = useSelector(
        (state: RootState) => state.user
    );

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormInputs>({ resolver: zodResolver(registerSchema) });

    const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
        dispatch(registerUser(data));
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            {/* TODO: logo, link */}
            <a
                href="#"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
            >
                {/* <img src={logo} alt="" /> */}
            </a>
            <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-sm xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <div>
                        Already have an account? <NavLink to="/login" className="text-blue-600 hover:underline">Sign in</NavLink>
                    </div>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Your email
                            </label>
                            <input
                                id="email"
                                type="email"
                                {...register("email")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder=""
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                {...register("password")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder=""
                            />
                            {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="companyName"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Company Name
                            </label>
                            <input
                                id="companyName"
                                type="text"
                                {...register("companyName")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder=""
                            />
                            {errors.companyName && <p className="mt-1 text-sm text-red-500">{errors.companyName.message}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="companyWebsite"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Company Website
                            </label>
                            <input
                                id="companyWebsite"
                                type="text"
                                {...register("companyWebsite")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder=""
                            />
                            {errors.companyWebsite && <p className="mt-1 text-sm text-red-500">{errors.companyWebsite.message}</p>}
                        </div>
                        <div>
                            <label
                                htmlFor="phoneNumber"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Phone Number
                            </label>
                            <input
                                id="phoneNumber"
                                type="text"
                                {...register("phoneNumber")}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder=""
                            />
                            {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber.message}</p>}
                        </div>
                        <button
                            type="submit"
                            disabled={loading}
                            className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center"
                        >
                            {loading ? "Signing up..." : "Sign up"}
                        </button>
                        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;