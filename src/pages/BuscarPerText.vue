<template>
  <div class="q-mt-lg">

    <!-- CHECKBOX DE CANÇONERS  -->
    <q-card>
      <q-card-section>
        <div class="row justify-center q-gutter-x-md">
          <q-checkbox
            v-for="(objCansoner, index) in cansoners"
            :key="index"
            class="col-auto"
            v-model="cansonersSeleccionats"
            :label="objCansoner.nom + ' (' + objCansoner.arrCansons.length + ')'"
            :val="objCansoner.clau"
            color="black"
          />

        </div>
      </q-card-section>
    </q-card>


    <!-- BUSCADOR -->
    <q-card class="q-mb-lg">
      <q-card-section>
        <div class="row justify-center">
          <q-input class="col-auto" outlined standout bottom-slots v-model="textABuscar" label="Text a buscar" dense>
            <template v-slot:after>
          <q-btn round dense color="blue" icon="search" @click="buscar"/>
        </template>

          </q-input>

        </div>
      </q-card-section>
    </q-card>


    <!-- CANÇONS TROBADES -->
    <div class="row q-mx-sm text-caption">
      <div class="col">
        Cançons trobades:
        <q-chip text-color="black" color="yellow-6" dense>{{ cansonsTrobades.length }}</q-chip>
      </div>
    </div>


    <q-markup-table

      dense
      bordered
      class="q-mx-sm"
      separator="cell"
    >
      <thead class="bg-grey-4 text-black">
        <tr>
          <th class="text-center thCansoner">C</th>
          <th class="text-center thTitol">Titol</th>
          <th class="text-center thNumero">idioma</th>
          <th class="text-center thNumero">acords</th>
          <th class="text-center thNumero">audio</th>
          <th class="text-center thNumero">#</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(info,index) in cansonsTrobades"
          :key="`llC-${index}`"
          @click="mostrarCansoDeLaTaula(info.clau, info.numero, info.idioma)"
        >

          <td > {{ info.clau }}</td>
          <td class="q-px-xs tdTitol">{{ info.titol }}</td>
          <td class="text-center">{{ info.idioma}}</td>
          <td class="text-center">
            <q-icon name="music_note" v-if="info.acords" />
          </td>
          <td class="text-center">
            <q-icon name="volume_up" v-if="info.audio" />
          </td>
          <td class="text-center">{{info.numero}}</td>

        </tr>
      </tbody>
    </q-markup-table>






  </div>
</template>

<script>
import { defineComponent, ref, onMounted, onUnmounted } from 'vue';
import { useCansonerStore } from '../stores/example-store'
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar'

