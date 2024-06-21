<template>
  <main class="screenHeight w-full flex justify-center">
    <div class="py-14 flex flex-col items-center gap-14 w-full">
      <h1 v-if="step == 1 || step == 2" class="font-bold text-3xl">Checkout</h1>
      <form
        v-if="step == 1"
        @submit="onsubmitAddress"
        class="flex flex-col gap-4 w-full max-w-[500px] px-4"
      >
        <div class="flex flex-col gap-2">
          <label for="name" class="font-bold">Nombre completo</label>
          <input
            type="text"
            id="name"
            name="name"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none"
            placeholder="Ej. Juan Pérez"
            required
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="address" class="font-bold">Dirección de envío</label>
          <input
            type="text"
            id="address"
            name="address"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none"
            placeholder="Ej. Calle 123 # 45-67"
            required
          />
        </div>
        <div class="flex gap-4 flex-col md:flex-row">
          <div class="flex flex-col gap-2 w-full">
            <label for="address" class="font-bold">Ciudad</label>
            <input
              type="text"
              id="city"
              name="city"
              class="border border-gray-300 rounded-lg p-2 focus:outline-none"
              placeholder="Ej. Medellín"
              required
            />
          </div>

          <div class="flex flex-col gap-2 w-full">
            <label for="address" class="font-bold">Estado</label>
            <input
              type="text"
              id="state"
              name="state"
              class="border border-gray-300 rounded-lg p-2 focus:outline-none"
              placeholder="Ej. Antioquia"
              required
            />
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label for="address" class="font-bold">Código postal</label>
          <input
            type="text"
            id="postalCode"
            name="postalCode"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none"
            placeholder="Ej. 12345"
            required
          />
        </div>

        <div v-if="cartItems.length" class="flex flex-col gap-2">
          <strong>Artículos:</strong>
          <div class="flex gap-5 mt-3">
            <div
              v-for="item in cartItems"
              class="relative p-2 rounded-lg border border-gray-300"
            >
              <img
                :src="item.image"
                :alt="item.title"
                class="h-[100px] w-[100px] object-contain"
              />
              <div
                type="button"
                class="absolute -top-4 -right-4 bg-white p-1 rounded-full shadow text-xs w-[30px] h-[30px] font-bold flex items-center justify-center z-40"
              >
                x{{ item.quantity }}
              </div>
            </div>
          </div>
        </div>
        <div v-else>*No hay productos en el carrito</div>

        <div class="flex flex-col-reverse md:flex-row gap-4 mt-3">
          <router-link
            to="/cart"
            class="btn btn-outline block w-full text-center"
            >Volver</router-link
          >
          <button
            :disabled="!cartItems.length"
            type="submit"
            class="btn btn-filled w-full text-center flex items-center justify-center gap-1 disabled:bg-gray-300 disabled:border-gray-300 disabled:cursor-not-allowed"
          >
            Continuar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-arrow-right"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </form>

      <form
        @submit="onsubmitPayment"
        v-if="step == 2"
        class="flex flex-col gap-4 w-full max-w-[500px] px-4"
      >
        <div class="flex flex-col gap-2">
          <label for="name" class="font-bold flex gap-3 items-center"
            >Numero de tarjeta

            <div class="flex gap-2">
              <img
                src="https://1000marcas.net/wp-content/uploads/2019/12/logo-Mastercard.png"
                class="w-8 h-8 object-contain"
              />
              <img
                src="https://1000marcas.net/wp-content/uploads/2019/12/VISA-Logo.png"
                class="w-8 h-8 object-contain"
              />
            </div>
          </label>
          <input
            type="text"
            id="cardNumber"
            name="card"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none"
            placeholder="Ej. 1234 5678 9012 3456"
            required
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="address" class="font-bold">Nombre en la tarjeta</label>
          <input
            type="text"
            id="name"
            name="name"
            class="border border-gray-300 rounded-lg p-2 focus:outline-none"
            placeholder="Ej. Juan Pérez"
            required
          />
        </div>
        <div class="flex gap-4 flex-col md:flex-row">
          <div class="flex flex-col gap-2 w-full">
            <label for="address" class="font-bold">Fecha de expiración</label>
            <input
              type="date"
              id="expiryDate"
              name="expiryDate"
              class="border border-gray-300 rounded-lg p-2 focus:outline-none"
              placeholder="Ej. 12/23"
              required
            />
          </div>

          <div class="flex flex-col gap-2 w-full">
            <label for="address" class="font-bold">Código de seguridad</label>
            <input
              pattern="[0-9]{3}"
              maxlength="3"
              id="securityCode"
              name="securityCode"
              class="border border-gray-300 rounded-lg p-2 focus:outline-none"
              placeholder="Ej. 123"
              required
            />
          </div>
        </div>

        <div class="flex flex-col gap-2 my-4">
          <div v-for="item in cartItems" class="flex w-full justify-between">
            <span>{{ item.title }} (x{{ item.quantity }})</span>
            <span>{{ formatPrice(item.price * item.quantity) }}</span>
          </div>
        </div>

        <div class="flex w-full justify-between">
          <strong>Total:</strong>
          <span>{{ formatPrice(cartStore.cartTotal) }}</span>
        </div>

        <div class="flex flex-col-reverse md:flex-row gap-4 mt-3">
          <router-link
            to="/cart"
            class="btn btn-outline block w-full text-center"
            >Volver</router-link
          >
          <button
            @click="submit"
            class="btn btn-filled w-full text-center flex items-center justify-center gap-1"
          >
            Pagar
          </button>
        </div>
      </form>

      <div
        v-if="step == 3"
        class="flex flex-col items-center justify-center gap-3 mt-4"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="200"
          height="200"
          fill="#000000"
          viewBox="0 0 256 256"
        >
          <path
            d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"
          ></path>
        </svg>
        <p class="text-2xl">¡Orden confirmada!</p>
        <router-link to="/" class="text-center btn btn-filled mt-2">
          Volver a la tienda
        </router-link>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "../store/cart";

const step = ref(1);

const cartStore = useCartStore();

const { cartItems } = cartStore;
const { totalItems } = storeToRefs(cartStore);
const { removeFromCart, increaseQuantity, decreaseQuantity } = cartStore;

const onsubmitAddress = (e) => {
  e.preventDefault();
  step.value++;
};

const onsubmitPayment = (e) => {
  e.preventDefault();
  removeFromCart(cartItems.map((item) => item.id));
  step.value++;
};

const formatPrice = (price) => {
  const ColombianPeso = new Intl.NumberFormat("es-co", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
  });
  return ColombianPeso.format(price);
};
</script>
