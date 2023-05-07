<template>
  <div class="row justify-center q-mt-lg">
    <div class="col-md-8 col-sm-10 col-xs-12">
      <div class="row justify-center">
        <q-card class="col-9 ">
          <div class="q-gutter-xs q-pb-xs">
            <div class="row justify-around">
              <q-radio
                v-for="(objCansoner, index) in cansoners"
                :key="index"
                class="col-auto"
                v-model="seleccioCansoner"
                :label="objCansoner.nom"
                :val="objCansoner.clau"
                color="black"

              />
              <!--
                  <q-radio v-model="seleccioCansoner" val="nadales" label="Nadales" color="black" @input="mostrarNumerosLlibre" />
              -->
            </div>
          </div>
        </q-card>
      </div>



      <div v-if="seleccioCansoner != ''" class="column q-gutter-sm bordered">

        <!-- resultat -->
        <div class="row justify-center">
          <transition name="shakeX" class="animated">
            <div class="col-auto bg-grey-4 text-h3 text-center rounded-borders shadow-6 q-mt-sm" >
              &nbsp;{{ inputNumero }}&nbsp;
            </div>
          </transition>
        </div>


        <!-- TECLAT NUMERIC -->
        <div class="bordered q-gutter-xs">
          <!-- Numeros -->
          <div class="row justify-center q-gutter-xs">
            <div
              class="col-auto text-center"
              v-for="(numeroFila1, index) in teclat.fila1"
              :key="'fila2'+ index"
            >
              <q-btn
                class="text-h6"
                color="black"
                glossy
                :label="numeroFila1"
                @click="teclejar(numeroFila1)"
              />
            </div>
          </div>
          <div class="row justify-center q-gutter-xs">
            <div
              class="col-auto text-center"
              v-for="(numeroFila2, index2) in teclat.fila2"
              :key="'fila2'+ index2"
            >
              <q-btn
                class="text-h6"
                color="black"
                glossy
                :label="numeroFila2"
                @click="teclejar(numeroFila2)"
              />
            </div>
          </div>
          <div class="col row justify-center q-gutter-xs">
            <div
              class="col-auto text-center"
              v-for="(numeroFila3, index3) in teclat.fila3"
              :key="'fila3'+ index3"
            >
              <q-btn
                class="text-h6"
                color="black"
                glossy
                :label="numeroFila3"
                @click="teclejar(numeroFila3)"
              />
            </div>
          </div>
          <div class="row justify-center items-center q-gutter-xs">
            <div class="col-auto text-center">
              <q-btn
                class="text-h6"
                color="black"
                glossy
                :label="0"
                @click="teclejar(0)"
              />
            </div>
            <div class="col-auto text-center">
              <q-btn
                class="text-h7"
                color="black"
                glossy
                label="Borrar"
                @click="inputNumero=''"
              />
            </div>
          </div>
        </div>

        <!-- <q-separator /> -->

        <div class="row justify-center q-gutter-sm">
          <div class="col-auto q-mt-xs">
            <q-btn
              class="text-h6"
              color="primary"
              :disabled="inputNumero==''"
              glossy
              label="Mostrar"
              @click="mostrarCansoNumero"
            />
          </div>
        </div>
      </div>
      <!-- final TECLAT NUMERIC -->
    </div>
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


    const seleccioCansoner = ref("")
    const inputNumero = ref("")
    const teclat = ref({
      fila1: [7, 8, 9],
      fila2: [4, 5, 6],
      fila3: [1, 2, 3]
    })


    onMounted ( () => {
      if ($q.sessionStorage.getItem("key_seleccioCansoner"))
      seleccioCansoner.value = $q.sessionStorage.getItem( "key_seleccioCansoner" );

      // eventListener per grabar pulsacions de tecles per a nous codis de cançons
      document.addEventListener("keydown", funcEventKeydown)

    })

    onUnmounted( () => {
      guardarVariablesSessio()
      // eliminem eventListener
      document.removeEventListener("keydown", funcEventKeydown)

    })

    const guardarVariablesSessio = () => {
      $q.sessionStorage.set("key_seleccioCansoner", seleccioCansoner.value);
    }



    const teclejar =(numero) => {
      let x = inputNumero.value;
      if (x.length < 3) inputNumero.value = x.concat(numero);
    }

    const funcEventKeydown = (event) => {
      // if (event.) return

      switch( event.key ){
        case "VK_RETURN":   //windows
        case "kVK_Return":  // MAC
        case "Enter":
          console.log(`inputNumero: ${inputNumero.value}`);
          this.mostrarCansoNumero();
          break;

        case "VK_DELETE":   //windows
        case "kVK_ForwardDelete":  // MAC
        case "Delete":
          inputNumero.value = "";
          break;

        case "V":
        case "v":
          this.seleccioCansoner = "vermell";
          //inputNumero.value = "";
          break;

        case "B":
        case "b":
          this.seleccioCansoner = "blau";
          //inputNumero.value = "";
          break;

        // case "N":
        // case "n":
        //   this.$router.push({ name: "negre" });
        //   break;

        default:
          if (inputNumero.value.length < 3 && !isNaN(event.key)) inputNumero.value = inputNumero.value.concat(event.key);
          // inputNumero.value += event.key;
          console.log(`tecla ${event.key}`)
          break;
      }

    }




    const mostrarCansoNumero = () => {
      router.push({ name: "canso", query: { cansoner: seleccioCansoner.value,  numero: inputNumero.value } })
    }

    return { cansoners, seleccioCansoner, inputNumero, teclat, mostrarCansoNumero, teclejar, funcEventKeydown }
  }
})

</script>
