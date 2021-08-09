<template>
  <div id="app">
    <h1>Welcome</h1>
  <DataTable>
  </DataTable>
  </div>
</template>

<script>
import DataTable from "./components/DataTable.vue"

export default{
  name: 'App',
  components: {
      DataTable
  },
  data(){
    return {
       columnsa: [
          {name: "id_bot", th: "ID"},
          {name: "bot_name", th: "Nome"},
          {name: "bot_description", th: "Descrizione"}
        ],
        items: [
          {name: "id_bot", th: "ID"},
          {name: "bot_name", th: "Nome"},
          {name: "bot_description", th: "Descrizione"}
        ]
    }
  },
  props:{
    columns: {
        type: Array,
        default: () => []
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
