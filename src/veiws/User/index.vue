<template>
  <div class="manage">
    <el-dialog
      :title="operateType === 'add' ? '新增用户' : '更新用户'"
      :visible.sync="isShow"
    >
      <common-form
        :formLabel="opertateFormLabel"
        :form="operateForm"
        :inline="true"
        ref="form"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShow = false">取消</el-button>
        <el-button type="primary" @click="confirm">确定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="addUser">+新增</el-button>
      <common-form
        class="ips"
        :formLabel="FormLabel"
        :form="searchForm"
        :inline="true"
        ref="form"
      >
        <el-button type="primary" @click="getList(searchForm.keyword)"
          >搜索</el-button
        >
      </common-form>
    </div>
    <common-table
      :tableData="tableData"
      :tableLabel="tableLabel"
      :config="config"
      @changePage="getList"
      @edit="editUser"
      @del="delUser"
    ></common-table>
  </div>
</template>

<script>
import CommonTable from "@/components/CommonTable";
import CommonForm from "@/components/CommonForm";
export default {
  name: "user",
  components: { CommonForm, CommonTable },
  data() {
    return {
      isShow: false,
      operateType: "add",
      opertateFormLabel: [
        {
          model: "name",
          label: "姓名",
          type: "input",
        },
        {
          model: "age",
          label: "年龄",
          type: "input",
        },
        {
          model: "sex",
          label: "性别",
          type: "select",
          opts: [
            {
              label: "男",
              value: 1,
            },
            {
              label: "女",
              value: 0,
            },
          ],
        },
        {
          model: "birth",
          label: "出生日期",
          type: "date",
        },
        {
          model: "addr",
          label: "地址",
          type: "input",
        },
      ],
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      FormLabel: [
        {
          model: "keyword",
          label: "",
          type: "input",
        },
      ],
      searchForm: {
        keyword: "",
      },
      tableData: [],
      tableLabel: [
        {
          prop: "name",
          label: "姓名",
        },
        {
          prop: "age",
          label: "年龄",
        },
        {
          prop: "sexLabel",
          label: "性别",
        },
        {
          prop: "birth",
          label: "出生日期",
          wdith: "200",
        },
        {
          prop: "addr",
          label: "地址",
          wdith: "320",
        },
      ],
      config: {
        total: 300,
        page: 1,
      },
    };
  },
  methods: {
    async confirm() {
      const data = this.operateForm;
      if (this.operateType === "edit") {
        let result = await this.$API.reqUpdateUser(data);
        console.log(result);
        if (result.code == 20000) {
          console.log(result);
          this.isShow = false;
          this.getList();
        }
      } else {
        let result = await this.$API.reqCreateUser(data);
        if (result.code == 20000) {
          console.log(result);
          this.isShow = false;
          this.getList();
        }
      }
    },
    addUser() {
      (this.isShow = true),
        (this.operateType = "add"),
        (this.operateForm = {
          name: "",
          addr: "",
          age: "",
          birth: "",
          sex: "",
        });
    },
    async getList(name) {
      this.config.loading = true;
      name ? (this.config.page = 1) : "";
      let result = await this.$API.reqUserList({
        page: this.config.page,
        name,
      });
      console.log(result);
      if (result.code == 20000) {
        this.tableData = result.list.map((item) => {
          item.sexLabel = item.sex === 0 ? "女" : "男";
          return item;
        });
        this.config.total = result.count;
        this.config.loading = false;
      }

      console.log(this.tableData);
      console.log(name);
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该数据，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        /*！！！ row.id获取不到 */
        const id = row.id;
        this.$API
          .reqDelectUser("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "success",
              message: "删除成功",
            });
            console.log(row.id);
            this.getList();
          });
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style  socped lang="less">
.manage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .ips {
    margin-top: 20px;
  }
}
</style>