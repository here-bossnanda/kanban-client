<template>
        <div >
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Add Member</h5>
                                    <button type="button" @click="closeModal" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <div class="input-field">
                                            <i class="fas fa-pencil-alt"></i>
                                            <select v-model="listenId" @change="changeVal(listenId)">
                                                <option v-for="member in members"
                                                :key="member.id"
                                                :value="member.id">
                                                {{member.email}}
                                                </option>
                                            </select>
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                                    <button type="button" class="btn btn-success" @click="saveMember"> <i class="fa fa-save"></i> Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
</template>

<script>
export default {
    name: "MemberModal",
    data(){
        return{
            listenId:0
        }
    },
    props: ['showModalMember','createMember','saveMember','members','userId'],
    methods: {
        closeModal(){
            this.$emit('update:showModalMember', false)
        },
        changeVal(val){
            this.$emit('update:userId', val)
        }
    }
}
</script>