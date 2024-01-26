<script setup>

import { computed, reactive, onMounted  } from 'vue'

import BoNewDc from './components/BoNew.vue'
import BoListItem from './components/BoListItem.vue'
import BackEndService from './BackEndService'
import axios from 'axios'

/* TODO get data from WS */
    //var DcRows = onMounted(() => {fetch(BackEndService.getDCs())});
    //var DcRows =  JSON.stringify(BackEndService.getDCs());
    //var DcRows =  BackEndService.getDCs();
    const url = 'http://localhost:3000/api/v1/database/dc';
    var DcRows =  axios.get(url).then(res=>{
      res.data;
 });
    //var DcRows =  getDataDCs();
/*[
  {name: 'A', firstname: 'Alexandra', id: 'xp47w5wzt8segz1zeldkvm', tags: [], status: 'En cours'},
  {name: 'B', firstname: 'Bob', id: 'o9n5r3ta0l2z2zijmiqwu', tags: ['Java'], status: 'Finalisé'},
  {name: 'C', firstname: 'Charlie', id: '0tx42yfwu9vdca07iqaup', tags: ['Cobol'], status: 'Finalisé'}
];*/
alert("data :"+ DcRows);

var newDcInfos = reactive({name: '', firstname: '', email:'', id: '', tags: [], status: 'Crée'});


function createDc(event){
  console.log("Add new Dc"+ event);
  alert("je suis la! "+ newDcInfos.name);
  BackEndService.addCandidat(newDcInfos.name, newDcInfos.firstname, newDcInfos.email);
  alert("candidat added");
  /*var uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  newDcInfos.id = uuid;*/
  // PUT to API
}
function Logout(Logout)
{
  alert("Iam here");
  localStorage.setItem('token', '');
  return  this.$router.push({name:'HelloWorld'})
}
function getDataDCs()
{
  const url = 'http://localhost:3000/api/v1/database/dc';

/*let result = await axios.get(url);
this.AcRows = await JSON.stringify(result.data) ;
alert("rrr"+this.AcRows);
   console.log(this.AcRows)*/
return axios.get(url).then(res=>{
   console.log(res.data)
   res.data;
 });
}

</script>

<template>

<nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarToggler">
            <a class="navbar-brand" href="#">ProxyDC</a>
            
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/">Home</a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="#">Candidats</a>
              </li>
              <li>
                <a class="nav-link" aria-current="page" href="#">Employés</a>
              </li>
              <li>
                <a class="nav-link" aria-current="page" href="#">Archive</a>
              </li>
            </ul>

            <div class="nav me-auto">
              <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                <button class="btn btn-outline-success" type="submit">Rechercher</button>
              </form>
            </div>

            <div class="nav justify-content-end">
                <button type="button" class="btn btn-outline-danger" click="Logout" >Se déconnecter</button>
            </div>

          </div>
        </div>
      </nav>

      <BoNewDc v-model:name="newDcInfos.name" v-model:firstname="newDcInfos.firstname" v-model:email="newDcInfos.email" @create="createDc"/>

      <div class="container">
        <div class="row">
          <div class="col">
            <table class="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Prénom</th>
                    <th scope="col">Tags</th>
                    <th scope="col">Dossier de compétences</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody class="table-group-divider">

                  <!-- 
                    On affiche le dossier de compétence qui vient d'être crée en début de page pour sa visibilité
                    Au rechargement de la page il sera mélangé au reste et trié par ordre alphabetique
                   -->
                  <BoListItem v-if="newDcInfos.id" v-model:DcRow="newDcInfos"/>

                  <BoListItem
                    v-for="(dcRow, index) in DcRows"
                    :DcRow="dcRow"
                    :index="index"
                    :key="dcRow.id"
                  />
                </tbody>
              </table>
          </div>

        </div>
      </div>

</template>

<style>
</style>
