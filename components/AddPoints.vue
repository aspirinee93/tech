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
    <br />
    <div v-if="$store.state.points.showWinUpdatePoint">
      <form class="form" @submit.prevent="removePoint">
        <input v-model="remX" type="text" :placeholder="fetchPoint.pointX" />
        <input v-model="remY" type="text" :placeholder="fetchPoint.pointY" />
        <input v-model="remR" type="text" :placeholder="fetchPoint.radius" />
        <button type="submit">Изменить</button>
      </form>
      <button class="btn__clean" @click="closeWin" type="submit">Закрыть</button>
    </div>
    <br />
    <div v-if="$store.state.points.showWinAddPointByIndex">
      <form class="form" @submit.prevent="addPointsByIndex">
        <input v-model="addX" type="text" placeholder="Введите X" />
        <input v-model="addY" type="text" placeholder="Введите Z" />
        <input v-model="addR" type="text" placeholder="Введите R, если необходимо" />
        <input v-model="addIndex" type="text" placeholder="Введите новый номер точки" />
        <button type="submit">Добавить</button>
      </form>
      <button class="btn__clean" @click="closeWin" type="submit">Закрыть</button>
    </div>
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
      remX: '',
      remY: '',
      remR: '',
    };
  },
  methods: {
    addPoints() {
      const data = {
        pointX: this.addX,
        pointY: this.addY,
        radius: this.addR,
        addIndex: this.addIndex,
        status: 'new'
      }
      this.$store.dispatch('points/addPointAct', data)
      this.addX = ''
      this.addY = ''
      this.addR = ''
    },
    addPointsByIndex() {
      const data = {
        pointX: this.addX,
        pointY: this.addY,
        radius: this.addR,
        addIndex: this.addIndex,
        status: 'new'
      }
      this.$store.commit('points/addPointsByIndex', data)
    },
    removePoint() {
      const data = {
        pointX: this.remX,
        pointY: this.remY,
        radius: this.remR,
        status: 'old'
      }
      this.$store.dispatch('points/removePointAct', data)
      this.remX = ''
      this.remY = ''
      this.remR = ''
    },
    cleanAllPoint() {
      this.$store.commit('points/cleanPoint')
    },
    closeWin() {
      this.$store.commit('points/closeWin')
    },
  },
  computed: {
    fetchPoint() {
      return this.$store.state.points.point;
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
