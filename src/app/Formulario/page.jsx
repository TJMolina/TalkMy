"use client";
import "../../styles/formulario.css";
import Header from "@/componentes/header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Footer from "@/componentes/footer";
import { AiOutlineArrowLeft } from "react-icons/ai";
import ApagarLuz from "@/componentes/modoOscuroButton";
import { getAuth } from "../../libs/firebase-utils";
import { Valid } from "./utils/valid";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const router = useRouter();

  const registerOrLogin = (event, noEstaRegistrado) => {
    event.preventDefault();

    // verficiar si hay errores
    setErrors({});

    let formErrors = {};
    if (!Valid.validateEmail(email)) {
      formErrors.email = "Email invalido";
    }
    if (!Valid.validatePassword(password)) {
      formErrors.password = "La contraseña debe tener mas de 6 caracteres";
    }

    if (Object.keys(formErrors).length === 0) {
      // Funcion que realiza la autenticacion
      getAuth(email.trim(), password, router, noEstaRegistrado, false, undefined);
    } else {
      // si hay errores, mostrarlos en el formulario
      setErrors(formErrors);
    }
  };

  return (
    <>
      <Header>
        <div className="contenedorLabels">
          <Link href="/" className="label">
            <AiOutlineArrowLeft />
          </Link>
          <ApagarLuz />
        </div>
      </Header>
      <main>
        <div className="wrapper">
          <div className="loginbox">
            <form>
              <h1>Login</h1>
              <div className="inputbox">
                <input
                  placeholder="Nombre"
                  name="nombre"
                  className="input"
                  minLength="5"
                  maxLength="25"
                  pattern="[A-Za-z0-9\s]+"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {errors.email && <p>{errors.email}</p>}
              <div className="inputbox">
                <input
                  name="contrase"
                  placeholder="Contraseña"
                  minLength="5"
                  maxLength="15"
                  pattern="[A-Za-z0-9\s]+"
                  required
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && <p>{errors.password}</p>}
              <div>
                <p>
                  ¿No tenés cuenta?{" "}
                  <a
                    href="#"
                    className="registerlink"
                    onClick={() =>
                      document.querySelector(".wrapper").classList.add("active")
                    }
                  >
                    Register
                  </a>
                </p>
              </div>
              <button type="button" className="btn" onClick={(e)=>registerOrLogin(e, false)}>
                Iniciar sesión
              </button>
            </form>
          </div>

          <div className="registrarbox">
            <form>
              <h1>Registro</h1>
              <div className="inputbox">
                <input
                  name="nombre"
                  placeholder="Nombre"
                  className="input"
                  minLength="5"
                  maxLength="25"
                  pattern="[A-Za-z0-9\s]+"
                  required
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p>{errors.email}</p>}
              </div>
              <div className="inputbox">
                <input
                  name="contrase"
                  placeholder="Contraseña"
                  minLength="5"
                  maxLength="15"
                  pattern="[A-Za-z0-9\s]+"
                  required
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && <p>{errors.password}</p>}
              <div>
                <p>
                  ¿Tienes una cuenta?{" "}
                  <a
                    href="#"
                    className="loginlink"
                    onClick={() =>
                      document
                        .querySelector(".wrapper")
                        .classList.remove("active")
                    }
                  >
                    login
                  </a>
                </p>
              </div>
              <button type="button" className="btn" onClick={(e)=>registerOrLogin(e,true)}>
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
