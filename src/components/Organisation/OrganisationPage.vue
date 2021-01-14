<template>
    <div class="container task-wrapper" id="task-section">
        <div class="heading">
            <h2>Organisation</h2>
        </div>
        <div class="card">
            <div class="card-header">
                <a type="button" class="btn  btn-info float-right" @click="showModalOrganisation = true" href="javascript:void(0)"> <i class="fa fa-plus"></i> Add </a>
            </div>
            <div class="card-body ">
            
            <organisation-card :organisationsData="organisationsData"></organisation-card>
                
            </div>
        </div>
    </div>
</template>

<script>
import OrganisationCard from './OrganisationCard.vue'
export default {
    name: "OrganisationPage",
    data(){
        OrganisationCard
        return {
            showModalOrganisation: false,
        }
    },
    props: ['organisationsData'],
    components: {
        OrganisationCard
    }
}
</script>