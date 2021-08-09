<template>
  <div class="overflow-auto">
    <div class='container'>
        <b-alert
        :variant="alert.color"
        dismissible
        fade
        v-model="alert.visible"
      >
        {{alert.message}}
      </b-alert>
    </div>
    <p class="mt-3">Current Page: {{ currentPage }}</p>
    <b-button variant="success" class='mb-sm-3' @click="newMatch" v-if="!formvisible">Create new Match</b-button>
    <DataForm v-if="formvisible" ref="dataform"></DataForm>
    <b-table
      id="my-table"
      :fields="fields"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
      head-row-variant="primary"
      ref='table'
    >
    <template #cell(actions)="row">
        <b-button size="sm" @click="deleteRow(row.item)" class="mr-1" variant="danger">
          Delete
        </b-button>
        <b-button size="sm" @click="updateRow(row.item)" class="mr-1" variant="primary">
          Update
        </b-button>
      </template>
    </b-table>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
      class='pagination'
    ></b-pagination>
  </div>
</template>

<script>
  import DataForm from "./DataForm.vue"
  export default {
    components: {
      DataForm
    },
    data() {
      return {
        ids: [],
        alert: {
          visible: false,
          message:"",
          color: ""
        },
        formvisible: false,
        updaterow: false,
        perPage: 7,
        currentPage: 1,
        fields: [
            {
                key: 'id',
                sortable: true,
                label: "ID"
            },
            {
                key: 'teams',
                sortable: false,
                label: 'Teams'

            },
            {
                key: 'date',
                label: 'Date',
                sortable: true
            },
            {
                key: 'time',
                label: 'Time',
                sortable: true
            },
            {
                key: 'result',
                label: 'Result',
            },
            {
                key: 'actions',
                label: 'Actions'
            }
        ],
        items: [   
        ]
      }

    },
    computed: {
      rows() {
        return this.items.length
      }
    },
    async mounted() {
      let res =  await this.$axios.get('');
      res = res.data.doc[0].data.matches;
      console.log(res);
      for (const [key, value] of Object.entries(res)) {
        this.items.push({
          id: key,
          teams: value.teams.home.name+" vs "+value.teams.away.name,
          date: value.time.date,
          time: value.time.time,
          result:value.result.home+" - "+value.result.away
        });
        this.ids.push(key);
      }
    },
    methods: {
      deleteRow(item) {
        this.items = this.items.filter(el => parseInt(el.id) !==parseInt(item.id));
        this.formvisible = false;
        this.alert.message = `Hai cancellato il match ${item.id}`;
        this.alert.color = "danger";
        this.alert.visible = true;
      },
      updateRow(item){
        if(this.formvisible){
          this.$refs.dataform.popolate(item);
        }else{
          this.formvisible = true;
        }
        this.updaterow = item;
      },
      newMatch()
      {
        this.formvisible = !this.formvisible;
        this.updaterow = false;
      },
      roll(l,flag){
        if(flag){
          for(let i=0; i < this.items.length; i++){
              if(parseInt(this.items[i].id)===parseInt(l.id)){
                  this.items[i]= l;
              }
          }
          this.formvisible = false;
          this.$refs.table.refresh();
          this.alert.message = `Ha fatto l'update del match: ${l.id}`;
          this.alert.color = "primary";
          this.alert.visible = true;
        }else{
          this.items.unshift(l);
          this.$refs.table.refresh();
          this.alert.message = `Hai creato un nuovo match: ${l.id}`;
          this.alert.color = "success";
          this.alert.visible = true;
        }
      }
    }
  }
</script>