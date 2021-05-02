<template>
  <div>
    <h1>Лекция "{{ nameLec }}"</h1>
    <span v-if="avgRate">Средняя оценка {{(avgRate/rates.length).toPrecision(2)}}</span>
    <div v-if="isUniqueUser" class="rate">
      <h2>Оцените лекцию:</h2>
      <select v-model="curRate">
        <option v-for="index in maxRate" :key="index">{{ index }}</option>
      </select>
      <button @click="addRate" class="rate__btn">Оценить</button>
    </div>
    <div v-else>
        <h2>Вы уже проголосовали! Ваша оценка: {{currentRateUser}}</h2>
    </div>
    <div class="statistic">
      <button v-if="!isShowRate" @click="isShowRate = true">
        Показать оценки
      </button>
      <button v-if="isShowRate" @click="isShowRate = false">
        Скрыть оценки
      </button>
      <div class="statistic__list" v-if="isShowRate">
        <div class="statistic__list-item" v-for="(rate, idx) in arrRate" :key="idx">
            <div class="statistic__list-item-number">{{idx+1}}</div>
            <div class="statistic__list-item-value">{{rate}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'lecture',
  data(){
    return{
      rates:[],
      nameLec:'',
      isShowRate:false,
      maxRate:10,
      curRate:1
    }
  },
  computed:{
    //средняя оценка
    avgRate(){
        let sum = 0;
        for(let i=0; i<this.rates.length; ++i){
            sum+=Number(this.rates[i].value);
        }
        return sum
    },
    //проверка пользователя на уникальность
    isUniqueUser(){
      for(let i=0; i<this.rates.length; ++i){
        if (this.rates[i].cookie==document.cookie) return false;
      }
      return true;
    },
    //текущая оценка пользователя
    currentRateUser(){
      for(let i=0; i<this.rates.length; ++i){
        if (this.rates[i].cookie==document.cookie) return this.rates[i].value
      }
      return 0;
    },
    //массив оценок
    arrRate(){
        let arr = new Array(10+1).join('0').split('').map(parseFloat);
        for(let i=0; i<this.maxRate; i++){
            for(let j=0; j<this.rates.length; j++){
                if(Number(this.rates[j].value)==(i+1)) arr[i]++
            }
        }
        return arr
    }
  },
  mounted(){
      this.getLectionName();
      this.getLectionRate();
  },
  methods:{
    //Получаем имя у лекции
    getLectionName(){
     this.$firebase.firestore()
     .collection('lections')
     .get()
     .then((snap) =>{
         snap.forEach(doc =>{
             if(doc.id==this.$route.params.id) 
             this.nameLec=doc.data().name
         });
     });
    },
    //Получаем список оценок
    getLectionRate(){
      this.$firebase.firestore()
      .collection('lection_' + this.$route.params.id)
      .get()
      .then((snap) =>{
        snap.forEach(doc => {
            this.rates.push(doc.data());
        });
      });
    },
    //Добавляем оценку
    addRate(){
      this.$firebase.firestore()
     .collection('lection_' + this.$route.params.id)
     .add({
        value:Number(this.curRate),
        cookie:document.cookie
      });
      this.rates = [];
      this.getLectionRate();
    },
    setRate(){
      this.currentRateIdUser();
      console.log(this.Id);
      this.$firebase.firestore()
      .collection('lection_' + this.$route.params.id)
      .doc(this.Id)
      .set({
        value:Number(this.curRate),
        cookie:document.cookie
      })
    }
  }

}
</script>

<style>

.rate{
  display:flex;
  justify-content: center;
}
.rate > select{
  margin: 25px 25px;
}
.rate__btn{
  height: 30px;
  margin:20px 20px;
}
.statistic__list{
  display: flex;
  justify-content: center;
  align-items: column;
  flex-direction: column;
  padding-top: 30px;
}
.statistic__list-item{
  display: flex;
  justify-content: center;
  font-size: 18px;
  margin-bottom: 5px;
}
.statistic__list-item-number{
  width: 5%;
}
.statistic__list-item-value{
  width: 10%;
  border: 2px solid gray;
  display: flex;
  justify-content: flex-end;
}


</style>