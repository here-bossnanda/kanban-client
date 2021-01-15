<template>
    <div class="task-wrapper " id="task-section ">
            <div class="container">
                <div class="heading">
                    <h2>Member</h2>
                    <h2 v-text="taskDetailTitle"></h2>
                    <h6 v-text="taskDetailOwner"></h6>
                </div>

            <div class="card">
                <div class="card-header">
                    <a type="button" class="btn  btn-info float-right" @click="showModalMember = true" href="javascript:void(0)"> <i class="fa fa-plus"></i> Add </a>
                </div>
                <div class="card-body ">
                    <member-card 
                        :detailMember="detailMember"
                        :deleteMember="deleteMember"
                    ></member-card>
                </div>
            </div>

            <member-modal 
                v-if="showModalMember"
                :showModalMember.sync="showModalMember"
                :members="members"
                :userId.sync="userId"
                :saveMember="saveMember"
            ></member-modal>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import memberCard from './MemberCard'
import MemberModal from './MemberModal.vue';
export default {
    name: "MemberPage",
    data() {
        return {
            showModalMember: false,
            userId: 0
        }
    },
    props: ['baseUrl','detailMember','members','detailIdOrganisation','taskDetailTitle','taskDetailOwner','memberOrganisation'],
    components: { 
        memberCard,
        MemberModal
    },
    methods: {
        saveMember(){
            axios({
                method: 'POST',
                url: `${this.baseUrl}/organisations/${this.detailIdOrganisation}/users/${this.userId}`,
                headers: {
                    access_token: localStorage.access_token
                }
            }).then(({ data }) => {
                this.memberOrganisation(this.detailIdOrganisation);
                this.showModalMember= false;
                Swal.fire(
                'Success!',
                'Successfully add member.',
                'success'
                )
            }).catch(({ response }) => {
                Swal.fire(
                'Error!',
                `${response.data.message}`,
                'error'
                )
                this.showModalMember= false;
            })
        },
        deleteMember(id){
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
                        url: `${this.baseUrl}/organisations/${this.detailIdOrganisation}/users/${id}`,
                        headers: {
                            access_token: localStorage.access_token
                        }
                    }).then(({ data }) => {
                        this.memberOrganisation(this.detailIdOrganisation)
                        Swal.fire(
                        'Deleted!',
                        'user has been deleted.',
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
    }

}
</script>