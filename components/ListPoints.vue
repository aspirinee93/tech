<template>
  <div class="wrap__point">
    <div v-if="listPoints.length > 0">

      <button class="btn__point" @click="showWinAddPointByIndex">Вставить точку</button>
      <div class='wrap__point_items' v-for="(point, index) in listPoints" :key="index">

        <div class="point" v-if="point.radius">
          <div  class="point"> 
            {{ index + 1 }} - X: {{ point.pointX }}; Z: {{ point.pointY }}; R: {{ point.radius }}
          </div>
        </div>
        <div class="point" v-else>
          <div  class="point"> 
            {{ index + 1 }} - X: {{ point.pointX }}; Z: {{ point.pointY }};
          </div>
        </div>
        
        <button @click='showRemoveWindow(index)' class='point__btn__remove'>Изменить</button>

        <span v-if="index !== 0 && index !== listPoints.length-1 && point.radius === 0">
          <button @click='openUpdateToRadiusWindow(index)' class='point__btn__remove'>Update to R</button>
        </span>
        
        <button @click='delPoint(index)' class='point__btn__delete'>Удалить</button>
      </div>
    </div>
    <div v-else>Добавте точки</div>
  </div>
</template>

<script>
export default {
  methods: {
    delPoint(i){
      this.$store.commit('points/deletePoint', i)
    },
    showRemoveWindow(i){
      this.$store.commit('points/showRemoveWindow', i)
    },
    showWinAddPointByIndex(){
      this.$store.commit('points/openWinAddPointByIndex')
    },
    openUpdateToRadiusWindow(i){
      this.$store.commit('points/openUpdateToRadiusWindow', i)
    },
  },
  computed: {
    listPoints() {
      return this.$store.state.points.pointList;
    }
  }
};
</script>

<style>
.wrap__point {
  padding: 5px;
  display: flex;
  flex-direction: column;
}

.wrap__point_items {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 5px;
  margin-bottom: 5px;
}

.point {
  flex: 2;
}

.point__btn__remove {
  flex: 1;
}

.point__btn__delete {
  flex: 1;
}
.btn__point {
  width: 100%;
  margin-bottom: 5px;
}
</style>
