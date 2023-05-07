<template>

  <div class="row justify-center">
    <q-card class="col-auto q-pa-md q-mb-md">
      <div class="text-center text-h6 text-grey-5"> {{ idioma.titol }}</div>
      <cmp_Lletra :lletra="idioma.lletra"/>
    </q-card>
  </div>

</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import cmp_Lletra from "../components/lletra.vue"

export default defineComponent({
  components: { cmp_Lletra },
  props: {
    idioma: {
      type: Object,
      required: true
    }
  },


  setup( props ){
    const idioma = props.idioma
  //   {
  //     titol: "titulo canción 1",
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

	// }


    return {idioma}

  }


})



</script>
