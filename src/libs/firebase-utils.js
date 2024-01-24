import { auth } from "./firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const getAuth = async (email, password, router, isSignUp) => {
  if (isSignUp) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCred) => {
        fetch("/api/auth", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await userCred.user.getIdToken()}`,
          },
        }).then((response) => {
          if (response.status === 200) {
            window.location.href = "/";
          }
        });
      })
      .catch((error) => {
        alert(`Sign up failed: ${error.message} - ${error.code}`);
      });
  } else {
    signInWithEmailAndPassword(auth, email.trim(), password)
      .then(async (userCred) => {
        fetch("/api/auth", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${await userCred.user.getIdToken()}`,
          },
        }).then((response) => {
          if (response.status === 200) {
            window.location.href = "/";
          }
        });
      })
      .catch((error) => {
        alert(`Login failed: ${error.message} - ${error.code}`);
      });
  }
};

const singOut = async () => {
  fetch("/api/auth/singOut", {
    credentials: "include"
  })
    .then(() => window.location.reload())
    .catch((e) => console.log(e));
};

export { getAuth, singOut };
