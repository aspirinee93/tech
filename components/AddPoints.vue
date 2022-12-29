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
    <div v-if="$store.state.points.showWin">
      <form class="form" @submit.prevent="removePoint">
        <input v-model="remX" type="text" :placeholder="fetchPoint.pointX" />
        <input v-model="remY" type="text" :placeholder="fetchPoint.pointY" />
        <input v-model="remR" type="text" :placeholder="fetchPoint.radius" />
        <button type="submit">Изменить</button>
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
      remX: '',
      remY: '',
      remR: '',
    };
  },
  methods: {
    validPoint() {
      if(!this.$store.state.points.showWin) {
        if(this.addR){
          if(this.$store.state.points.pointList.length === 0){
            this.addR = 0
            const pointInCheck = [this.addX, this.addY];
            this.$store.commit('checkValid/validInput', pointInCheck);
            return this.$store.state.checkValid.flag;
            } else {
              const pointInCheck = [this.addX, this.addY, this.addR];
              this.$store.commit('checkValid/validInput', pointInCheck);
              return this.$store.state.checkValid.flag;
            }
          } else {
            const pointInCheck = [this.addX, this.addY];
            this.$store.commit('checkValid/validInput', pointInCheck);
            return this.$store.state.checkValid.flag;
          }
      } else {
        if(this.$store.state.points.point.index === 0){
          this.remR = 0
          const pointInCheck = [this.remX, this.remY, this.remR];
          this.$store.commit('checkValid/validInput', pointInCheck);
          return this.$store.state.checkValid.flag;
        } else {
          const pointInCheck = [this.remX, this.remY, this.remR];
          this.$store.commit('checkValid/validInput', pointInCheck);
          return this.$store.state.checkValid.flag;
        }
      }
    },
    addPoints() {
      if (this.validPoint()) {
        if(this.addR){
          this.$store.commit('points/addPoints', {
            pointX: Number(this.addX),
            pointY: Number(this.addY),
            radius: Number(this.addR),
        });
        } else {
          this.$store.commit('points/addPoints', {
            pointX: Number(this.addX),
            pointY: Number(this.addY),
            radius: 0,
        });
        }
        this.addX = '';
        this.addY = '';
        this.addR = '';
      }
    },
    removePoint() {
      if (this.validPoint()) {
        this.$store.commit('points/removePoint', {
          pointX: Number(this.remX),
          pointY: Number(this.remY),
          radius: Number(this.remR)
        });
        this.remX = '';
        this.remY = '';
        this.remR = '';
      }
    },
    cleanAllPoint(){
      this.$store.commit('points/cleanPoint')
    },
    closeWin() {
      this.$store.commit('points/closeWin')
    }
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
  width: 100%
}
</style>
