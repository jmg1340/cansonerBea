<template>
  <!-- <pre>{{ estrofa }}</pre> -->

    <q-card v-for="(objEstrofa, index) in lletra" :key="index" class="q-pa-md q-mb-md">
      <cmp_Estrofa :estrofa="objEstrofa"/>
    </q-card>

</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import cmp_Estrofa from "../components/estrofa.vue"

export default defineComponent({
  components: { cmp_Estrofa },
  props:{
    lletra: {
      type: Array,
      required: true
    }
  },

  setup( props ){
    const lletra = props.lletra
    // [
    //   {
    //     tipus: "estrofa",
    //     paragraf: [
    //       {
    //         acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //         text: "paragraf 1 text de la linia numero 1"
    //       },
    //       {
    //         acords: [ { nota: "Mi", pos: 8},{ nota: "Fa", pos: 18}],
    //         text: "paragraf 1 text de la linia numero 2"
    //       },
    //       {
    //         text: "paragraf 1 text de la linia numero 3"
    //       },
    //       {
    //         text: "paragraf 1 text de la linia numero 4"
    //       }
    //     ]
    //   },
    //   {
    //     tipus: "estrofa",
    //     paragraf: [
    //       {
    //         acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //         text: "paragraf 2 text de la linia numero 1"
    //       },
    //       {
    //         text: "paragraf 2 text de la linia numero 2"
    //       },
    //       {
    //         text: "paragraf 2 text de la linia numero 3"
    //       },
    //       {
    //         acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //         text: "paragraf 2 text de la linia numero 4"
    //       },
    //     ]
    //   },
    // ]


    return {lletra}

  }


})



</script>
