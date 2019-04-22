<template>
	<div id="home">{{ showArr }}</div>
</template>

<script>
  export default {
    name: "",
    props: {
      testArr: {
        type: Array
      }
    },
    /*data() {
      return {
        showArr: []
      }
    },*/
    computed: {
      showArr() {
        return this.testArr.sort((a, b) => {
          return a - b
        })
      }
    }
  }
</script>

<style scoped>

</style>
