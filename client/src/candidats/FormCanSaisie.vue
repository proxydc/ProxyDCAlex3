<template>
  <div>
    <div v-for="(dc, index) in this.form" :key="index">
      <div class="container">
        <p class="h2 dc-page-title">Dossier de compétences</p>
      </div>
      <div v-if="errormsg" class="alert alert-danger alert-dismissible fade show">
        <strong>Error!</strong> <br/>{{ errormsg }}
      </div>
      <h5>{{ errormsg }}</h5>
      <div class="container dc-form">
        <form action="" @submit.prevent="onSubmit">
          <dcIdentity
            :familyname="dc.familyname"
            :firstname="dc.firstname"
            :email="dc.email"
          />
          <div class="row dc-section">
            <div class="col">
              <AbilityFonc
                title="Compétences fonctionnelles"
                uid="fonct"
                :functionalAbilities="dc.document.functionalAbilities"
              />
            </div>
            <div class="col">
              <AbilityTech
                title="Compétences techniques"
                uid="techn"
                :functionalAbilities="dc.document.technicalAbilities"
              />
            </div>
          </div>
          <div class="row dc-section">
            <div class="col">
              <Certification
                :certifications="dc.document.certifications"
              />
            </div>
            <div class="col">
              <Language :languages="dc.document.languages" />
            </div>
          </div>

          <Experience :experiences="dc.document.experiences" :projects="dc.document.projects" :xpAddedCounter=0 />

          <div class="container dc-section">
            <div class="row align-items-center dc-syn-item">
              <div class="col col-2">
                <label class="col-form-label" for="syn_env"
                  >Environnement</label
                >
              </div>
              <div class="col col-8">
                <input
                  class="form-control"
                  id="syn_env"
                  v-model="dc.document.skills.environments"
                />
              </div>
            </div>
            <div class="row align-items-center dc-syn-item">
              <div class="col-2">
                <label class="col-form-label" for="syn_lang">Languages</label>
              </div>
              <div class="col-8">
                <input
                  class="form-control"
                  id="syn_lang"
                  v-model="dc.document.skills.languages"
                />
              </div>
            </div>
            <div class="row align-items-center dc-syn-item">
              <div class="col-2">
                <label class="col-form-label" for="syn_bdd">SGBD</label>
              </div>
              <div class="col-8">
                <input
                  class="form-control"
                  id="syn_bdd"
                  v-model="dc.document.skills.databases"
                />
              </div>
            </div>
            <div class="row align-items-center dc-syn-item">
              <div class="col-2">
                <label class="col-form-label" for="syn_out">Outils</label>
              </div>
              <div class="col-8">
                <input
                  class="form-control"
                  id="syn_out"
                  v-model="dc.document.skills.tools"
                />
              </div>
            </div>
            <div class="row align-items-center dc-syn-item">
              <div class="col-2">
                <label class="col-form-label" for="syn_sys">Systèmes</label>
              </div>
              <div class="col-8">
                <input
                  class="form-control"
                  id="syn_sys"
                  v-model="dc.document.skills.systems"
                />
              </div>
            </div>
          </div>

          <div class="row dc-section">
            <div class="col">
              <h5>En bref</h5>
              <textarea
                class="form-control dc-ta-bref"
                placeholder="..."
                v-model="dc.document.bref"
              ></textarea>
            </div>
          </div>

          <div class="row dc-section">
            <div class="col text-center">
              <div class="btn-group" role="group">
                <button type="button" class="btn btn-warning" @click="save(dc)">
                  Enregistrer
                </button>
                <button
                  type="button"
                  class="btn btn-success"
                  @click="saveAndClose"
                >
                  Marquer comme finalisé
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import dcIdentity from "./ChildComponents/DcIdentity.vue";
import AbilityFonc from "./ChildComponents/DcAbilityFonc.vue";
import AbilityTech from "./ChildComponents/DcAbilityTech.vue";
import Certification from "./ChildComponents/DcCertification.vue";
import Language from "./ChildComponents/DcLanguage.vue";
import Experience from "./ChildComponents/DcExperience.vue";
//import axios from "axios";
import FormData from "./FormData";
import http from "../http-common";

export default {
  components: {
    dcIdentity,
    AbilityFonc,
    AbilityTech,
    Certification,
    Language,
    Experience,
  },
  name: "formCandidatSaisie",
  data() {
    return {
      documentId: "",
      form: [],
      document: {},
      xpAddedCounter: 0,
      errormsg: "",
    };
  },
  setup() {
    const form = ref({
      familyname: "",
      firstname: "",
      email: "",
      functionalAbilities: [],
      title: "",
      uid: "",
    });
  },
  computed: {
    getDocument() {
      //alert("iam in etdocument");
      console.log("document: " + this.form);
      this.document = JSON.stringify(this.form?.document);
      //alert("document:" + this.document?.bref);
    },
  },
  /* mounted() {
    try {
      console.log("Iam here");
      this.getDC(this.$route.params.id);
      console.log("data: " + this.form);
    } catch (err) {
      this.errormsg = err.message;
    }
  },*/
  created() {
    try {
      this.documentId =this.$route.params.id;
      //alert("ID: "+this.documentId);
      console.log("Iam here");
      this.getDC(this.$route.params.id);
      console.log("data: " + this.form);
    } catch (err) {
      this.errormsg = err.message;
    }
  },
  methods: {
    getDC(id) {
      try {
        const url = `dc/${id}`;
       // alert("urldc: " + url);
        http.get(url).then((res) => {
          console.log(res.data);
          this.form = res.data;
        });
      } catch (err) {
        this.errormsg = err;
      }
      /*try {
        this.form = FormData.getDC(id);
      } catch (err) {
        this.errormsg = err;
      }*/
    },
    save(dc) {
      try {
        alert("idwork: "+ this.documentId)
        FormData.save(this.$route.params.id, dc.document, document);
      } catch (err) {
        this.errormsg = err;
      }
    },
    /* async getDC(id) {
      const url = `http://localhost:3000/api/v1/database/dc/${id}`;
      alert("urldc: " + url);
      let result = await axios.get(url);
             console.warn(result);
             if (result.status == 200) {
                const res =  await JSON.stringify(result.data[0]);
                this.familyname = await res.familyname;
                 alert("result :"+res);
                 alert("result :"+this.familyname);
         }
        console.log(res.data);
    },*/
    /* addRow() {
      var container = document.getElementById("fonct");
      var newInput = document.createElement("input");
      newInput.classList = "form-control dc-vlist dc-tmp";
      container.appendChild(newInput);
    },*/
  },
};
</script>
<style>
#logo {
  margin: 5px 60px 5px 10px;
  max-height: 48px;
}
.dc-page-title {
  padding-top: 17px;
  margin-bottom: 3rem;
}
.dc-vlist {
  margin: 0.5rem 0rem;
}
.dc-section {
  margin-bottom: 3rem;
}
form h5 {
  font-variant: small-caps;
  font-weight: bold;
  color: #008cba;
}
.dc-ta-bref {
  height: 6rem;
}
.dc-syn-item {
  margin-bottom: 1rem;
}
.dc-syn-item label {
  font-weight: bold;
  color: #008cba;
}
</style>
