<script lang="ts" setup>
import SimpleDatatable from "./components/SimpleDatatable.vue";
import ComplexDatatable from "./components/ComplexDatable.vue";
import PropsTable from "./components/PropsTable.vue";
import SlotsTable from "./components/SlotsTable.vue";
import EventsTable from "./components/EventsTable.vue";
</script>

<template>
  <div class="container box my-5">
    <h1 class="is-size-1">Oruga-DataTable Demo Examples</h1>
    <div class="block">
      Data can be found here:
      <a href="https://punkapi.com/documentation/v2"> punkapi.com </a>
    </div>
  </div>

  <SimpleDatatable  class="my-4"/>

  <ComplexDatatable  class="my-4"/>

  <hr />
  <PropsTable  class="my-4" />

  <SlotsTable  class="my-4"/>

  <EventsTable  class="my-4"/>

</template>
