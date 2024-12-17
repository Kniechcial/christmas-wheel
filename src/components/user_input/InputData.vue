<template>
	<div class="wrapper">
		<div class="layout-grid">
			<!-- Formularz uczestników -->
			<div class="participant-form">
				<div class="flex-column">
					<div>
						<div class="sticky-header">Add participants to the draw</div>
						<div
							class="card flex justify-content-between align-items-center gap-3">
							<div class="card flex align-items-center mb-3 input-box">
								<p class="label-font mr-3">Name:</p>
								<InputText
									class="input-field"
									label="Input Name"
									type="text"
									v-model="name" />
							</div>
							<div class="card flex align-items-center mb-3 input-box">
								<p class="label-font mr-3">Email:</p>
								<InputText
									class="input-field"
									type="text"
									v-model="email" />
							</div>
						</div>
						<div
							class="card flex justify-content-between align-items-center input-box">
							<Button
								label="Add Person"
								severity="success"
								:disabled="!canAddPerson"
								@click="addPerson()"
								rounded />
							<p
								v-if="persons.length === 16"
								class="invalid-description">
								Maximum number of participants reached.
							</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Separator -->
			<div class="divider"></div>

			<!-- Lista uczestników -->
			<div class="participant-list">
				<div class="sticky-header">People added to the Christmas draw</div>
				<div v-if="persons.length === 0">
					<div class="sticky-header">
						Place for Persons playing in christmas gift
					</div>
					<div class="image-container">
						<img
							src="../../../src/assets/image/gift.png"
							alt="Gift Image" />
					</div>
				</div>
				<div class="description-container">
					<div
						class="description"
						:class="{ visible: changeText }">
						{{ changeText || "\u00A0" }}
					</div>
				</div>
				<ul>
					<li
						class="list-item"
						v-for="(person, index) in persons.slice().reverse()"
						:key="index">
						<span class="participant-name"
							>{{ person.id }}. {{ person.name }}</span
						>
						<div class="actions">
							<img
								class="icon"
								:src="person.icon"
								alt="Person Icon"
								@mouseover="handleChangeIconDescriptionDisplayOn(person)"
								@mouseout="handleChangeIconDescriptionDisplayOut"
								@click="changeIcon(person)" />
							<div
								class="color-preview"
								:style="{ backgroundColor: person.color }"
								alt="Person Color"
								@mouseover="handleChangeColourDescriptionDisplayOn(person)"
								@mouseout="handleChangeColourDescriptionDisplayOut"
								@click="changeColor(person)"></div>
							<button
								class="delete-btn"
								@click="removePerson(person.id)">
								<i class="pi pi-trash">X</i>
							</button>
						</div>
					</li>
				</ul>
			</div>

			<!-- Formularz dodatkowych informacji -->
			<div class="additional-info">
				<div class="flex-column">
					<div>
						<div class="sticky-header">Add more information</div>
						<div class="card flex align-items-center mb-3">
							<p class="label-font mr-3">Pick date:</p>
							<input
								type="date"
								class="input-field"
								v-model="userDate"
								:min="minDate"
								:max="maxDate" />
						</div>
						<div class="card flex align-items-center mb-3">
							<p class="label-font mr-3">Gift price:</p>
							<InputText
								class="input-field"
								type="number"
								v-model="userPrice" />
						</div>
						<div class="card flex justify-center">
							<div>Do you want to add your own welcome message?</div>
							<div class="flex items-center gap-4">
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
									v-model="userMessage"
									rows="5"
									cols="34" />
							</div>
							<div
								v-if="!addMessage"
								class="default-message">
								{{ dynamicMessage }}
							</div>
						</div>
						<Button
							label="Confirm and send link"
							severity="success"
							:disabled="!isButtonEnabled"
							@click="createEvent()"
							rounded />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import RadioButton from "primevue/radiobutton";

const persons = ref([]);

let name = ref("");
let email = ref("");
let userDate = ref("");
let userPrice = ref("");
let welcomeMessage = ref("");
let userMessage = ref("");
let addMessage = ref("");
const minDate = ref("");
const maxDate = ref("");
const changeText = ref(null);

onMounted(() => {
	const year = new Date().getFullYear();
	minDate.value = `${year}-12-01`;
	maxDate.value = `${year}-12-31`;
});

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

const dynamicMessage = computed(() => {
	const date = userDate.value || "24.12";
	const price = userPrice.value || "150";
	return `Hello! Christmas is fast approaching, so we have prepared a draw. I hope you will be happy with the people you will draw to whom you will give a Christmas present. We will give gifts for ${date}, and the minimum amount we will spend on a gift is ${price} pln. Have fun and see you soon :)`;
});
const setWelcomeMessage = () => {
	if (userMessage.value && addMessage.value) {
		welcomeMessage.value = userMessage.value;
	} else {
		welcomeMessage.value = dynamicMessage.value;
	}
};

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
	persons.value.forEach((person, index) => {
		person.id = index + 1;
	});
};
const createEvent = () => {
	setWelcomeMessage();
	const newEvent = {
		persons: persons,
		welcomeMessage: welcomeMessage,
		...(!addMessage && userPrice.value && { cost: userPrice.value }),
		...(!addMessage && userDate.value && { date: userDate.value }),
	};
	console.log(newEvent);
};

