<template>
  <div class="search-message">
    <div class="filter">
      <div class="ui fluid search">
        <div class="ui icon input">
          <input
            class="prompt"
            type="text"
            placeholder="Rechercher un message"
          />
          <i class="search icon"></i>
        </div>
        <div class="results"></div>
      </div>
    </div>
    <div class="conversations">
      <div class="conversation" v-for="x in 10" :key="x">
        <div class="author">
          <template v-if="x % 2">
            <img src="https://source.unsplash.com/7YVZYZeITc8/100x100" />
            <span>Bob</span>
          </template>
          <template v-else>
            <div class="avatar">M</div>
            <span>Groupe : METINET</span>
          </template>
        </div>
        <div class="messages" v-for="y in 3" :key="y">
          <div class="message">
            <div class="time">14/07/2020 13:37</div>
            <div class="bubble">
              Blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah blah blah blah blah blah blah blah blah blah blah blah blah
              blah
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search"
};
</script>

<style src="./Search.css" scoped />
