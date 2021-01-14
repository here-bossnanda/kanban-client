<template>
  <div class="band ">
    <div v-if="organisationsData.length === 0">
        <h6>no organisation exist</h6>
    </div>
    <div v-for="data in organisationsData " :key="data.id ">
        <div class="card">
            <a href="javascript:void(0) " @click="detailOrganisation(data.id) ">
                <div class="thumb " style="background-image: url(https://s3-us-west-2.amazonaws.com/s.cdpn.io/210284/flex-1.jpg); "></div>
                <article>
                    <h1>{{data.name}}</h1>
                    <span> owner: <br> {{data.owner.firstName}} {{data.owner.lastName}}</span>
                </article>
            </a>
            <div class="row">
                <div class="btn-group" role="group" aria-label="Basic example" style="margin: 10px 50px;">
                    <button type="button" @click="editOrganisation(data.id)" class="btn btn-sm btn-warning"><i class="fa fa-pencil-alt"></i> Edit</button>
                    <button type="button" @click="deleteOrganisation(data.id)" style="margin-left: 5px;" class="btn btn-sm btn-danger"><i class="fa fa-trash-alt"></i> Delete</button>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: "OrganisationCard",
    props: ["organisationsData"]
}
</script>