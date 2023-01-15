<template>
  <div>
    <form class="form" @submit.prevent="addPoints">
      <input v-model="addX" type="text" placeholder="Введите X" />
      <input v-model="addY" type="text" placeholder="Введите Z" />
      <input v-model="addR" type="text" placeholder="Введите R, если необходимо" />
      <button type="submit">Добавить</button>
    </form>
    <button class="btn__clean" @click="cleanAllPoint" type="submit">
      Очистить
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addX: '',
      addY: '',
      addR: '',
      addIndex: '',
    };
  },
  methods: {
    addPoints() {
      const data = {
        y: this.addX,
        x: this.addY,
        radius: this.addR,
        addIndex: this.addIndex,
        status: 'new'
      }
      this.$store.dispatch('points/addPointAct', data)
      this.addX = ''
      this.addY = ''
      this.addR = ''
    },
    cleanAllPoint() {
      this.$store.commit('points/cleanPoint')
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
