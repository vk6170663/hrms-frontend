/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { useState, type FormEvent } from "react";
import Label from "../label";
import Input from "../input";
import Button from "../button";
import PasswordToggle from "../password-toggle";

const SignupForm = () => {
    const { register } = useAuthStore();
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    // const [role, setRole] = useState<'HR' | 'Employee'>('Employee');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!fullName) {
            setIsLoading(false);
            return;
        }

        if (!emailRegex.test(email)) {
            setError('Invalid email format');
            setIsLoading(false);
            return;
        }
        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            setIsLoading(false);
            return;
        }
        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }
        try {
            setError('');
            await register({ fullName, email, password, passwordConfirm });
            navigate('/login');
        } catch (err: any) {
            setError(err.message);
            setIsLoading(false);
        }
    };

    const isButtonDisabled = !fullName.trim() || !email.trim() || !password.trim() || !passwordConfirm.trim() || isLoading;

    return (
        <div className="form-right-panel">
            <form onSubmit={handleSubmit} className="signup-form">
                <h2>Sign Up</h2>
                {error && <p className="error-message">{error}</p>}
                <div className="form-group-container">
                    <div className="form-group">
                        <Label>
                            Full Name <span className="required-mark">*</span>
                        </Label>
                        <Input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            placeholder="Full Name"
                            containerClass="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <Label>
                            Email Address <span className="required-mark">*</span>
                        </Label>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            containerClass="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <Label>
                            Password <span className="required-mark">*</span>
                        </Label>
                        <div className="password-input-wrapper">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                                containerClass="form-input"
                            />
                            <PasswordToggle
                                showPassword={showPassword}
                                onToggle={() => setShowPassword(!showPassword)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <Label>
                            Confirm Password <span className="required-mark">*</span>
                        </Label>
                        <div className="password-input-wrapper">
                            <Input
                                type={showPasswordConfirm ? "text" : "password"}
                                value={passwordConfirm}
                                onChange={(e) => setPasswordConfirm(e.target.value)}
                                placeholder="Confirm Password"
                                containerClass="form-input"
                            />
                            <PasswordToggle
                                showPassword={showPasswordConfirm}
                                onToggle={() => setShowPasswordConfirm(!showPasswordConfirm)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>
                    {/* <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as 'HR' | 'Employee')}
                        >
                            <option value="Employee">Employee</option>
                            <option value="HR">HR</option>
                        </select>
                    </div> */}
                </div>
                <Button type="submit" buttonType="sign-up" containerClass={`form-button ${isButtonDisabled ? "form-disabled--btn" : "form-active--btn"}`} disabled={isButtonDisabled}>{isLoading ? "Signing Up" : "Sign Up"}</Button>
                <p className="login-link">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default SignupForm;