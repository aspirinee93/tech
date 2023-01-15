<template>
  <div>
      <form class="form" @submit.prevent="removePoint">
        <input v-model="remX" type="text" :placeholder="$store.state.points.point.y" />
        <input v-model="remY" type="text" :placeholder="$store.state.points.point.x" />
        <input v-model="remR" type="text" :placeholder="$store.state.points.point.radius" />
        <button type="submit">Изменить</button>
      </form>
      <button class="btn__clean" @click="closeWin" type="submit">Закрыть</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      remX: '',
      remY: '',
      remR: '',
    };
  },
  methods: {
    removePoint() {
      const data = {
        y: this.remX,
        x: this.remY,
        radius: this.remR,
        status: 'old'
      }
      this.$store.dispatch('points/removePointAct', data)
      this.remX = ''
      this.remY = ''
      this.remR = ''
    },
    closeWin() {
      this.$store.commit('points/closeWin')
    },
  },
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
