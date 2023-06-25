<template>
  <!-- <pre>{{ estrofa }}</pre> -->

    <div v-for="(objEstrofa, index) in lletra" :key="index">
      <div v-if="store.opcioAcords === false">
        <cmp_Estrofa
        :estrofa="objEstrofa"
        class="q-pa-sm"
        />
        <q-separator color="grey-6" size="1px" spaced="lg"/>
      </div>
      <div v-else-if="objEstrofa.visibleAlsMusics !== false">
        <cmp_Estrofa
        :estrofa="objEstrofa"
        class="q-pa-sm"
        />
        <q-separator color="grey-6" size="1px"/>
      </div>
    </div>

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
