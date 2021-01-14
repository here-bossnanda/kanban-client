<template>
<div>
    <div class="card" style="width: 16rem;">
        <div class="card-body">
            <h5 class="card-title">{{todo.name}}</h5>
            <p class="card-text">{{todo.description}}</p>
            <div style="margin-top: 20px;">
                <p class="card-text-small" style="text-align: left;"> by: {{todo.user.email}}</p>
            </div>
            <div class="float-right">
                <a href="javascript:void(0)" @click="destroyTask(todo.id)" class="btn btn-sm btn-danger text-right"> <i class="fa fa-trash"></i> </a>
                <a href="javascript:void(0)" @click="editTask(todo.id)" class="btn btn-sm btn-warning text-right"> <i class="fa fa-pencil-alt"></i> </a>
                <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-info dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <i class="fa fa-arrows-alt"></i>
                    </button>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" @click="updateCategory(todo.id,1)" href="javascript:void(0)">Move to Backlog</a>
                        <a class="dropdown-item" @click="updateCategory(todo.id,3)" href="javascript:void(0)">Move to Doing</a>
                        <a class="dropdown-item" @click="updateCategory(todo.id,4)" href="javascript:void(0)">Move to Done</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
export default {
    name: 'CardTodo',
    props: ['todo','editTask','destroyTask','updateCategory']
}
</script>