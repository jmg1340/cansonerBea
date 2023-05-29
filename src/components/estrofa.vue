<template>
  <!-- <pre>{{ estrofa }}</pre> -->
  <!-- <div>{{ store.opcioAcords }}</div> -->
  <div  :class="{'text-negative': estrofa.tipus === 'tornada'}">
    <div v-for="(objLinia, index) in estrofa.paragraf" :key="index">
      <!-- <div>Visible: {{ estrofa.visibleAlsMusics === 1 && index === 0 || estrofa.visibleAlsMusics === true }}</div> -->
      <cmp_linia 
        v-if="store.opcioAcords && (estrofa.visibleAlsMusics === 1 && index === 0 || estrofa.visibleAlsMusics === true)"
        :linia="objLinia"
        :puntsSuspensius="store.opcioAcords && estrofa.visibleAlsMusics === 1 && index === 0"
      />
      <cmp_linia 
        v-else-if="store.opcioAcords === false"
        :linia="objLinia"
      />
    </div>
  </div>

</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useCansonerStore } from '../stores/example-store'
import cmp_linia from "../components/liniaTextAcords.vue"

export default defineComponent({
  components: { cmp_linia },
  props:{
    estrofa: {
      type: Object,
      required: true
    },
  },

  setup( props ){
    const store = useCansonerStore()
    const estrofa = props.estrofa

    // {
    //   tipus: "estrofa",
    //   paragraf: [
    //     {
    //       acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //       text: "paragraf 1 text de la linia numero 1"
    //     },
    //     {
    //       acords: [ { nota: "Mi", pos: 8},{ nota: "Fa", pos: 18}],
    //       text: "paragraf 1 text de la linia numero 2"
    //     },
    //     {
    //       text: "paragraf 1 text de la linia numero 3"
    //     },
    //     {
    //       text: "paragraf 1 text de la linia numero 4"
    //     }
    //   ]
    // }


    return {estrofa, store}

  }


})



</script>
