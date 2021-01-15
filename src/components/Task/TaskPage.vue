<template>
    <div class="task-wrapper " id="task-section ">
            <div class="container">
                <div class="heading">
                    <h2 v-text="taskDetailTitle"></h2>
                    <h6 v-text="taskDetailOwner"></h6>
                </div>
            </div>
            
            <div class="container-task">
                <div class="card-task-flex">
                <card-category
                    v-for="category in detailOrganisationsData"
                    :key="category.id"
                    :categoryId="category.id"
                    :taskCategory="category.task"
                    :nameTask="category.name"
                    :showModalTask.sync="showModalTask"
                    :detailIdTaskAdd.sync="detailIdTaskAdd"
                    :editTask="editTask"
                    :destroyTask="destroyTask"
                    :updateCategory="updateCategory"
                    ></card-category>
                </div>
            </div>

            <modal-task 
                v-if="showModalTask"
                :saveOrupdateTask="saveOrupdateTask"
                :createTaskModel="createTaskModel"
                :showModalTask.sync="showModalTask"
            ></modal-task>

        </div>
</template>
<script>
import axios from "axios"
import CardCategory from './CardCategory.vue'
import ModalTask from './ModalTask.vue'

export default {
    name: 'TaskPage',
    data(){
        return {
            showModalTask: false,
            createTaskModel: {
                name: '',
                description: ''
            },
            detailIdTaskAdd: 0
        }
    },
    props: ['baseUrl','taskDetailTitle','taskDetailOwner','detailOrganisation','detailIdOrganisation','detailOrganisationsData'],
    components: { 
        CardCategory,
        ModalTask
    },
    methods: {
        saveOrupdateTask(id) {
            let method, url, data;
            if (!id) {
                method = 'POST';
                url = `${this.baseUrl}/tasks`;
                data = {
                    name: this.createTaskModel.name,
                    description: this.createTaskModel.description,
                    organisationId: this.detailIdOrganisation,
                    categoryId: this.detailIdTaskAdd
                }
            } else {
                method = 'PUT';
                url = `${this.baseUrl}/tasks/${id}`;
                data = {
                    name: this.createTaskModel.name,
                    description: this.createTaskModel.description
                }
            }

            axios({
                method,
                url,
                data,
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.detailOrganisation(this.detailIdOrganisation)
                this.showModalTask = false;
                this.createTaskModel.name = ''
                this.createTaskModel.id = ''
                this.createTaskModel.description = ''
                if (method === 'POST') {
                    toastr.success('successfully add new task', 'Success Alert');
                } else {
                    toastr.success('updated task successfully', 'Success Alert');
                }
            }).catch(({ response }) => {
                    response.data.message.map(el => {
                        return toastr.warning(el, 'Warning Alert!');
                    })
            })
        },
        editTask(id) {
            axios({
                method: 'GET',
                url: `${this.baseUrl}/tasks/${id}`,
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.createTaskModel.id = data.data.id
                this.createTaskModel.name = data.data.name
                this.createTaskModel.description = data.data.description
                this.showModalTask = true;
            }).catch(({ response }) => {
                toastr.warning(response.data.message, 'Warning Alert!');
            })
        },
        destroyTask(id) {
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
                        url: `${this.baseUrl}/tasks/${id}`,
                        headers: {
                            access_token: localStorage.access_token
                        }
                    }).then(({ data }) => {
                        this.detailOrganisation(this.detailIdOrganisation)
                        Swal.fire(
                        'Deleted!',
                        `${data.message}`,
                        'success'
                        )
                    }).catch(({ response }) => {
                        toastr.error(response.data.message, 'Error Alert!');
                    })
                }
            })
        },
        updateCategory(id, categoryId) {
            axios({
                method: 'PATCH',
                url: `${this.baseUrl}/tasks/${id}`,
                data: {
                    categoryId
                },
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.detailOrganisation(this.detailIdOrganisation)
            }).catch(({ response }) => {
                toastr.error(response.data.message, 'Error Alert!');
            })
        },
    }
}

</script>