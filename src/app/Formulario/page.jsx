'use client'
import { iniciar, registrarse } from "@/libs/login-register";
import { useEffect } from "react";
const LoginPage = () => {
  useEffect(() => {
    const wrapper = document.querySelector(".wrapper");
    const loginLink = document.querySelector(".loginlink");
    const registerLink = document.querySelector(".registerlink");
    registerLink.addEventListener("click", () => {
      wrapper.classList.add("active");
    });
    loginLink.addEventListener("click", () => {
      wrapper.classList.remove("active");
    });
  }, []);

  return (
    <>
      <main className="container">
      <header className="header">
        <h1>TalkMy!</h1>
      </header>
        <div className="wrapper">
          <div className="loginbox">
            <form onSubmit={iniciar}>
              <h1>Login</h1>
              <div className="inputbox">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  className="input"
                  minLength="5"
                  maxLength="25"
                  pattern="[A-Za-z0-9\s]+"
                  required
                />
              </div>
              <div className="inputbox">
                <input
                  type="password"
                  name="contrase"
                  placeholder="Contraseña"
                  minLength="5"
                  maxLength="15"
                  pattern="[A-Za-z0-9\s]+"
                  required
                />
              </div>
              <div>
                <p>
                  ¿No tenés cuenta?{" "}
                  <a href="#" className="registerlink">
                    Register
                  </a>
                </p>
              </div>
              <button type="submit" className="btn">
                Iniciar sesión
              </button>
            </form>
          </div>

          <div className="registrarbox">
            <form onSubmit={registrarse}>
              <h1>Registro</h1>
              <div className="inputbox">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre"
                  className="input"
                  minLength="5"
                  maxLength="25"
                  pattern="[A-Za-z0-9\s]+"
                  required
                />
              </div>
              <div className="inputbox">
                <input
                  type="password"
                  name="contrase"
                  placeholder="Contraseña"
                  minLength="5"
                  maxLength="15"
                  pattern="[A-Za-z0-9\s]+"
                  required
                />
              </div>
              <div>
                <p>
                  ¿Tienes una cuenta?{" "}
                  <a href="#" className="loginlink">
                    login
                  </a>
                </p>
              </div>
              <button type="submit" className="btn">
                Registrarse
              </button>
            </form>
          </div>
        </div>
        <div></div>
      </main>
      <style jsx>{`
        .container {
          display: inline-flex;
          backdrop-filter: blur(20px);
          width: 100%;
          justify-content: space-between;
        }
      `}</style>
    </>
  );
};

export default LoginPage;
