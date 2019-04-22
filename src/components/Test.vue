<template>
  <div id="NEO" class="neo">
    <ul class="neo-lists page-container">
      <li class="neo-item" v-for="item in sortedPapers" :ref="item.id" v-show="show">
        <p class="neo-time">{{ item.time }} <span class="tag-bug" v-show="item.bug">BUG</span></p>
        <div class="paper card">
          <div class="card-img" @click="link(item.router)">
            <img src="https://raw.githubusercontent.com/JiangWeixian/HTMLlearning/master/README/projects/onepaper/onepaper-city-info.png" :data-src="item.src" :alt="item.id" :ref="item.id">
            <div class="card-intro" :style="item.style">
              <p class="card-title">{{ item.title }}</p >
              <p class="card-time">{{ item.time }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped>
  .neo-item {
    display: block;
    width: 40%;
    margin: 0 auto;
  }
  .neo-time {
    text-align: left;
    font-family: 'Roboto Mono', monospace;
    font-weight: bolder;
    font-size: 32px;
    line-height: 16px;
    position: relative;
    color: #ccc;
    margin-top: 48px;
  }
  .neo-time::before {
    content: ' ';
    width: 20px;
    height: 20px;
    border-radius: 20px;
    display: block;
    background: #ccc;
    position: absolute;
    left: -40px;
    top: 0px;
  }
  .neo-time .tag-bug {
    color: white;
    background-color: red;
    font-size: 24px;
    line-height: 24px;
    font-weight: normal;
    padding: 4px 6px;
  }
  .neo-item .card-title {
    font-size: 28px;
  }
  
  @media screen and (max-width: 1440px) {
    .neo-item {
      width: 60%;
    }
  }
  
  @media screen and (max-width: 1024px) {
    .neo-item {
      width: 80%;
    }
  }
  
  @media screen and (max-width: 750px) {
    .neo-time {
      display: none;
    }
    .neo-item {
      width: 95%;
    }
  }
</style>
