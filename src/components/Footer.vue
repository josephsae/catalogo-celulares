<template>
  <footer
    class="w-full flex items-center justify-center border-t border-gray-300 py-10"
  >
    <div class="flex flex-col max-w-7xl w-5/6 gap-8">
      <div class="flex justify-between items-center">
        <div class="">
          <h3 class="font-bold text-xl">DESARROLLO DE SOFTWARE EN EQUIPO</h3>
          <p class="text-sm text-gray-700">
            Facultad de Ingeniería, diseño e innovación
          </p>
        </div>
        <img src="/logo-pg.webp" alt="Logo" width="120" />
      </div>
      <div class="w-full flex flex-wrap text-xs text-gray-500 text-center gap-x-3 gap-y-1">
         <p class="whitespace-nowrap" v-for="name in names">{{name}}</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const names = [
  "Jhon Marvel Cabrera Muñoz",
  "Yolvis Andrea Torres Torres",
  "Nicolas Beltran Vargas",
  "Laura Vanessa Bernal Saavedra ",
  "Joseph Brayan Smith Caicedo Sáenz",
  "Jaime Andrés Torres Duque",
  "Santiago Betancur Villegas",
];
</script>
