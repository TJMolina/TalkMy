'use client';
import '../../styles/formulario.css'
import { iniciar, registrarse } from "@/libs/login-register";
import Container from "@/componentes/container";
import Header from "@/componentes/header";
import Link from "next/link";
import Footer from "@/componentes/footer";
import { AiOutlineArrowLeft } from 'react-icons/ai';
import ApagarLuz from '@/componentes/modoOscuroButton';
const LoginPage = () => {
  return (
    <>
      <Header>
        <div className="contenedorLabels">
          <Link href="/" className="label"><AiOutlineArrowLeft /></Link>
          <ApagarLuz />
        </div>
      </Header>
      <main>
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
                  <a href="#" className="registerlink" onClick={() => document.querySelector(".wrapper").classList.add("active")}>
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
                  <a href="#" className="loginlink" onClick={() => document.querySelector(".wrapper").classList.remove("active")}>
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
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
