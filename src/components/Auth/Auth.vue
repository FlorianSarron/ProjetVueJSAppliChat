<script src="../../store/index.js"></script>
<template>
  <div class="auth">
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h2 class="ui primary image header">
          <div class="content">
            #Teach Vue chat client
          </div>
        </h2>
        <form class="ui large form">
          <div v-if="authenticating" class="ui attached segment">
            <div>Authentification...</div>
          </div>
          <div v-else>
            <div class="ui attached segment">
              <div class="field">
                <div class="ui left icon input">
                  <i class="user icon"></i>
                  <input
                    type="text"
                    name="pseudo"
                    v-model="username"
                    placeholder="Nom d'utilisateur"
                    @keyup.enter="login"
                  />
                </div>
              </div>
              <div class="field">
                <div class="ui left icon input">
                  <i class="lock icon"></i>
                  <input
                    v-model="password"
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    @keyup.enter="login"
                  />
                </div>
              </div>
              <div class="ui fluid large primary submit button" @click="login">
                Connexion
              </div>
            </div>
            <div class="ui bottom attached segment">
              La première connexion créer un compte.
            </div>

            <div class="ui error message"></div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Auth",
  data() {
    return {
      username: localStorage.getItem("username") || "",
      password: ""
    };
  },
  computed: {
    ...mapGetters(["authenticating"])
  },
  methods: {
    ...mapActions(["authenticate"]),
    login() {
      this.authenticate({
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

<style src="./Auth.css" scoped />
