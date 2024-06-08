<template>
    <section class="flex items-center justify-center py-16 " id="products">
        <div class="max-w-7xl w-5/6 flex flex-col gap-8">
            <h3 class="text-center text-4xl font-bold">Celulares</h3>

            <div v-if="products.length"
                class="grid grid-cols-1 gap-5 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <Product v-for="product in filteredProducts" :key="product.id" :product="product" />
            </div>
            
            <div v-else>
                <div class="grid grid-cols-1 gap-5 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-pulse">
                    <div v-for="i in 20" class="w-full p-4 border border-gray-300 rounded-lg flex items-center md:flex-col">
                        <div class="w-24 h-24 bg-gray-200 rounded-lg shrink-0 md:w-52 md:h-52 md:my-5 md:mb-8"/>
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

<script>
import Product from './Product.vue'
export default {
    components: {
        Product
    },
    data() {
        return {
            products: [],
        }
    },
    mounted() {
        fetch('https://product-catalog-9sk0.onrender.com/products')
            .then(response => response.json())
            .then(data => {
                this.products = data
                this.filteredProducts = data
            })

    }
}
</script>
