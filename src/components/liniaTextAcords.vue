<template>
  <div>

    <div v-if="(linia.acordsASobre && linia.acordsASota) && store.opcioAcords" class="lletraAmpladaFixe" >
      <div v-html="acordsTextASobre" class="text-blue text-bold margeInferior"/>
      <div v-html="textAmbEspais" class="margeInferior"/>
      <div v-html="acordsTextASota" class="text-blue text-bold"/>
    </div>
    <div v-else-if="linia.acordsASobre && store.opcioAcords" class="lletraAmpladaFixe" >
      <div v-html="acordsTextASobre" class="text-blue text-bold margeInferior"/>
      <div v-html="textAmbEspais" class="no-wrap " />
    </div>
    <div v-else-if="linia.acordsASota && store.opcioAcords" class="lletraAmpladaFixe" >
      <div v-html="textAmbEspais" class="margeInferior"/>
      <div v-html="acordsTextASota" class="text-blue text-bold"/>
    </div>
    <div v-else>
      {{ linia.text + (puntsSuspensius ? " ..." : "")}}
    </div>

  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'
import { useCansonerStore } from '../stores/example-store'


export default defineComponent({
  name: 'liniaTextAcords',
  props: {
    linia: {
      type: Object,
      required: true
    },
    puntsSuspensius: {
      type: Boolean,
      // required: true,
      default: false
    }
  },

  setup( props ){
    const store = useCansonerStore()
    // const linia = {
    //   acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //   text: "paragraf 1.            text de la linia numero 1"
    // }

    const linia = props.linia
    const puntsSuspensius = props.puntsSuspensius

    const textAmbEspais = computed ( () => linia.text.trimEnd() )


    const acordsTextASobre = computed ( () => {
      return acordsText ( linia.acordsASobre )
    })
    const acordsTextASota = computed ( () => {
      return acordsText ( linia.acordsASota )
    })


    const acordsText =  (arrAcords) => {

      if (arrAcords !== undefined) {
        const textLength = linia.text.length
        // console.log(textLength)

        let textAcords = " ".repeat(textLength)
        // console.log("textAcords", "[" + textAcords + "]")

        arrAcords.forEach( (obj, idx, matriu ) => {
          const arr = textAcords.split("")
          // console.log("arr", arr)


          // console.log("obj.pos", obj.pos)
          // console.log("obj.nota.length", obj.nota.length)
          const arr2 = arr.splice(obj.pos, obj.nota.length, ...obj.nota.split(""))
          // console.log("arr", arr)

          const arr3 = arr.toString()
          // console.log("arr3", arr3)

          textAcords = arr.reduce( (ac, elem) => ac + elem , "")
          // console.log("textAcords", "[" + textAcords + "]")
        })

        // console.log("textAcords", "[" + textAcords + "]")
        // console.log("textAcords.length", textAcords.length)
        return textAcords.trimEnd().replaceAll(" ", "&nbsp;")

      } else {
        return null
      }
    }


    return {
      linia,
      textAmbEspais,
      acordsTextASobre,
      acordsTextASota,
      store,
      puntsSuspensius
    }

  }

})
</script>


<style>
  .lletraAmpladaFixe{
    font-family: monospace, 'Courier New', Courier, monospace;
  }
  .margeInferior{
    margin-bottom: -8px;
  }
</style>
