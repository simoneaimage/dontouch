<template>
    <div class='container'>
    <b-form inline class="mb-2">
        <label class="mr-sm-3  mb-sm-2" for="inline-form-input-home">Home</label>
        <b-form-input
            id="inline-form-input-home"
            class="mb-2 mr-sm-3 mb-sm-2"
            v-model="updaterow.home"
            placeholder=''
        ></b-form-input>

        <label class="mr-sm-3  mb-sm-2" for="inline-form-input-away">Away</label>
        <b-form-input
            id="inline-form-input-away"
            class="mb-2 mr-sm-3 mb-sm-2"
            v-model="updaterow.away"
            placeholder=''
        ></b-form-input>

        <label class="mr-sm-3  mb-sm-2" for="example-datepicker">Date</label>
        <b-form-datepicker id="example-datepicker" v-model="updaterow.date" class="mb-2 mr-sm-3 mb-sm-2"></b-form-datepicker>
        
        <label class="mr-sm-3  mb-sm-2" for="example-timepicker">Time</label>
        <b-form-timepicker class="mr-sm-1  mb-sm-2" id='example-timepicker' v-model="updaterow.time"></b-form-timepicker>

        <label class="mr-sm-3  mb-sm-2" for="sh-inline">Punteggio Home</label>
        <b-form-spinbutton class="mr-sm-3  mb-sm-2" id="sh-inline" min='0' v-model="updaterow.homept" inline></b-form-spinbutton>
        
        <label class="mr-sm-3  mb-sm-2" for="sa-inline">Punteggio Away</label>
        <b-form-spinbutton class="mr-sm-3  mb-sm-2" id="sa-inline" min='0' v-model="updaterow.awaypt" inline></b-form-spinbutton>

        <b-button variant="primary" class="mr-sm-3 mb-sm-2" @click="save">Save</b-button>
        <b-button  variant="warning" class="mr-sm-3 mb-sm-2" @click="back">Back</b-button>

    </b-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            updaterow: {
                home: "",
                away: "",
                date: "",
                time: "",
                result: "",
                awaypt: "",
                homept: "",
                id: ""
            }
        }
    },
    mounted(){
        if(this.$parent.updaterow){
            this.popolate(this.$parent.updaterow);
        }
    },
    methods:{
        popolate(data){
            let teams = data.teams.split(' vs ', 2);
            let date = data.date.split('/', 3);   
            let pt = data.result.split(' - ', 2); 
            this.updaterow.result = data.result;
            this.updaterow.home = teams[0];
            this.updaterow.away = teams[1];
            this.updaterow.date = 20+date[2]+"-"+date[1]+"-"+date[0];
            this.updaterow.time = data.time+":00";
            this.updaterow.homept = parseInt(pt[0]);
            this.updaterow.awaypt = parseInt(pt[1]);
            this.updaterow.id = data.id
        },
        back(){
            this.$parent.newMatch();
        },
        save(){
            //questo metodo serve per identiicare univocamente il salvataggio di un record
            //sia che questo sia un nuovo match, sia che sia un update
            if(
                this.updaterow.away!==""
                && this.updaterow.awaypt!==""
                && this.updaterow.date!==""
                && this.updaterow.home!==""
                && this.updaterow.homept!==""
                && this.updaterow.time!==""
                )
            {   
                let newraw ={};
                newraw.teams = this.updaterow.home + " vs "+this.updaterow.away;
                let newdate = this.updaterow.date.split("-",3);
                newraw.date = newdate[2]+"/"+newdate[1]+"/"+newdate[0].substring(2);
                newraw.result = this.updaterow.homept+" - "+this.updaterow.awaypt;
                newraw.time = this.updaterow.time.slice(0,5);
                this.$parent.formvisible=false;
                if(this.updaterow.id===""){
                    newraw.id = this.$parent.ids[0];
                    newraw.id--;
                    this.$parent.items.push(newraw);
                    this.$parent.roll(newraw,false);
                    this.$parent.formvisible=false;
                }else{
                    newraw.id = this.updaterow.id;
                    this.$parent.roll(newraw,true);
                }
               
            }else{
                this.$parent.alert.visible=true;
                this.$parent.alert.message= "ATTENZIONE! Compila tutti i campi prima di inviare";
                this.$parent.alert.color="danger"
            }
        }
    }
}
</script>