export default defineComponent({


  setup(){
    const store = useCansonerStore()
    const router = useRouter();
    const $q = useQuasar()

    const cansoners = ref( store.cansoners )
    const cansonersSeleccionats = ref( ['blau', 'vermell'] )
    const textABuscar = ref("")

    let cansonersFiltrats = []
    const cansonsTrobades = ref([])



    onMounted ( () => {
      if ($q.sessionStorage.getItem("key_cansonersSeleccionats") != undefined)
        cansonersSeleccionats.value = $q.sessionStorage.getItem( "key_cansonersSeleccionats" );

      if ($q.sessionStorage.getItem("key_textABuscar") != undefined)
        textABuscar.value = $q.sessionStorage.getItem("key_textABuscar");

      if ($q.sessionStorage.getItem("key_cansonsTrobades"))
        cansonsTrobades.value = $q.sessionStorage.getItem( "key_cansonsTrobades"  );
    })

    onUnmounted( () => {
      guardarVariablesSessio()
    })

    const buscar = () => {

      // Filtrem els cansoner seleccionats
      cansonersFiltrats = cansoners.value.filter( obj => cansonersSeleccionats.value.includes( obj.clau ) )

      // console.log( cansonersFiltrats )
      // console.log( arrDadesPeraConsulta() )


      // ferm la busqueda segons el text a buscar
      // let cansonsTrobades = []
      cansonsTrobades.value = arrDadesPeraConsulta().filter( objDPC => {
        return objDPC.lletra.some ( liniaTxt => {
          // console.log( objDPC.numero + " - " + liniaTxt )
          return senseAccents(liniaTxt.toLowerCase()).includes( senseAccents(textABuscar.value.toLowerCase()) )
        })
      }).map ( obj => ({ clau: obj.clau, numero: obj.numero, idioma: obj.idioma, titol: obj.titol, acords: obj.acords, audio: obj.audio }))

      console.log( "cansonsTrobades",  cansonsTrobades.value )

    }




    // Preparem les dades sobre la que farem la busqueda
    // Construccio array de { clau, numero cançó, idioma cançó, titol canço, lletra cançó, acords(true/false), audio(true/false) }
    const arrDadesPeraConsulta = () => {

      let arrDPC = []
      cansonersFiltrats.forEach( objCansoner => {
        var objR = {}
        objR.clau = objCansoner.clau

        // array cansons
        objCansoner.arrCansons.forEach ( objCanso => {
          objR.numero = objCanso.numero

          // array idiomes que tingui la cançó
          const arrIdiomes = Object.keys(objCanso.idioma)
          arrIdiomes.forEach ( strIdioma => {
            objR.idioma = strIdioma
            objR.titol = objCanso.idioma[strIdioma].titol

            // convertim les estrofes en un unic array amb nomès el text de la lletra
            objR.lletra = objCanso.idioma[strIdioma].lletra.reduce( (arr, estrofa ) => {
              return arr.concat (estrofa.paragraf.map( ( linia ) => linia.text) )
            }, [])

            // afegim el titol a la lletra
            objR.lletra.unshift( objR.titol)


            objR.acords = objCanso.idioma[strIdioma].lletra.some( estrofa => {
              return estrofa.paragraf.some( ( linia ) => linia.hasOwnProperty('acordsASobre') ) 
            })
            objR.audio = objCanso.idioma[strIdioma].hasOwnProperty('audio') && objCanso.idioma[strIdioma].audio !== null


            // console.log( "objR", JSON.parse(JSON.stringify(objR)) )

            // quan faig push de objR, tots valors son de l'ultim objecte (¿?)
            arrDPC.push( JSON.parse(JSON.stringify(objR)) )
            // arrDPC.push( objR )
            // arrDPC.push( {
            //   clau: objR.clau,
            //   numero: objR.numero,
            //   idioma: objR.idioma,
            //   titol: objR.titol,
            //   lletra: objR.lletra
            // } )
          })


        })

      })

      // console.log( 'arrDPC', arrDPC)
      return arrDPC
    }


    const senseAccents=  (s) => {
      var r = s.toLowerCase();
      //r = r.replace(new RegExp(/\s/g),"");
      r = r.replace(new RegExp(/[àáâãäå]/g), "a");
      r = r.replace(new RegExp(/[èéêë]/g), "e");
      r = r.replace(new RegExp(/[ìíîï]/g), "i");
      //r = r.replace(new RegExp(/ñ/g),"n");
      r = r.replace(new RegExp(/[òóôõö]/g), "o");
      r = r.replace(new RegExp(/[ùúûü]/g), "u");

      return r;
    }


    const mostrarCansoDeLaTaula = ( clauCansoner, numero, idioma) => {
      router.push({ name: "canso", query: { cansoner: clauCansoner,  numero, idioma } })
    }



    const guardarVariablesSessio = () => {
      $q.sessionStorage.set("key_cansonersSeleccionats", cansonersSeleccionats.value );
      $q.sessionStorage.set("key_textABuscar", textABuscar.value);
      $q.sessionStorage.set("key_cansonsTrobades", cansonsTrobades.value );
    }


    return { cansoners, cansonersSeleccionats, buscar, textABuscar, cansonsTrobades, mostrarCansoDeLaTaula }
  }
})

</script>







<style>
.thCansoner {
  width: 10%;
}
.thTitol {
  width: 80%;
}
.thNumero {
  width: 10%;
}

.tdTitol {
  white-space: normal !important;
}

.DIVcasella {
  width: 50px;
  height: 50px;
}

.DIVred {
  background-color: red;
}
.DIVblue {
  background-color: blue;
}
.DIVgrey {
  background-color: grey;
}

.borde {
  border: 1px solid black;
}
</style>
