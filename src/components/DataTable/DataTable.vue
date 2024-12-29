<template>
  <table>
    <thead>
      <slot name="table-heading" />
    </thead>

    <tbody>
      <slot name="table-body" />
    </tbody>
  </table>
</template>

<style scoped>
table {
  border: 1px solid #fff;
  border-radius: 0.5rem;
}
</style>
