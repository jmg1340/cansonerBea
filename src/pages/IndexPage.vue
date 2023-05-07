<template>
  <div class="column items-center q-mt-lg">
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->

    <!-- <q-btn class="col-auto" @click="mostraCanso('blau', '1')">cansonerProva (canço numero 1)</q-btn>
    <q-btn class="col-auto" @click="mostraCanso('vermell', '2')">cansonerProva (canço numero 2)</q-btn> -->

      <!-- <cmp_buscarPerText /> -->

  </div>
</template>

<script>
import { defineComponent, components } from 'vue'
import cmp_buscarPerText from "./BuscarPerText.vue"
import { useRouter } from "vue-router";


export default defineComponent({
  name: 'IndexPage',
  components: { cmp_buscarPerText},

  setup() {
    const router = useRouter();

    const cansoners = [
      { nom: "Cansoner de Prova", fitxer: "cansonerProva"}
    ]

    const mostraCanso = ( cansoner, numero ) => {
      router.push({ name: "canso", query: { cansoner,  numero } })
    }



    return { mostraCanso }
  }

})
</script>
