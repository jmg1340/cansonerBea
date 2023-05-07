<template>
  <div>

    <div v-if="linia.acords" class="lletraAmpladaFixe" >
      <div v-html="acordsText" class="text-blue text-bold"/>
      <div v-html="textAmbEspais" />
    </div>
    <div v-else>
      {{ linia.text}}
    </div>

  </div>
</template>

<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'liniaTextAcords',
  props: {
    linia: {
      type: Object,
      required: true
    },
  },

  setup( props ){

    // const linia = {
    //   acords: [ { nota: "Do", pos: 4},{ nota: "Si", pos: 10},{ nota: "La", pos: 20}],
    //   text: "paragraf 1.            text de la linia numero 1"
    // }

    const linia = props.linia
    const textAmbEspais = computed ( () => linia.text.replaceAll(" ", "&nbsp;"))

    const acordsText = computed ( () => {

      if (linia.acords !== undefined) {
        const textLength = linia.text.length
        // console.log(textLength)

        let textAcords = " ".repeat(textLength)
        // console.log("textAcords", "[" + textAcords + "]")

        linia.acords.forEach( (obj, idx, matriu ) => {
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
        return textAcords.replaceAll(" ", "&nbsp;")

      } else {
        return null
      }
    })


    return {
      linia,
      textAmbEspais,
      acordsText
    }

  }

})
</script>


<style>
  .lletraAmpladaFixe{
    font-family: monospace, 'Courier New', Courier, monospace;
  }
</style>
