<template>
  <div id="app">
    <Auth v-if="!authenticated" />
    <template v-else>
      <div>
        <Sidebar />
        <Main />
      </div>
    </template>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
<script>
import Sidebar from "@/components/Sidebar/Sidebar";
import Main from "@/components/Main/Main";
import Auth from "@/components/Auth/Auth";
import { mapGetters } from "vuex";

export default {
  components: { Auth, Sidebar, Main },
  mounted() {},
  computed: {
    ...mapGetters(["authenticated"])
  }
};
</script>

<style>
.fluid.search .input {
  width: 100%;
}

.ui.input > input::placeholder {
  color: black;
}
</style>
