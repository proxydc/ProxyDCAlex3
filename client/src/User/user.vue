<template>
  <div>
    <div class="d-flex gap-2 py-3" >
          <button type="button" class="btn btn-outline-primary" @click="openAddDC()">Nouveau candidat</button>
        </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <table class="table table-hover">
            <thead>
              <tr>
               <!--  <th scope="col">Id</th> -->
                <th scope="col">Nom</th>
                <th scope="col">Prénom</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Tags</th>
                <!-- <th scope="col">Document</th>-->
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
           <!-- <th scope="row">{{ acRow.id }}</th> -->
                <td>{{ acRow.familyname }}</td>
                <td>{{ acRow.firstname }}</td>
                <td>{{ acRow.email }}</td>
                <td>{{ acRow.dc_status }}</td>
                <td>{{ acRow.tags }}</td>
                <!-- <td>{{ acRow.document }}</td> -->
                <td>
                  <a class="btn btn-success mx-2" :href="'/editDC/' + acRow.id">
                    Edit
                  </a>
                  <button type="button" class="btn btn-danger mx-2" @click="deleteDC(acRow.id)">
                    Delete
                  </button>
              <!--    <button type="button" class="btn btn-danger mx-2" @click="goToDC(acRow.id)">
                    Voir
                  </button> -->
                  <a class="btn btn-outline-primary btn-sm" :href="'/formCandidatSaisie/' + acRow.id" target="_blank">
                    Voir le dossier
                  </a>
                  <button type="button" class="btn btn-outline-danger btn-sm">
                    Archiver
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div>
   <!--   <div class="container">
      <div class="row">
        <div class="col">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">Bref</th>
                <th scope="col">Skills</th>
                <th scope="col">S-Tools</th>
                <th scope="col">S-Environments</th>
                <th scope="col">Technicals</th>
                <th scope="col">Fuctionals</th>
                <th scope="col">Lanuages</th>
                <th scope="col">Databases</th>
              </tr>
            </thead>
            <tbody class="table-group-divider">
              <tr v-for="(acRow, index) in this.AcRows" :key="index">
                <th scope="row">{{ acRow.document.bref }}</th>
                <td>{{ acRow.document.skills }}</td>
                <td>{{ acRow.document.skills.tools }}</td>
                <td>{{ acRow.document.skills.environments }}</td>
                <td>{{ acRow.document.technicalAbilities }}</td>
                <td>{{ acRow.document.functionalAbilities }}</td>
                <td>{{ acRow.document.languages }}</td>
                <td>{{ acRow.document.skills.databases }}</td>
                <td>
                  <a class="btn btn-success mx-2" :href="'/editDC/' + acRow.id">
                    Edit
                  </a>
                  <button type="button" class="btn btn-danger mx-2" @click="deleteDC(acRow.id)">
                    Delete
                  </button>
                  <button type="button" class="btn btn-danger mx-2" @click="goToDC(acRow.id)">
                    Voir
                  </button>
                  <a class="btn btn-outline-primary btn-sm" :href="'/appForm/' + acRow.id">
                    Voir le dossier
                  </a>
                  <button type="button" class="btn btn-outline-danger btn-sm">
                    Archiver
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> -->
    </div>
  </div>
</template>
  
<script>
import Admin_Layout from "../admin/admin_Layout.vue";
import axios from "axios";
export default {
  name: "user",
  data() {
    return {
      AcRows: [],
      error: "",
    };
  },
  mounted() {
    try {
      //console.log("Iam here");
      this.getDCs();
      console.log("data: " + this.AcRows);
    }
    catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    getDCs() {
      const url = 'http://localhost:3000/api/v1/database/dc';
      //alert("urldc: " + url);
      axios.get(url).then(res => {
        console.log(res.data);
        this.AcRows = res.data;
      });
    },
    openAddDC() {
      this.$router.push({ name: 'AddDC' })
    },
    deleteDC(dcId) {
      alert("DC: " + dcId);
      if (confirm('Are you sure, you want to delete this dc. DC Id: ' + dcId)) {
        const url = `http://localhost:3000/api/v1/database/dc/${dcId}`;
        alert("url: " + url);
        axios.delete(url).then(res => {
          console.log(res.data);
          this.getDCs();
        }).catch(function (err) {
          if (err.response) {
            this.errorlst = err.response.data.errors;
          }
        });
      }
    },
    goToDC(dcId) {
      alert("DC: " + dcId);
      let self = this;
      self.$router.push(`/formCandidatSaisie/${dcId}`);
    }
  },
  components: { Admin_Layout }
};
</script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a.btn-sm {
  margin-right: 5px;
}
</style>
  