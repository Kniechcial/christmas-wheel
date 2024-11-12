<template>
	<div class="box flex align-items-start justify-content-between">
		<div class="input flex flex-column border-1 border-round p-3 mr-2">
			<div class="card flex align-items-center mb-3">
				<p class="mr-2">Input Name:</p>
				<InputText
					label="Input Name"
					type="text"
					v-model="name" />
			</div>
			<div class="card flex align-items-center mb-3">
				<p class="mr-2">Input Email address:</p>
				<InputText
					type="text"
					v-model="email" />
			</div>
			<p>Name: {{ name }}</p>
			<p>Email: {{ email }}</p>
			<Button
				label="Add Person"
				severity="success"
				@click="addPerson()"
				rounded />
		</div>
		<div class="display flex flex-column border-1 border-round p-3 ml-2">
			<ul>
				<li
					v-for="(person, index) in persons"
					:key="index">
					{{ person.name }}
				</li>
			</ul>
		</div>
	</div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const persons = ref([]);
const name = ref("");
const email = ref("");

const addPerson = () => {
	const newPerson = { name: name.value, email: email.value };
	persons.value.push(newPerson);

	name.value = "";
	email.value = "";
};
</script>

<style scoped>
.box {
	width: 100%;
	margin-top: 5rem;
}

.input,
.display {
	width: fit-content; 
}

ul {
	margin: 0;
	padding: 0;
	list-style: none;
}
</style>
