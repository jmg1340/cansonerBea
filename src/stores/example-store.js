import { defineStore } from 'pinia';
import vermell from "../cansoners/Vermell.js"
import blau from "../cansoners/Blau.js"

export const useCansonerStore = defineStore('storeCansoner', {
  state: () => ({
    // counter: 0,
    cansoners: [
      {nom: "Cançoner Vermell", clau: "vermell", arrCansons: vermell },
      {nom: "Cançoner Blau",    clau: "blau",    arrCansons: blau },
    ],
    opcioAcords: false

  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    setOpcioAcords: () => {this.opcioAcords = ! this.opcioAcords}
    // increment() {
    //   this.counter++;
    // },
  },
});
