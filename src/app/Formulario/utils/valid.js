export const Valid = {
    validateEmail(email){
        // validar email usando regex
        const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return re.test(email);
      },
      validatePassword(password){
        // Passwordtiene que ser al menos 6 caracteres
        return password.length >= 6;
      }
}