import React, { useState } from 'react';
import Header from "../components/header";
import Footer from "../components/footer";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const LecLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    async function handleLogin(event) {
        event.preventDefault();
        if (!email || !password) {
            enqueueSnackbar('Please enter email and password', { variant: 'warning', autoHideDuration: 3000 });
            return;
        }
        setLoading(true);
        try {
            const response = await fetch('http://localhost:1337/lecturelogin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.status === 'ok') {
                localStorage.setItem('lecturertoken', data.user);
                localStorage.setItem('lecturerinfo', JSON.stringify(data.lecturer));
                enqueueSnackbar('Login successful!', { variant: 'success', autoHideDuration: 3000 });
                navigate('/lecturer');
            } else {
                enqueueSnackbar(data.error || 'Invalid email or password', { variant: 'error', autoHideDuration: 3000 });
            }
        } catch {
            enqueueSnackbar('Server error. Please try again.', { variant: 'error', autoHideDuration: 3000 });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col min-h-screen">
            <Header whichversion={'lecturer'} />
            <div className="flex-grow flex items-center justify-center px-4">
                <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md">
                    <div>
                        <h2 className="lg:text-5xl text-3xl font-bold text-slate-900 leading-snug">
                            Login for<br />Lecturer Access
                        </h2>
                        <p className="mt-4 text-slate-500 text-sm">
                            Sign in to manage attendance sessions and view your QR attendance records.
                        </p>
                    </div>

                    <form className="max-w-md md:ml-auto w-full" onSubmit={handleLogin}>
                        <h3 className="text-slate-900 lg:text-3xl text-2xl font-bold mb-5">Sign in</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="text-sm text-slate-800 font-medium mb-2 block">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-green-600 focus:bg-transparent transition"
                                    placeholder="Enter Email"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-slate-800 font-medium mb-2 block">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-green-600 focus:bg-transparent transition"
                                    placeholder="Enter Password"
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full shadow-xl py-2.5 px-4 cursor-pointer text-sm font-semibold rounded text-white bg-green-600 hover:bg-green-700 focus:outline-none disabled:opacity-60 transition"
                            >
                                {loading ? 'Signing in…' : 'Log in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default LecLogin;
