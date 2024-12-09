<template>
	<div class="main-container">
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
							:disabled="!canAddPerson"
							@click="addPerson()"
							rounded />
						<p
							v-if="persons.length === 16"
							class="descriptionChangeText">
							Maximum number of participants reached.
						</p>
					</div>
				</div>
			</div>
			<div class="svg-line"></div>

			<!-- Kontener YOUR INPUT -->
			<div class="your-input">
				<div class="display flex flex-column">
					<div class="input-description">
						People added to the Christmas draw
					</div>
					<div
						class="input-description"
						v-if="persons.length === 0">
						Place for Persons playing in christmas gift
						<div class="gift-image">
							<img
								src="../../../src/assets/image/gift.png"
								alt="Gift Image" />
						</div>
					</div>
					<div v-if="changeText"></div>
					<div
						class="descriptionChangeText"
						:class="{ visible: changeText }">
						{{ changeText || "\u00A0" }}
					</div>
					<ul>
						<li
							class="person"
							v-for="(person, index) in persons.slice().reverse()"
							:key="index">
							<span class="person-name"
								>{{ person.id }}. {{ person.name }}</span
							>
							<div class="selected-details">
								<img
									class="person-icon"
									:src="person.icon"
									alt="Person Icon"
									@mouseover="handleChangeIconDescriptionDisplayOn(person)"
									@mouseout="handleChangeIconDescriptionDisplayOut"
									@click="changeIcon(person)" />
								<div
									class="person-colour"
									:style="{ backgroundColor: person.color }"
									alt="Person Color"
									@mouseover="handleChangeColourDescriptionDisplayOn(person)"
									@mouseout="handleChangeColourDescriptionDisplayOut"
									@click="changeColor(person)"></div>
								<button
									class="delete-button"
									@click="removePerson(person.id)">
									<i class="pi pi-trash">X</i>
								</button>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<!-- Kontener INPUT ADDITIONAL DATA -->
			<div class="input-data-2 blob-2">
				<div class="flex flex-column">
					<div>
						<div class="input-description">Add more information</div>
						<div class="card flex align-items-center mb-3">
							<p class="input-font flex mr-3">Data:</p>
							<InputText
								label="Input Name"
								type="text"
								v-model="data" />
						</div>
						<div class="card flex align-items-center mb-3">
							<p class="input-font flex mr-3">Maximum gift cost:</p>
							<InputText
								type="number"
								v-model="cost" />
						</div>
						<div class="card flex justify-center">
							<div>Do you want add welcome message?</div>
							<div class="flex flex-wrap gap-4">
								<div class="flex items-center gap-2">
									<RadioButton
										v-model="addMessage"
										:value="true" />
									<label for="Option1">Yes</label>
								</div>
								<div class="flex items-center gap-2">
									<RadioButton
										v-model="addMessage"
										:value="false" />
									<label for="Option2">No, use default</label>
								</div>
							</div>
						</div>
						<div>
							<div v-if="addMessage">
								<Textarea
									placeholder="Enter a welcome message for everyone..."
									v-model="welcomeMessage"
									rows="5"
									cols="34" />
							</div>
							<div
								v-if="!addMessage"
								class="defaultMessage">
								Message to users
							</div>
						</div>
						<Button
							label="Confirm and send link"
							severity="success"
							@click="createEvent()"
							rounded />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup>
import { computed, ref } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";

const persons = ref([]);

let name = ref("");
let email = ref("");
let data = ref("");
let cost = ref("");
let welcomeMessage = ref("");
let addMessage = ref("");
const changeText = ref(null);

const icons = import.meta.glob("../../assets//icon/*.png", { eager: true });
const availableIcons = Object.values(icons).map((module) => module.default);
const availableColors = ref([
	"#FF5733",
	"#33FF57",
	"#3357FF",
	"#FFC300",
	"#C70039",
	"#900C3F",
	"#581845",
	"#FF33A1",
	"#33FFF3",
	"#FF8C33",
	"#A1FF33",
	"#5733FF",
	"#FF5733",
	"#33A1FF",
	"#FFD633",
	"#33FF8C",
	"#8C33FF",
	"#FF33F0",
	"#33FF33",
	"#339FFF",
]);

const canAddPerson = computed(() => {
	return (
		name.value.trim() !== "" &&
		email.value.trim() !== "" &&
		persons.value.length < 16
	);
});

