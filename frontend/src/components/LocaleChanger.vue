<template>
  <div class="locale-changer">
    <select class="locale-changer-select locale" v-model="$i18n.locale">
      <option  class="locale-changer-option locale" v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ $t(lang) }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'locale-changer',
  data () {
    return { langs: ['fr', 'en'] }
  }
}
</script>

<style>
  select.locale {
    background-color: #35495e;
    border: none;
    color: #fff;
    height: 32px;
    width: 128px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }
</style>
