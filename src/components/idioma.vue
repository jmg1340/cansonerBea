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
    const opcioAcords = props.opcioAcords


    return {idioma}

  }


})



</script>