const addPerson = () => {
	const randomIndex = Math.floor(Math.random() * availableIcons.length);
	const randomColorIndex = Math.floor(
		Math.random() * availableColors.value.length
	);
	const icon = availableIcons[randomIndex];
	const color = availableColors.value[randomColorIndex];

	const newPerson = {
		id: persons.value.length + 1,
		name: name.value,
		email: email.value,
		icon: icon,
		color: color,
	};
	persons.value.push(newPerson);
	name.value = "";
	email.value = "";
	availableIcons.splice(randomIndex, 1);
	availableColors.value.splice(randomColorIndex, 1);
};
const changeIcon = (person) => {
	availableIcons.push(person.icon);
	const randomIndex = Math.floor(Math.random() * availableIcons.length);
	const newIcon = availableIcons[randomIndex];
	availableIcons.splice(randomIndex, 1);
	person.icon = newIcon;
};
const changeColor = (person) => {
	availableColors.value.push(person.color);
	const randomIndex = Math.floor(Math.random() * availableColors.value.length);
	const newColor = availableColors.value[randomIndex];
	availableColors.value.splice(randomIndex, 1);
	person.color = newColor;
};

const handleChangeColourDescriptionDisplayOn = () => {
	changeText.value = "Change colour";
};
const handleChangeColourDescriptionDisplayOut = () => {
	changeText.value = null;
};
const handleChangeIconDescriptionDisplayOn = () => {
	changeText.value = "Change icon";
};
const handleChangeIconDescriptionDisplayOut = () => {
	changeText.value = null;
};

const removePerson = (id) => {
	const personIndex = persons.value.findIndex((person) => person.id === id);
	if (personIndex !== -1) {
		availableIcons.push(persons.value[personIndex].icon);
		availableColors.value.push(persons.value[personIndex].color);

		persons.value.splice(personIndex, 1);
	}
};
const createEvent = () => {
	let messageToUsers = ref("");
	if (!addMessage) {
		messageToUsers = welcomeMessage;
	} else {
		messageToUsers = defaultMessageToUsers;
	}
	const newEvent = {
		persons: persons,
		cost: cost,
		date: data,
		welcomeMessage: messageToUsers,
	};
	console.log(newEvent);
};
</script>
<style>
.main-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 60px;
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
.input-data-2 {
	margin-left: 1rem;
	grid-column: 1;
	grid-row: 3;
	height: 35rem;
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
.blob-2 {
	display: flex;
	padding: 6rem;
	border-radius: 55% 54% 76% 36% / 71% 44% 69% 45%;
	align-items: center;
	overflow: hidden;
	background: #f8f9fa;
	box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
}

.li {
	border: solid 2px black;
}
.person {
	display: grid;
	grid-template-columns: 60% 40%;
	padding: 0.5rem 0;
	align-items: center;
	border-bottom: 1px solid #ddd;
}

.person-name {
	text-align: left;
	padding: 0.5rem;
	font-family: "Imperial Script", cursive;
	font-size: 22px;
	margin: 0;
}
.selected-details {
	display: flex;
	padding: 0.5rem;
	align-items: center;
	justify-content: flex-start;
}

.person-icon {
	width: 35px;
	height: 35px;
	cursor: pointer;
	margin-right: 0.5rem;
}

.person-colour {
	width: 50px;
	height: 35px;
	border-radius: 15%;
	cursor: pointer;
}
.descriptionChangeText {
	color: red;
	max-width: 40rem;
	font-family: "Imperial Script", cursive;
	font-size: 20px;
	font-weight: 500;
	padding-right: 3rem;
	text-align: right;
}

.delete-button {
	background: none;
	border: none;

	font-weight: 800;
	color: #f44336;
	cursor: pointer;
	width: 50px;
	height: 35px;
}

.delete-button:hover {
	color: #d32f2f;
	scale: 1.2;
}
.gift-image {
	position: absolute;
	right: 0;
	width: 10rem;
	height: 10rem;
	z-index: 0;
	overflow: hidden;
}

.gift-image img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	opacity: 0.8;
}
.defaultMessage {
	font-family: "Imperial Script", cursive;
	padding-top: 1rem;
	padding-bottom: 0.5rem;
	font-size: 20px;
	width: 400px;
	height: 120px;
}
</style>
