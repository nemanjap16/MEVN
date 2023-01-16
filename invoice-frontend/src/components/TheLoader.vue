<template>
  <div class="wrapper">
    <h1 class="text">Loading...</h1>
  </div>
</template>

<style lang="css" scoped>
.wrapper {
  position: absolute;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  color: #fff;
  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
}

.text {
  font-size: 36px;
  font-weight: bold;
}
</style>
