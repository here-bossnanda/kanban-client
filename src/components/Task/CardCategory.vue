<template>
    <div :class="recolorBorder" style="max-width: 21.5rem;">
        <div :class="recolor">{{nameTask}}</div>
        <div class="card-body">
            <div v-if="taskCategory.length === 0" class="card" style="width: 16rem;">
                <h6>no action exist</h6>
            </div>
            <card-task 
                v-for="task in taskCategory" 
                :key="task.id" 
                :task="task"
                :destroyTask="destroyTask"
                :editTask="editTask"
                :updateCategory="updateCategory">
            </card-task>
        </div>
        <div :class="recolorFooter">
            <button @click="openModal();assignIdCategory(categoryId)" class="btn btn-sm btn-secondary btn-block"> <i class="fa fa-plus"></i> Add</button>
        </div>
    </div>
</template>

<script>
import CardTask from './CardTask';

export default {
    name: "CardCategory",
    data(){
        return {
            style: [
            'card-header bg-primary text-white',
            'card-header bg-warning text-white',
            'card-header bg-danger text-white',
            'card-header bg-success text-white'
            ],
            styleBorder: [
            'card bg-light mb-3 border-primary',
            'card bg-light mb-3 border-warning',
            'card bg-light mb-3 border-danger',
            'card bg-light mb-3 border-success'
            ],
            styleFooter: [
            'card-footer bg-transparent border-primary',
            'card-footer bg-transparent border-warning',
            'card-footer bg-transparent border-danger',
            'card-footer bg-transparent border-success'
            ]
        }
    },
    props: ['taskCategory','nameTask','categoryId','dones','showModalTask','detailIdTaskAdd','destroyTask','editTask','updateCategory'],
    components: {
        CardTask,
    },
    methods: {
        openModal(){
            this.$emit('update:showModalTask', true)
        },
        assignIdCategory(id){
            this.$emit('update:detailIdTaskAdd', id)
        }
    },
    computed: {
        recolor() {
            let color;
            switch(this.categoryId) {
            case 1:
                color = this.style[0]
            break;
            case 2:
                color = this.style[1]
            break;
            case 3:
                color = this.style[2]
            break;
            default:
                color = this.style[3]
            break;
            }
            return color
        },
        recolorBorder() {
            let color;
            switch(this.categoryId) {
            case 1:
                color = this.styleBorder[0]
            break;
            case 2:
                color = this.styleBorder[1]
            break;
            case 3:
                color = this.styleBorder[2]
            break;
            default:
                color = this.styleBorder[3]
            break;
            }
            return color
        },
        recolorFooter() {
            let color;
            switch(this.categoryId) {
            case 1:
                color = this.styleFooter[0]
            break;
            case 2:
                color = this.styleFooter[1]
            break;
            case 3:
                color = this.styleFooter[2]
            break;
            default:
                color = this.styleFooter[3]
            break;
            }
            return color
        }
    }
}
</script>

<style>

</style>