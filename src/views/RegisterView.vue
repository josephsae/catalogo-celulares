<template>
  <div class="register-container">
    <h2>Registrarse</h2>
    <form @submit.prevent="register" class="form">
      <div class="form-group">
        <input
          type="text"
          v-model="email"
          placeholder="Correo electrónico"
          required
        />
      </div>
      <div class="form-group">
        <input
          type="password"
          v-model="password"
          placeholder="Contraseña"
          required
        />
      </div>
      <button type="submit" class="btn">Registrarse</button>
      <div v-if="errors.length" class="errors">
        <ul>
          <li v-for="(error, index) in formattedErrors" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
      <div v-if="duplicateError" class="error">
        {{ duplicateError }}
      </div>
    </form>
  </div>
</template>

<script>
import { useUserStore } from "../store/user";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
      duplicateError: null,
    };
  },
  computed: {
    formattedErrors() {
      return this.errors.map((error) => {
        const constraints = Object.values(error.constraints);
        return constraints
          .map((constraint) => this.translateError(constraint))
          .join(", ");
      });
    },
  },
  methods: {
    translateError(error) {
      const translations = {
        "email must be an email": "El correo electrónico debe ser válido",
        "password must be longer than or equal to 6 characters":
          "La contraseña debe tener al menos 6 caracteres",
        "password should not be empty": "La contraseña no debe estar vacía",
      };
      return translations[error] || error;
    },
    async register() {
      try {
        this.errors = [];
        this.duplicateError = null;
        const userStore = useUserStore();
        await userStore.register({
          email: this.email,
          password: this.password,
        });
        this.$router.push("/");
      } catch (error) {
        console.error("Register error:", error);
        if (error.type === "duplicate") {
          this.duplicateError = "Este usuario ya está registrado";
        } else if (error.errors) {
          this.errors = error.errors;
        } else {
          this.errors = [
            {
              property: "general",
              constraints: { message: "Error al registrarse" },
            },
          ];
        }
      }
    },
  },
};
</script>

<style scoped>
.errors {
  color: red;
  margin-top: 10px;
}

.errors ul {
  padding-left: 20px;
}

.errors li {
  margin-bottom: 10px;
  list-style-type: none;
}

.error {
  color: red;
  margin-top: 10px;
}

.register-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
}

h2 {
  text-align: center;
  margin-bottom: 20px;
  font-size: 2em;
  font-weight: bold;
}

.form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.btn {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
}

.btn:hover {
  background-color: #0056b3;
}
</style>
