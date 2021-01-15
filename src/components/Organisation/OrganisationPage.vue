<template>
    <div class="task-wrapper" id="task-section">
        <div class="container ">
            <div class="heading">
                <h2>Organisation</h2>
            </div>
            <div class="card">
                <div class="card-header">
                    <a type="button" class="btn  btn-info float-right" @click="showModalOrganisation = true" href="javascript:void(0)"> <i class="fa fa-plus"></i> Add </a>
                </div>
                <div class="card-body ">
                
                <organisation-card 
                    :organisationsData="organisationsData"
                    :deleteOrganisation="deleteOrganisation"
                    :editOrganisation="editOrganisation"
                    :detailOrganisation="detailOrganisation"
                    :memberOrganisation="memberOrganisation"
                ></organisation-card>

                <organisation-modal 
                    v-if="showModalOrganisation"  
                    :showModalOrganisation.sync="showModalOrganisation"
                    :saveOrupdateOrganisation="saveOrupdateOrganisation"
                    :createOrganisation="createOrganisation">
                </organisation-modal>            
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import OrganisationCard from './OrganisationCard.vue'
import OrganisationModal from './OrganisationModal'

export default {
    name: "OrganisationPage",
    data(){
        return {
            createOrganisation: {
                id: '',
                name: ''
            },
            showModalOrganisation: false,
            
        }
    },
    props: ['organisationsData','fetchOrganisation','baseUrl','changePage','page','detailOrganisation','memberOrganisation'],
    components: {
        OrganisationCard,
        OrganisationModal
    },
    methods: {
        saveOrupdateOrganisation(id) {
            let method, url;
            if (!id) {
                method = 'POST'
                url = `${this.baseUrl}/organisations`
            } else {
                method = 'PUT'
                url = `${this.baseUrl}/organisations/${id}`
            }

            axios({
                method,
                url,
                data: {
                    name: this.createOrganisation.name
                },
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.changePage('organisation');
                this.fetchOrganisation();
                this.showModalOrganisation = false;
                this.createOrganisation.name = '';
                this.createOrganisation.id = '';
                if (method === 'POST') {
                    toastr.success('successfully add new organisation', 'Success Alert');
                } else {
                    toastr.success('updated organisation successfully', 'Success Alert');
                }
            }).catch(({ response }) => {
                    response.data.message.map(el => {
                        return toastr.warning(el, 'Warning Alert!');
                    })
            })
        },
        editOrganisation(id) {
            axios({
                method: 'GET',
                url: `${this.baseUrl}/organisations/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.createOrganisation.id = data.data.id
                this.createOrganisation.name = data.data.name
                this.showModalOrganisation = true;
            }).catch(({ response }) => {
                toastr.warning(response.data.message, 'Warning Alert!');
            })
        },
        deleteOrganisation(id){
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    axios({
                        method: 'DELETE',
                        url: `${this.baseUrl}/organisations/${id}`,
                        headers: {
                            access_token: localStorage.access_token
                        }
                    }).then(({ data }) => {
                        this.changePage('organisation');
                        this.fetchOrganisation();
                        Swal.fire(
                        'Deleted!',
                        `${data.message}`,
                        'success'
                        )
                    }).catch(({ response }) => {
                        Swal.fire(
                        'Error!',
                        `${response.data.message}`,
                        'error'
                        )
                    })
                }
            })
        }
        
    },
    computed: {
    }
}
</script>