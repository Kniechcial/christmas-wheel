<template>
	<div class="main-container sky">
		<div class="description">
			<h1>Opis działania aplikacji</h1>
			<h4>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis mollitia
				reprehenderit quod voluptas? Dicta voluptatem eveniet, fuga incidunt
				placeat reiciendis inventore a porro quia perspiciatis, expedita sunt
				dignissimos consectetur aspernatur! Lorem ipsum dolor sit, amet
				consectetur adipisicing elit. Qui quam aut a rerum dolorem quae, dolore
				veritatis earum placeat adipisci labore vero tenetur necessitatibus
				mollitia perspiciatis! Harum debitis voluptate ea!
			</h4>
		</div>

		<div class="content">
			<!-- Kontener INPUT DATA -->
			<div class="input-data blob">
				<div class="flex flex-column">
					<div>
						<div class="input-description">Add participants to the draw</div>
						<div class="card flex align-items-center mb-3">
							<p class="input-font flex mr-3">Name:</p>
							<InputText
								label="Input Name"
								type="text"
								v-model="name" />
						</div>
						<div class="card flex align-items-center mb-3">
							<p class="input-font flex mr-3">Email:</p>
							<InputText
								type="text"
								v-model="email" />
						</div>
						<Button
							label="Add Person"
							severity="success"
							@click="addPerson()"
							rounded />
					</div>
				</div>
			</div>
			<div class="svg-line"></div>

			<!-- Kontener YOUR INPUT -->
			<div class="your-input">
				<div class="display flex flex-column border-1 border-round p-2">
					<div class="input-description">
						People added to the Christmas draw
					</div>
					<ul>
						<li
							class="person"
							v-for="(person, index) in persons"
							:key="index">
							>
							<span>{{ person.name }}</span>
							<div class="select-details">
								<img
									class="person-icon"
									src="../../assets/icon/gift.png"
									alt="Ikona" />
								<div class="person-colour"></div>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>

		<div class="confirm">Confirm</div>
	</div>
</template>
<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

const persons = ref([]);
let name = ref("");
let email = ref("");

const addPerson = () => {
	const newPerson = { name: name.value, email: email.value };
	persons.value.push(newPerson);

	name.value = "";
	email.value = "";
};
</script>
<style>
.main-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 60px;
}
.sky {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100%;
	background: linear-gradient(to bottom, #0d1b2a, #1b263b, #415a77, #778da9);
}

.description {
	text-align: center;
}

.content {
	display: grid;
	width: 100%;
	grid-template-columns: 1fr auto 1fr;
	grid-template-rows: auto;
	column-gap: 50px;
	row-gap: 20px;
	border: solid 2px green;
}

.input-data {
	margin-left: 1rem;
	grid-column: 1;
	height: 30rem;
	width: 40rem;
	border: solid 2px black;
}
.input-description {
	position: sticky;
	top: 0;
	z-index: 1;
	background: #f8f9fa;
	font-family: "Imperial Script", cursive;
	font-size: 40px;
	font-weight: 400;
	padding: 0.5rem;
	margin-bottom: 0.5rem;
}
.input-font {
	font-family: "Imperial Script", cursive;
	font-size: 26px;
	width: 80px;
	text-align: right;
}

.your-input {
	transform: translateY(-5rem);
	height: 30rem;
	width: 40rem;
	grid-column: 3;
	grid-row: 2;
	border-radius: 54% 46% 36% 64% / 44% 61% 39% 56%;
	align-items: center;
	overflow: hidden;
	padding: 2rem;
	background: #f8f9fa;
	display: flex;
	flex-direction: column;
	padding: 6rem;
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}
.svg-line {
	grid-column: 2;
	display: flex;
	align-items: center;
	justify-content: center;
	border: solid 2px black;
}

.confirm {
	text-align: center;
}
ul {
	max-height: 11rem;
	overflow-y: scroll;
	scrollbar-width: none;
	-ms-overflow-style: none;
	list-style: none;
	padding: 0 2rem;
	margin: 0;
	width: 100%;
}
ul::-webkit-scrollbar {
	display: none;
}

.blob {
	display: flex;
	padding: 6rem;
	border-radius: 46% 54% 64% 36% / 61% 44% 56% 39%;
	align-items: center;
	overflow: hidden;
	background: #f8f9fa;
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.li {
	border: solid 2px black;
}
.person {
	display: flex;
	align-items: center;
	gap: 3rem;
	font-family: "Imperial Script", cursive;
	font-size: 22px;
	margin-bottom: 1rem;
}
.select-details {
	display: flex;
	align-items: center;
	margin-left: auto;
	gap: 2rem;
}

.person-icon {
	width: 35px;
	height: 35px;
}

.person-colour {
	width: 50px;
	height: 35px;
	background-color: red;
	border-radius: 15%;
}
</style>
