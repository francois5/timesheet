<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #fff !important;
    background-color: #fff;
    height: 100vh;
}

/* Overriding vue matherial theme colors */
:root {
    --md-theme-default-primary: #34495e !important;
    --md-theme-default-accent: #42b883 !important;
    --md-theme-default-theme: light;
}
.md-field.md-theme-default.md-focused label {
    color: #34495e !important;
    color: var(--md-theme-default-fieldvariant, #34495e);
}

.md-field.md-theme-default.md-invalid label {
    color: #aa1616 !important;
    color: var(--md-theme-default-fieldvariant, #aa1616);
}
.md-field.md-theme-default.md-invalid .md-error {
    color: #aa1616 !important;
    color: var(--md-theme-default-fieldvariant, #aa1616);
}
.md-field.md-theme-default.md-invalid:after {
    background-color: #aa1616 !important;
    background-color: var(--md-theme-default-fieldvariant, #aa1616);
}
.md-primary {
    background-color: #34495e !important;
    color: #fff !important;
}
.md-accent {
    background-color: #42b883 !important;
    color: #fff !important;
}
</style>
