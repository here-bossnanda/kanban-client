<template>
<div class="band ">
    <div v-if="detailMember.length === 0">
        <h6>no member exist</h6>
    </div>
    <div v-for="data in detailMember " :key="data.id ">
        <div class="card" style="width: 18rem;">
            <img class="card-img-top img-fluid" style="width: 240px; height: auto; margin:10px 23px" src="../../assets/images/user.svg" alt="Card image cap">
            <div class="card-body">
                <span>{{data.email}}</span> <br>
                <span class="card-text">{{data.firstName}} {{data.lastName}}</span>
                
                <button style="margin-top:20px" type="button" @click="deleteMembers(data.id)" class="btn btn-sm btn-block btn-danger"><i class="fa fa-trash-alt"></i> Delete</button>
            </div>
        </div>
    </div>
    
</div>

</template>

<script>
export default {
    name: "OrganisationCard",
    props: ["detailMember",'deleteMember'],
    methods: {
        deleteMembers(id){
            this.deleteMember(id)
        }
    }
}
</script>