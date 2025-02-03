import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { loginUser, setEmail, setPassword } from "../../redux/reducers/user/userSlice";
import { useSelector } from "react-redux";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const { email, password, error, isAuthenticated } = useSelector(
        (state: RootState) => state.user
    );

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        dispatch(loginUser({ email, password }));
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
                    <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label
                                htmlFor="email"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Your email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(event) => dispatch(setEmail(event.target.value))}
                                required
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-gray-900"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="••••••••••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                value={password}
                                onChange={(event) => dispatch(setPassword(event.target.value))}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className=" text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center"
                        >
                            Sign in
                        </button>
                        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;