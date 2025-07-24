import "../../styles/form.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth";
import { useState, type FormEvent } from "react";
import Input from "../input";
import Button from "../button";
import Label from "../label";
import PasswordToggle from "../password-toggle";

const LoginForm = () => {
    const { login } = useAuthStore();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Invalid email format");
            setIsLoading(false);
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            setIsLoading(false);
            return;
        }

        try {
            setError("");
            await login({ email, password });
            navigate("/candidates");
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Determine if login button should be disabled
    const isButtonDisabled = !email.trim() || !password.trim() || isLoading;

    return (
        <div className="form-right-panel">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Welcome to Dashboard</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="form-group-container">
                    <div className="form-group">
                        <Label>
                            Email Address <span className="required-mark">*</span>
                        </Label>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            disabled={isLoading}
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
                                placeholder="Enter your password"
                                disabled={isLoading}
                                containerClass="form-input"
                            />
                            <PasswordToggle
                                showPassword={showPassword}
                                onToggle={() => setShowPassword(!showPassword)}
                                disabled={isLoading}

                            />
                        </div>
                    </div>

                    <div className="forgot-password">
                        <Link to="/forgot-password" className="forgot-link">
                            Forgot Password?
                        </Link>
                    </div>
                </div>

                <Button
                    type="submit"
                    buttonType="login"
                    containerClass={`form-button ${isButtonDisabled ? "form-disabled--btn" : "form-active--btn"}`}
                    disabled={isButtonDisabled}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </Button>

                <p className="signup-link">
                    Don't have an account? <Link to="/signup">Register</Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;