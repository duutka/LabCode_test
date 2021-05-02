<template>
  <section>
    <div v-for="(lecture,idx) in lections" :key="idx">
        <h1><router-link :to="{ name: 'lecture', params: { id: lections_id[idx] }}">Лекция "{{lecture.name}}"</router-link></h1>
    </div>
  </section>
</template>
<script>
export default {
name:'select_lecture',
  data(){
    return{
      lections:[],
      lections_id:[]
    }
  },
  methods:{
    //Получаем список лекций
    getLection(){
      this.$firebase.firestore()
      .collection('lections')
      .get()
      .then((snap) =>{
        snap.forEach(doc => {
            this.lections_id.push(doc.id)
            this.lections.push(doc.data());
        });
      });
    }
  },
  mounted(){
    this.getLection();
  }
}
</script>

<style>

</style>