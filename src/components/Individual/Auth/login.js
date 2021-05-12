import React, { useState } from "react"
import { Redirect, Link } from "react-router-dom"
import "../../../assets/scss/login.scss"
import logo from "../../../assets/images/qr.jpg"
import { individualLogin } from "../../../services/auth"

const Login = ({ logged, setLogged }) => {
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [disable, setDisable] = useState(false)
    const [error, setError] = useState({
        userId: "",
        password: "",
        loginErr: "",
    })

    const handleChange = (event) => {
        if (event.target.id === "userId") {
            setError((err) => {
                return { ...err, userId: "" }
            })
            setUserId(event.target.value)
        } else if (event.target.id === "password") {
            setError((err) => {
                return { ...err, password: "" }
            })
            setPassword(event.target.value)
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setDisable(true)
        if (handleError()) {
            try {
                setError((err) => {
                    return { ...err, loginErr: "" }
                })

                var login = await individualLogin(userId, password)
                if (login.success) {
                    setLogged(true)
                } else {
                    setError((err) => {
                        return { ...err, loginErr: login.message }
                    })
                    setDisable(false)
                }
            } catch (error) {
                setError((err) => {
                    return { ...err, loginErr: error.message }
                })
                setDisable(false)
            }
        } else {
            setDisable(false)
        }
    }

    const handleError = () => {
        var noError = true
        if (userId === "") {
            setError((err) => {
                return { ...err, userId: "User ID is required." }
            })
            noError = false
        }

        if (password === "") {
            setError((err) => {
                return { ...err, password: "Password is required." }
            })
            noError = false
        } else if (password.length > 0 && password.length < 8) {
            setError((err) => {
                return {
                    ...err,
                    password: "Password should be greater than 8 characters.",
                }
            })
            noError = false
        }

        return noError
    }

    if (logged) {
        return <Redirect to="/individual" />
    } else {
        return (
            <>
                <div style={{ paddingTop: "70px" }}>
                    <div className="auth-body login-content d-flex align-items-center py-0 py-md-4 mb-5">
                        <div className="container custom-row">
                            <div className="row">
                                <div className="col-md-6 d-flex align-items-center">
                                    <img
                                        src={logo}
                                        alt="logo"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="col-md-6 d-flex align-items-center justify-content-center">
                                    <div className="row">
                                        <div className="col-md-10">
                                            <div className="mb-4">
                                                <h3>Login to V-Trace</h3>
                                                <p className="mb-4">
                                                    V-Trace is an android app
                                                    that is intended for contact
                                                    tracing.
                                                </p>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="userId"
                                                        placeholder="User ID"
                                                        value={userId}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {error.userId}
                                                    </p>
                                                </div>
                                                <div className="form-group last mb-2">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        id="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={handleChange}
                                                    />
                                                    <p className="text-danger">
                                                        {error.password}
                                                    </p>
                                                </div>
                                                <p className="text-danger mt-3 text-center">
                                                    {error.loginErr}
                                                </p>
                                                <div className="forgot d-flex justify-content-start">
                                                    <p>
                                                        Don't have an account?{" "}
                                                        <Link
                                                            to="/individual/signup"
                                                            className="forgot-link"
                                                        >
                                                            Signup here.
                                                        </Link>
                                                    </p>
                                                </div>
                                                <input
                                                    type="submit"
                                                    value={
                                                        !disable
                                                            ? "Login"
                                                            : "Loading..."
                                                    }
                                                    className="btn btn-block btn-primary"
                                                    disabled={disable}
                                                />
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Login
