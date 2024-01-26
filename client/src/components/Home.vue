<template>
    <h1>Hello, Welcome to Proxy DC</h1>
    <nav>
      <router-link to="/login">Login</router-link>
    </nav>   
</template>

<script>
//import BackEndService from "../BackEndService";
import axios from "axios";
export default {
  name: "Home",
  data() {
    return {
      AcRows: [],
      error: "",

    };
  },
  mounted() {
    try {
      console.log("Iam here");
      localStorage.setItem('token', '');
      localStorage.setItem('useraccount', '');
      localStorage.setItem('user-info', '');
      //this.AcRows = BackEndService.getLogins();
      this.getLogins();
      console.log("data: " + this.AcRows);
    } catch (err) {
      this.error = err.message;
    }
  },

  methods: {
    getLogins() {
      const url = 'http://localhost:3000/api/v1/database/account';

      /*let result = await axios.get(url);
     this.AcRows = await JSON.stringify(result.data) ;
     alert("rrr"+this.AcRows);
         console.log(this.AcRows)*/
      axios.get(url).then(res => {
        console.log(res.data)
        this.AcRows = res.data;
      });
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a.btn-sm {
  margin-right: 5px;
}
</style>
