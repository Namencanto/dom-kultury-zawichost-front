<template>
  <section class="relative w-full h-80 md:h-96 bg-cover bg-center">
    <!-- Background Image -->
    <img
      src="/Baner.jpg"
      alt="Background Banner"
      class="absolute inset-0 w-full h-full object-cover"
    />

    <!-- Semi-transparent overlay -->
    <div class="absolute inset-0 bg-black bg-opacity-40"></div>

    <!-- Content -->
    <div
      class="relative z-10 container mx-auto h-full flex flex-col items-start justify-center space-y-4 p-8 text-white"
    >
      <!-- Logo -->
      <div class="w-52 md:w-64">
        <img
          src="/logo.jpg"
          alt="Logo"
          class="w-full h-auto object-contain border-white border-2 rounded-lg shadow-lg"
        />
      </div>

      <!-- Title and Description -->
      <div>
        <h1 class="text-4xl md:text-5xl font-extrabold">
          Miejsko Gminny Ośrodek Kultury i Sportu
        </h1>
        <p class="text-xl text-gray-300">Zawichost</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  position: relative;
  overflow: hidden;
}
</style>
