<template>
  <div>
    <form class="form" @submit.prevent="addPoints">
      <input v-model="addX" type="text" placeholder="Введите X" />
      <input v-model="addY" type="text" placeholder="Введите Y" />
      <button type="submit">Добавить</button>
    </form>
    <br />
    <div v-if="$store.state.points.showWin">
      <form class="form" @submit.prevent="removePoint">
        <input v-model="remX" type="text" :placeholder="fetchPoint.pointX" />
        <input v-model="remY" type="text" :placeholder="fetchPoint.pointY" />
        <button type="submit">Изменить</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      addX: '',
      addY: '',
      remX: '',
      remY: '',
    };
  },
  methods: {
    validPoint(){
      if (!this.$store.state.points.showWin){
        const pointInCheck = [this.addX, this.addY]
        this.$store.commit('checkValid/validInput', pointInCheck)
        return this.$store.state.checkValid.flag
        } else {
          const pointInCheck = [this.remX, this.remY]
          this.$store.commit('checkValid/validInput', pointInCheck)
          return this.$store.state.checkValid.flag
        }
    },
    addPoints() {
      if (this.validPoint()) {
        this.$store.commit('points/addPoints', {
          pointX: Number(this.addX),
          pointY: Number(this.addY),
        });
        this.addX = '';
        this.addY = '';
      }
    },
    removePoint() {
      if (this.validPoint()) {
        this.$store.commit('points/removePoint', {
          pointX: Number(this.remX),
          pointY: Number(this.remY),
        });
        this.remX = '';
        this.remY = '';
      }
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
</style>
