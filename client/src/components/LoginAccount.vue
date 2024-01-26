<template>
    <div>
        <h1>Login</h1>
        <div v-if="error!=''" class="alert alert-danger alert-dismissible fade show">
            <strong>{{ error }}</strong> 
        </div>       
        <div class="login">
            <input type="text" v-model="login_name" placeholder="Enter Login" class="form-control"/>
            <input type="password" v-model="pass_word" placeholder="Enter Password" class="form-control"/>
            <button v-on:click="login">Login!</button>
            <p>
                <router-link to="/">Home</router-link>
            </p>
        </div>
    </div>
</template>

<script>
//import BackEndService from '../BackEndService';
import axios from 'axios';

export default {
    name: 'LoginAccount',
    data() {
        return {
            msg: '',
            error: '',
        }
    },
    methods: {
        async login() {
            try {
                const url = 'http://localhost:3000/api/v1/database/account';

                let result = await axios.post(url, {
                    login_name: this.login_name,
                    pass_word: this.pass_word
                });
                console.warn(result);
                if (result.status == 200) {
                    const resp = result.data;
                    localStorage.setItem("user-info", resp)
                    alert("data" + resp);
                    localStorage.setItem('token', 'hdsfhqishiofhiqsdhfhdksqhfklmqjdmsfjildjsfioj7467d687dfsgnjklfhnglk46396fdgnlkjndflkg646346drg,fkldjg')

                    if (resp == 1) {
                       // alert("iam in admin");
                        localStorage.setItem('useraccount', 'admin')
                        this.$router.push({ name: 'admin' })
                    }
                    else {
                        //alert("iam in user");
                        localStorage.setItem('useraccount', 'user')
                        this.$router.push({ name: 'user' })
                        //this.$router.push({ name: 'AppDashboard' })
                    }
                }
            }
            catch (err) {
                console.log("err" + err);
                //alert("iam in error login" + err);
                this.error = err;
            }
        }
    }
}
</script>