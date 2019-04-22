<template>
	<div id="tmp">
    <el-button @click="reg">Reg</el-button>
    <el-input type="text" v-model="child"></el-input>>
    <el-button @click="push">Push</el-button>
    <br>
    <el-button @click="dialogVisible = true">Dialog Test</el-button>
    <el-dialog
      title="tip"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否确定交易</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close()">取消</el-button>
        <el-button type="primary" @click="right()">确定</el-button>
      </span>
    </el-dialog>
    <span>{{ time }}</span>
    <tmp-home :testArr="testArr"></tmp-home>
  </div>
</template>

<script>
  import api from 'api/tmp'
  import { formatDate } from 'resource/formatDate'
  import test from 'common/json/test.json'
  import TmpHome from 'components/TmpHome'
  import { mapGetters } from 'vuex'
  
  export default {
    name: "",
    data() {
      return {
        child: '',
        dialogVisible: false,
        time: '',
        students: []
      }
    },
    created() {
      this.students = test.students
    },
    mounted() {
      let vm = this
      setInterval(function () {
        vm.time = vm.showRealTime()
      }, 1000)
    },
    computed: {
      ...mapGetters([ 'testArr' ]),
      sortArr() {
        return this.testArr.sort((a, b) => {
          return a - b
        })
      }
    },
    methods: {
      reg() {
        api.RegTmp()
          .then(({ data }) => {
            console.log(data)
          }).catch((err) => {
            console.log(err)
        })
      },
      push() {
        if (this.child.trim() !== '') {
          let tmpData = {
            pushBody: this.child.trim()
          }
          api.PushTmpChild(tmpData)
            .then(({ data }) => {
              console.log(data)
            }).catch((err) => {
            console.log(err)
          })
        }
      },
      right() {
        console.log(true)
        this.dialogVisible = false
      },
      cancel() {
        console.log(false)
        this.dialogVisible = false
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      },
      showRealTime() {
        let nowTime = new Date()
        return formatDate(nowTime, "yyyy-MM-dd hh:mm:ss")
      }
    },
    components: {
      TmpHome
    }
  }
</script>

<style scoped>

</style>
