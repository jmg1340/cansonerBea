<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-teal-2">
      <q-toolbar>
        <!-- <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        /> -->

        <q-toolbar-title class="text-weight-thin text-italic text-indigo-10">
          Cançoner de la Bea
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>

      <div class="row justify-center bg-grey-2">
        <q-tabs
        dense
        align="center"
        class="col-auto bg-grey-1 text-black shadow-2"
        indicator-color="light-green-11"
        narrow-indicator
        active-color="white"
        active-bg-color="blue"
        inline-label
        >
          <q-route-tab class="clTabs" to="/cercaNumero" label="numero" icon="search"/>
          <q-route-tab class="clTabs" to="/cercaText" label="text" icon="search"/>
        </q-tabs>
      </div>








    </q-header>

    <!-- <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },

]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
