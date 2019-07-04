<template>
  <el-table
    :data="mails"
    stripe
    style="width: 100%">
    <el-table-column
      prop="from_address"
      label="送信先"
      width="180">
    </el-table-column>
    <el-table-column
      prop="to_address"
      label="受信先"
      width="180">
    </el-table-column>
    <el-table-column
      prop="subject"
      label="タイトル">
    </el-table-column>
    <el-table-column
      label="操作"
      width="100"
      >
      <template slot-scope="scope">
        <el-button plain round @click="open(scope.row._id)">本文</el-button>
      </template>
    </el-table-column>
    
  </el-table>
</template>


<script>
  export default {
    data(){
        return {
            mails: []
        }
    },
    methods: {
        async fetch(){
          const res = await this.$http.get('/recive')
          this.mails = res.data
        },
        async open(id) {
          const res = await this.$http.get('/recive/'+id)
          this.$alert(res.data.html,  {
            dangerouslyUseHTMLString: true
          });
      }
    },
    created() {
        this.fetch()
    }
  }
</script>
