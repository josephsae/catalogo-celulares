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

        <div class="flex gap-2 items-center justify-center">
          <span class="font-bold whitespace-nowrap">Filtrar por:</span>
          <select
            class="bg-gray-100 rounded-lg focus-within:outline-none text-sm"
            v-model="sort"
          >
            <option value="price">Precio (mayor - menor)</option>
            <option value="rating">Rating (mejor - peor)</option>
          </select>
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

onMounted(async () => {
  await fetch("https://product-catalog-9sk0.onrender.com/products")
    .then((response) => response.json())
    .then((data) => {
      products.value = data;
      loading.value = false;
    });
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
});
</script>
