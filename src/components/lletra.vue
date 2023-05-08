<template>
  <!-- <pre>{{ estrofa }}</pre> -->

    <q-card v-for="(objEstrofa, index) in lletra" :key="index" class="q-pa-sm q-mb-s">
      <cmp_Estrofa
      v-if="store.opcioAcords ? objEstrofa.visibleAlsMusics : true"
      :estrofa="objEstrofa"
      />
    </q-card>

</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import cmp_Estrofa from "../components/estrofa.vue"
import { useCansonerStore } from '../stores/example-store'

export default defineComponent({
  components: { cmp_Estrofa },
  props:{
    lletra: {
      type: Array,
      required: true
    }
  },

  setup( props ){
    const store = useCansonerStore()
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


    return {lletra, store}

  }


})



</script>
