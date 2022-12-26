<template>
  <div class="wrap__point">
    <div v-if="listP.length > 0">
      <div class='wrap__point_items' v-for="(point, index) in listP" :key="index">
        <span class='point'>X: {{ point.pointX }}; Y: {{ point.pointY }}</span> 
        <button @click='showRemoveWindow(index)' class='point__btn__remove'>Изменить</button>
        <button @click='delPoint(index)' class='point__btn__delete'>Удалить</button>
      </div>
    </div>
    <div v-else>Добавте точки</div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      listP: ''
    }
  },
  mounted() {
    this.fetchPoints()
  },
  methods: {
    fetchPoints() {
      this.listP = this.$store.state.points.pointList;
    },
    delPoint(i){
      this.$store.commit('points/deletePoint', i)
    },
    showRemoveWindow(i){
      this.$store.commit('points/showRemoveWindow', i)
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
</style>
