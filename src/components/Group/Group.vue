<template>
  <div class="group">
    <div class="ui fluid search">
      <div class="ui icon input">
        <input
          type="text"
          placeholder="Rechercher un utilisateur"
          class="prompt"
        /><i class="search icon"></i>
      </div>
    </div>
    <div class="spanner">
      <hr />
      <span>Participants</span>
      <hr />
    </div>
    <div class="user">
      <img src="https://source.unsplash.com/mK_sjD0FrXw/100x100" /><span
        >Alice<br /><i class="nickname"></i></span
      ><i title="Modifier le surnom" class="circular quote left link icon"></i
      ><i
        title="Enlever de la conversation"
        class="circular times icon link"
        style=""
      ></i>
    </div>
    <div class="user">
      <img src="https://source.unsplash.com/7omHUGhhmZ0/100x100" /><span
        >Bob<br /><i class="nickname"></i></span
      ><i title="Modifier le surnom" class="circular quote left link icon"></i
      ><i
        title="Enlever de la conversation"
        class="circular times icon link"
        style=""
      ></i>
    </div>
    <div class="user">
      <img src="https://source.unsplash.com/FUcupae92P4/100x100" /><span
        >Derek<br /><i class="nickname"></i></span
      ><i title="Modifier le surnom" class="circular quote left link icon"></i
      ><i
        title="Enlever de la conversation"
        class="circular times icon link"
      ></i>
    </div>
    <div class="user">
      <img src="https://source.unsplash.com/OYH7rc2a3LA/100x100" /><span
        >Gael<br /><i class="nickname"></i></span
      ><i title="Modifier le surnom" class="circular quote left link icon"></i
      ><i
        title="Enlever de la conversation"
        class="circular times icon link"
        style=""
      ></i>
    </div>
    <div class="spanner">
      <hr />
      <span>Communauté</span>
      <hr />
    </div>
    <div class="user">
      <img src="https://source.unsplash.com/8wbxjJBrl3k/100x100" /><span
        >Cha</span
      ><i title="Ajouter à la conversation" class="circular plus icon link"></i>
    </div>
    <div class="user">
      <img src="https://source.unsplash.com/4U1x6459Q-s/100x100" /><span
        >Emilio</span
      ><i title="Ajouter à la conversation" class="circular plus icon link"></i>
    </div>
    <div class="user">
      <img src="https://source.unsplash.com/3402kvtHhOo/100x100" /><span
        >Fabrice</span
      ><i title="Ajouter à la conversation" class="circular plus icon link"></i>
    </div>
    <div class="user">
      <img src="https://source.unsplash.com/tNCH0sKSZbA/100x100" /><span
        >Benji</span
      ><i title="Ajouter à la conversation" class="circular plus icon link"></i>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Group",
  data() {
    return {
      search: ""
    };
  },
  computed: {
    ...mapGetters([])
  },
  methods: {
    ...mapActions([])
  }
};
</script>

<style src="./Group.css" scoped />
