<template>
  <div>
    <form class="form" @submit.prevent="updatePointToRadius">
      <input v-model="radius" type="text" placeholder="Введите радиус" />
      <button type="submit">Обновить</button>
    </form>
    <button class="btn__clean" @click="closeWin" type="submit">Закрыть</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radius: '',
    };
  },
  methods: {
    updatePointToRadius() {
      this.$store.dispatch('points/updatePointToRadiusAct', this.radius)
      this.radius = ''
    },
    closeWin() {
      this.$store.commit('points/closeWin')
    },
  }
};
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.btn__clean {
  width: 100%;
  margin-top: 5px;
}
</style>