const isButtonEnabled = computed(() => {
	if (persons.value.length < 3) {
		return false;
	}

	if (addMessage.value) {
		return userMessage.value.trim().length > 50;
	}

	return userDate.value.trim().length > 0 && userPrice.value.trim().length > 0;
});
</script>
<style style lang="scss">
$font-primary: "Imperial Script", cursive;
$bg-color: #f8f9fa;
$border-color: black;
$shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
$highlight-color: #f44336;

@mixin flex-center($direction: row) {
	display: flex;
	flex-direction: $direction;
	align-items: center;
}

@mixin blob-shape($radius: 54% 46% 36% 64% / 44% 61% 39% 56%) {
	border-radius: $radius;
	box-shadow: $shadow;
	overflow: hidden;
	background: $bg-color;
}

.wrapper {
	@include flex-center(column);
	gap: 60px;

	.sticky-header {
		position: sticky;
		top: 0;
		z-index: 1;
		font-family: $font-primary;
		font-size: 40px;
		margin-bottom: 0.5rem;
	}

	.layout-grid {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr auto 1fr;
		gap: 20px 50px;
		border: 2px solid green;

		.participant-form,
		.additional-info {
			@include blob-shape();
			padding: 6rem;
			width: 40rem;
			margin-left: 2rem;

			&.additional-info {
				height: 35rem;
				margin-top: -2rem;
				border-radius: 55% 54% 76% 36% / 71% 44% 69% 45%;
			}
			&.participant-form {
				margin-top: 2rem;
			}

			.label-font {
				font-family: $font-primary;
				font-size: 26px;
				text-align: right;
			}
			.input-field {
				border-radius: 4px;
				box-shadow: $shadow;
				border: 1px solid $border-color;
				max-width: 350px;
				width: 100%;
				padding: 1rem;
				height: 2.5rem;
				font-size: 15px;
			}
			.input-box {
				flex-direction: column;
				max-width: 400px;
				box-sizing: border-box;
				padding: 1rem;
			}
		}
		.additional-info {
			grid-row: 3;
			grid-column: 1;
		}

		.participant-list {
			@include blob-shape();
			padding: 6rem;
			width: 40rem;
			margin-right: 1rem;
			height: 30rem;
			grid-column: 3;
			grid-row: 2;
			display: flex;
			flex-direction: column;
			font-family: $font-primary;

			.description-container {
				min-height: 20px;
				height: auto;
				display: flex;
				justify-content: flex-end;
			}

			.description {
				font-family: $font-primary;
				color: red;
				font-size: 24px;
				padding-top: 1rem;
				visibility: hidden;
			}

			.description.visible {
				visibility: visible;
			}

			ul {
				max-height: 11rem;
				overflow-y: scroll;
				padding: 0 2rem;
				margin: 0;
				list-style: none;

				&::-webkit-scrollbar {
					display: none;
				}

				.list-item {
					display: grid;
					grid-template-columns: 60% 40%;
					padding: 0.5rem 0;
					align-items: center;
					border-bottom: 1px solid #ddd;

					.participant-name {
						text-align: left;
						font-family: $font-primary;
						font-size: 22px;
						margin: 0;
					}

					.actions {
						@include flex-center();
						justify-content: flex-start;

						.icon,
						.color-preview {
							width: 35px;
							height: 35px;
							cursor: pointer;
							margin-right: 0.5rem;
						}

						.color-preview {
							border-radius: 15%;
						}

						.delete-btn {
							background: none;
							border: none;
							font-weight: 800;
							color: $highlight-color;
							cursor: pointer;
							width: 50px;
							height: 35px;

							&:hover {
								color: black;
								transform: scale(1.2);
							}
						}
					}
				}
			}
		}

		.divider {
			grid-column: 2;
			@include flex-center();
			border: 2px solid $border-color;
		}
	}

	.image-container {
		position: relative;
		width: 10rem;
		height: 10rem;
		overflow: hidden;
		float: right;

		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			opacity: 0.8;
		}
	}

	.default-message {
		font-family: $font-primary;
		font-size: 20px;
		width: 400px;
		height: 140px;
		padding: 1rem 0 0.5rem;
	}
	.invalid-description {
		font-family: $font-primary;
		font-size: 20px;
		padding-top: 1rem;
		color: red;
	}
}
</style>
