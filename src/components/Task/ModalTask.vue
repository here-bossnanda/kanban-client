<template>
<div>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Add Task</h5>
                            <button type="button" @click="closeModal" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <input v-model="createTaskModel.id" type="text" style="display: none;">
                                <div class="input-field">
                                    <i class="fas fa-pencil-alt"></i>
                                    <input v-model="createTaskModel.name" type="text" placeholder="Name">
                                </div>
                                <div class="input-field">
                                    <i class="fas fa-pencil-alt"></i>
                                    <input v-model="createTaskModel.description" type="text" placeholder="Description">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                            <button type="button" class="btn btn-success" @click="saveOrupdateTask(createTaskModel.id)"> <i class="fa fa-save"></i> Save</button>
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
    name: 'ModalTask',
    props: ['createTaskModel','showModalTask','saveOrupdateTask'],
    methods: {
        closeModal(){
            this.$emit('update:showModalTask', false)
        }
    }
}
</script>