<template>
<div class="card-task-flex">
    <div class="card bg-light mb-3 border-primary" style="max-width: 21.5rem;">
        <div class="card-header bg-primary text-white">Backlog</div>
        <div class="card-body">
            <div v-if="backlogs.length === 0" class="card" style="width: 16rem;">
                <h6>no action exist</h6>
            </div>

            <card-backlog 
                v-for="backlog in backlogs" 
                :key="backlog.id" 
                :backlog="backlog"
                :destroyTask="destroyTask"
                :editTask="editTask"
                :updateCategory="updateCategory">
            </card-backlog>

        </div>
        <div class="card-footer bg-transparent border-success">
            <button @click="openModal();assignIdCategory(1)" class="btn btn-sm btn-secondary btn-block"> <i class="fa fa-plus"></i> Add</button>
        </div>
    </div>
    <div class="card bg-light mb-3 border-warning" style="max-width: 21.5rem;">
        <div class="card-header bg-warning text-white">Todo</div>
        <div class="card-body">
            <div v-if="todos.length === 0" class="card" style="width: 16rem;">
                <h6>no action exist</h6>
            </div>
            <card-todo 
                v-for="todo in todos" 
                :key="todo.id" 
                :todo="todo"
                :destroyTask="destroyTask"
                :editTask="editTask"
                :updateCategory="updateCategory">
            </card-todo>
        </div>
        <div class="card-footer bg-transparent border-success">
            <button @click="openModal();assignIdCategory(2)" class="btn btn-sm btn-secondary btn-block"> <i class="fa fa-plus"></i> Add</button>
        </div>
    </div>
    <div class="card bg-light mb-3 border-info" style="max-width: 21.5rem;">
        <div class="card-header bg-info text-white">Doing</div>
        <div class="card-body">
            <div v-if="doings.length === 0" class="card" style="width: 16rem;">
                <h6>no action exist</h6>
            </div>
            <card-doing 
                v-for="doing in doings" 
                :key="doing.id" 
                :doing="doing"
                :destroyTask="destroyTask"
                :editTask="editTask"
                :updateCategory="updateCategory">
            </card-doing>
        </div>
        <div class="card-footer bg-transparent border-success">
            <button @click="openModal();assignIdCategory(3)" class="btn btn-sm btn-secondary btn-block"> <i class="fa fa-plus"></i> Add</button>
        </div>
    </div>
    <div class="card  mb-3 border-success" style="max-width: 21.5rem;">
        <div class="card-header bg-success text-white">Done</div>
        <div class="card-body">
            <div v-if="dones.length === 0" class="card" style="width: 16rem;">
                <h6>no action exist</h6>
            </div>
            <card-done 
                v-for="done in dones" 
                :key="done.id" 
                :done="done"
                :destroyTask="destroyTask"
                :editTask="editTask"
                :updateCategory="updateCategory">
            </card-done>
        </div>
        <div class="card-footer bg-transparent border-success">
            <button @click="openModal();assignIdCategory(4)" class="btn btn-sm btn-secondary btn-block"> <i class="fa fa-plus"></i> Add</button>
        </div>
    </div>
</div>

</template>

<script>
import CardBacklog from './CardBacklog';
import CardTodo from './CardTodo';
import CardDoing from './CardDoing';
import CardDone from './CardDone';

export default {
    name: "CardCategory",
    props: ['backlogs','todos','doings','dones','showModalTask','detailIdTaskAdd','destroyTask','editTask','updateCategory'],
    components: {
        CardBacklog,
        CardTodo,
        CardDoing,
        CardDone,
    },
    methods: {
        openModal(){
            this.$emit('update:showModalTask', true)
        },
        assignIdCategory(id){
            this.$emit('update:detailIdTaskAdd', id)
        }
    }
}
</script>

<style>

</style>