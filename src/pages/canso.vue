<template>

  <div>

    <div class="row justify-between items-center">
      <div class="col-auto q-ml-sm">
        <q-chip dense color="cyan-2">{{ canso.numero }} - {{ cansoner }}</q-chip>
        <!-- Cançoner: <q-chip dense color="cyan-2">{{ cansoner }}</q-chip>
        Número: <q-chip dense color="cyan-2">{{ canso.numero }}</q-chip> -->
      </div>

      <div class="col text-center" >
        <q-checkbox v-model="store.opcioAcords" label="acords"/>
      </div>

      <div class="col-auto">
        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="center"
          narrow-indicator
        >
          <q-tab v-for="(idioma, index) in arrIdiomes"
            :key="'t'+index"
            :name="idioma"
            :label="idioma"
          />
        </q-tabs>
      </div>
    </div>





    <q-separator />

    <q-tab-panels v-model="tab" animated>
      <q-tab-panel
        v-for="(idioma, index) in arrIdiomes"
        :key="'tp'+index"
        :name="idioma"
      >
        <cmp_idioma :idioma="canso.idioma[idioma]" />
      </q-tab-panel>

    </q-tab-panels>


  </div>



</template>

<script>
import { defineComponent, computed, ref } from 'vue'
import cmp_idioma from "../components/idioma.vue"
import { useRoute } from "vue-router";
import { useCansonerStore } from '../stores/example-store'

export default defineComponent({
  components: { cmp_idioma },


  setup(){
    const route = useRoute();
    const store = useCansonerStore()


    const cansoner = route.query.cansoner
    const numero = route.query.numero

    console.log( "cansoner", cansoner )
    console.log( "numero", numero )


    const cansoners = store.cansoners
    console.log( "cansoners", cansoners )

    // const cansoners = {
    //   cansonerProva
    // }

    // const opcioAcords = ref( false )

    const arrCansonsCansoner = cansoners.find( obj => obj.clau === cansoner ).arrCansons
    console.log ("arrCansonsCansoner", arrCansonsCansoner )
    const canso = arrCansonsCansoner.find( obj => obj.numero === parseInt( numero ))
    console.log ("canso", canso )

    // {
    // numero: 1,
    // idioma: {
    //   castella: {
    //     titol: "titulo canción 1",
    //     lletra: [
    //       {
    //         tipus: "estrofa",
    //         paragraf: [
    //           {
    //             acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //             text: "paragraf 1 text de la linia numero 1"
    //           },
    //           {
    //             acords: [ { nota: "Mi", pos: 8},{ nota: "Fa", pos: 18}],
    //             text: "paragraf 1 text de la linia numero 2"
    //           },
    //           {
    //             text: "paragraf 1 text de la linia numero 3"
    //           },
    //           {
    //             text: "paragraf 1 text de la linia numero 4"
    //           }
    //         ]
    //       },
    //       {
    //         tipus: "estrofa",
    //         paragraf: [
    //           {
    //             acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //             text: "paragraf 2 text de la linia numero 1"
    //           },
    //           {
    //             text: "paragraf 2 text de la linia numero 2"
    //           },
    //           {
    //             text: "paragraf 2 text de la linia numero 3"
    //           },
    //           {
    //             acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //             text: "paragraf 2 text de la linia numero 4"
    //           },
    //         ]
    //       },
    //     ]
    //   },
    //   catala: {
    //     titol: "titol canço 1",
    //     lletra: [
    //       {
    //         tipus: "tornada",
    //         paragraf: [
    //           {
    //             acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //             text: "paragraf 1 text de la linia numero 1"
    //           },
    //           {
    //             acords: [ { nota: "Mi", pos: 8},{ nota: "Fa", pos: 18}],
    //             text: "paragraf 1 text de la linia numero 2"
    //           },
    //           {
    //             text: "paragraf 1 text de la linia numero 3"
    //           },
    //           {
    //             text: "paragraf 1 text de la linia numero 4"
    //           }
    //         ]
    //       },
    //       {
    //         tipus: "tornada",
    //         paragraf: [
    //           {
    //             acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //             text: "paragraf 2 text de la linia numero 1"
    //           },
    //           {
    //             text: "paragraf 2 text de la linia numero 2"
    //           },
    //           {
    //             text: "paragraf 2 text de la linia numero 3"
    //           },
    //           {
    //             acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //             text: "paragraf 2 text de la linia numero 4"
    //           },
    //         ]
    //       },
    //     ]
    //   },

    // }
    // }

    const arrIdiomes = computed ( () => Object.keys(canso.idioma) )
    const tab = ref( arrIdiomes.value[0] )


    return { arrIdiomes, tab, canso, cansoner, store }

  }


})



</script>
