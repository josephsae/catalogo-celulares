<template>
  <section class="flex items-center justify-center py-16" id="products">
    <div class="max-w-7xl w-5/6 flex flex-col gap-8">
      <div
        class="flex flex-col md:flex-row md:justify-between items-center justify-center gap-5 md:gap-8"
      >
        <input
          v-model="search"
          type="text"
          placeholder="Buscar"
          class="w-full py-2 px-4 bg-gray-100 rounded-lg focus-within:outline-none max-w-[400px]"
        />

        <button
          @click="showFiltersModal = !showFiltersModal"
          class="flex items-center justify-center gap-1 font-semibold px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#000000"
            viewBox="0 0 256 256"
          >
            <path
              d="M230.6,49.53A15.81,15.81,0,0,0,216,40H40A16,16,0,0,0,28.19,66.76l.08.09L96,139.17V216a16,16,0,0,0,24.87,13.32l32-21.34A16,16,0,0,0,160,194.66V139.17l67.74-72.32.08-.09A15.8,15.8,0,0,0,230.6,49.53ZM40,56h0Zm106.18,74.58A8,8,0,0,0,144,136v58.66L112,216V136a8,8,0,0,0-2.16-5.47L40,56H216Z"
            ></path>
          </svg>
          Filtrar por características
        </button>
      </div>

      <div
        v-if="showFiltersModal"
        class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
        @click="showFiltersModal = false"
      >
        <div
          @click.stop
          class="relative bg-white p-6 rounded-lg w-full mx-4 flex flex-col gap-5 items-center justify-center max-w-[600px]"
        >
          <button
            @click="showFiltersModal = false"
            class="absolute top-4 right-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="#000000"
              viewBox="0 0 256 256"
            >
              <path
                d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"
              ></path>
            </svg>
          </button>
          <strong class="text-xl mb-1">Filtros</strong>
          <select
            class="bg-gray-100 rounded-lg focus-within:outline-none text-sm w-full p-2 cursor-pointer"
            v-model="sort"
          >
            <option value="price">Precio (mayor - menor)</option>
            <option value="rating">Rating (mejor - peor)</option>
          </select>

          <div class="flex flex-col gap-2 w-full">
            <strong>Memoria RAM:</strong>
            <div class="flex flex-wrap gap-2 text-sm">
              <span
                @click="ramSelected = ''"
                :class="
                  !ramSelected
                    ? 'bg-black text-white hover:bg-black border-black'
                    : ''
                "
                class="px-2 py-1 border border-gray-200 rounded-lg transition-all cursor-pointer hover:bg-gray-200"
              >
                Todos
              </span>
              <span
                @click="ramSelected = ram"
                v-for="ram in allRams"
                :class="
                  ramSelected === ram
                    ? 'bg-black text-white hover:bg-black border-black'
                    : ''
                "
                class="px-2 py-1 border border-gray-200 rounded-lg transition-all cursor-pointer hover:bg-gray-200"
              >
                {{ ram }}
              </span>
            </div>
          </div>

          <div class="flex flex-col gap-2 w-full">
            <strong>Color:</strong>
            <div class="flex flex-wrap gap-2 text-sm">
              <span
                @click="colorSelected = ''"
                :class="
                  !colorSelected
                    ? 'bg-black text-white hover:bg-black border-black'
                    : ''
                "
                class="px-2 py-1 border border-gray-200 rounded-lg transition-all cursor-pointer hover:bg-gray-200"
              >
                Todos
              </span>
              <span
                @click="colorSelected = color"
                v-for="color in allColors"
                :class="
                  colorSelected === color
                    ? 'bg-black text-white hover:bg-black border-black'
                    : ''
                "
                class="px-2 py-1 border border-gray-200 rounded-lg transition-all cursor-pointer hover:bg-gray-200"
              >
                {{ color }}
              </span>
            </div>
          </div>

          <button
            @click="showFiltersModal = false"
            class="btn btn-filled w-full"
          >
            Hecho
          </button>
        </div>
      </div>

      <div
        v-if="filteredProducts.length"
        class="grid grid-cols-1 gap-5 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        <Product
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
        />
      </div>
      <div
        v-else
        v-if="!loading"
        class="h-[200px] w-full text-center flex items-center justify-center text-gray-500 italic"
      >
        No se encontraron resultados
      </div>

      <div v-if="loading">
        <div
          class="grid grid-cols-1 gap-5 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse"
        >
          <div
            v-for="i in 20"
            class="w-full p-4 border border-gray-300 rounded-lg flex items-center md:flex-col"
          >
            <div
              class="w-24 h-24 bg-gray-200 rounded-lg shrink-0 md:w-52 md:h-52 md:my-5 md:mb-8"
            />
            <div class="pl-6 flex flex-col gap-3 w-full md:pb-3 md:px-3">
              <div class="w-full h-4 bg-gray-200 rounded-lg"></div>
              <div class="w-16 h-4 bg-gray-200 rounded-lg"></div>
              <div class="w-32 h-4 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Product from "./Product.vue";
import { ref, onMounted, watchEffect } from "vue";

const loading = ref(true);
const search = ref("");
const sort = ref("price");
const products = ref([]);
const filteredProducts = ref([]);
const showFiltersModal = ref(false);
const allRams = ref([]);
const ramSelected = ref("");
const allColors = ref([]);
const colorSelected = ref("");

onMounted(async () => {
  await fetch("https://product-catalog-9sk0.onrender.com/products")
    .then((response) => response.json())
    .then((data) => {
      products.value = data;
      loading.value = false;
    });

  allRams.value = products.value
    .map((product) => product.ram)
    .filter((ram, index, self) => self.indexOf(ram) === index)
    .sort((a, b) => {
      const ramA = parseInt(a);
      const ramB = parseInt(b);
      return ramA - ramB;
    });

  allColors.value = products.value
    .map((product) => product.color)
    .filter((color, index, self) => self.indexOf(color) === index)
    .sort();

  console.log(allColors.value);
});

watchEffect(() => {
  const searchTerms = search.value
    .toLowerCase()
    .split(" ")
    .filter((term) => term.length > 0);
  filteredProducts.value = products.value.filter((product) =>
    searchTerms.every((term) => product.title.toLowerCase().includes(term))
  );

  if (sort.value === "price") {
    filteredProducts.value = filteredProducts.value.sort(
      (a, b) => b.price - a.price
    );
  } else if (sort.value === "rating") {
    filteredProducts.value = filteredProducts.value.sort(
      (a, b) => b.rating - a.rating
    );
  }

  if (ramSelected.value) {
    filteredProducts.value = filteredProducts.value.filter(
      (product) => product.ram === ramSelected.value
    );
  }

  if (colorSelected.value) {
    filteredProducts.value = filteredProducts.value.filter(
      (product) => product.color === colorSelected.value
    );
  }
});
</script>
