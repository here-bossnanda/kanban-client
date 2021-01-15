<template>
        <div >
            <transition name="modal">
                <div class="modal-mask">
                    <div class="modal-wrapper">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Add Organisation</h5>
                                    <button type="button" @click="closeModal" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <form>
                                        <input v-model="createOrganisation.id" type="text" style="display: none;">
                                        <div class="input-field">
                                            <i class="fas fa-fa-pencil-alt"></i>
                                            <input v-model="createOrganisation.name" type="text" placeholder="Name">
                                        </div>
                                    </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                                    <button type="button" class="btn btn-success" @click="saveOrupdateOrganisation(createOrganisation.id)"> <i class="fa fa-save"></i> Save</button>
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
    name: "OrganisationModal",
    props: ['showModalOrganisation','createOrganisation','saveOrupdateOrganisation'],
    methods: {
        closeModal(){
            this.$emit('update:showModalOrganisation', false)
        }
    }
}
</script>