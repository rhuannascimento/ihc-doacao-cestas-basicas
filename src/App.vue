<template>
  <v-app>
    <router-view v-slot="{ Component }">
        <component :is="Component" />
    </router-view>
  </v-app>
</template>

<script>
export default{
  mounted(){
    this.$router.push('/login')
  }
}
</script>
