<template>
	<div class="sky">
		<div
			v-for="n in snowflakeCount"
			:key="n"
			class="snowflake"
			:style="generateSnowflakeStyle()"></div>
		<div class="absolute bottom-0 snow-drift"></div>
		<div class="main-box">
			<div class="svg-container">
				<svg
					width="100vh"
					height="100vh"
					viewBox="0 0 300 300">
					<path
						id="circlePath"
						d="M 150, 150 m -100, 0 a 100,100 0 1,1 200,0 a 100,100 0 1,1 -200,0"
						fill="none" />
					<text
						class="svg-text"
						fill="White"
						text-anchor="middle">
						<textPath
							href="#circlePath"
							startOffset="25%">
							Christmas Wheel
						</textPath>
					</text>
				</svg>
			</div>
			<button
				class="start-btn"
				@click="navigateToInputData()">
				Start
			</button>
		</div>
	</div>
</template>

<script setup>
import router from "@/router";
import { ref, onMounted } from "vue";

const snowflakeCount = 500;
const snowflakes = ref([]);

const generateSnowflakeStyle = () => {
	const size = Math.random() * 3 + 2 + "px";
	return {
		width: size,
		height: size,
		top: Math.random() * -100 + "vh",
		left: Math.random() * 100 + "vw",
		animationDuration: Math.random() * 3 + 2 + "s",
		opacity: Math.random() * 0.5 + 0.5,
	};
};

const initSnowflakes = () => {
	snowflakes.value = Array.from({ length: snowflakeCount });
};

const navigateToInputData = () => {
	router.push({
		name: "InputData",
	});
};

onMounted(() => {
	initSnowflakes();
});
</script>

<style scoped>
.sky {
	position: relative;
	overflow: hidden;
	width: 100%;
	height: 100vh;
	background: linear-gradient(to bottom, #0d1b2a, #1b263b, #415a77, #778da9);
}

.snowflake {
	position: absolute;
	border-radius: 50%;
	background-color: #fff;
	animation: fall linear infinite;
}

.main-box {
	position: relative;
	text-align: center;
}

.snow-drift {
	scale: 0.8;
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 500px;
	background: url("../assets/image/snow-drift.png");
	background-size: cover;
	background-position: center;
	z-index: 2;
	transform: translateY(250px);
}
.start-btn {
	position: relative;
	top: 35vh;
	padding: 3rem;
	background: none;
	border: 2px solid white;
	border-radius: 10%;
	font-size: 30px;
	font-weight: 500;
	color: white;
	cursor: pointer;
}
.start-btn:hover {
	color: rgb(5, 237, 121);
	font-size: 32px;
	border: 3px solid rgb(5, 237, 121);
}
.svg-container {
	font-family: "Imperial Script", cursive;
	font-weight: 500;
	font-style: normal;
	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
}
.svg-text {
	font-size: 50px;
}

@keyframes fall {
	0% {
		transform: translateY(0);
	}
	100% {
		transform: translateY(100vh);
	}
}

@media (max-width: 480px) {
	.svg-text {
		font-size: 20px;
	}
	.snow-drift {
		scale: 1.1;
	}
	.start-btn {
		scale: 0.7;
	}
}

/* Nowoczesne telefony */
@media (min-width: 481px) and (max-width: 768px) {
	.svg-text {
		font-size: 35px;
	}
	.snow-drift {
		scale: 1.1;
	}
	.start-btn {
		scale: 0.8;
	}
}

/* Tablety */
@media (min-width: 769px) and (max-width: 1024px) {
	.svg-text {
		font-size: 45px;
	}
	.snow-drift {
		scale: 1.1;
	}
	.start-btn {
		scale: 0.9;
	}
}

/* Laptopy */
@media (min-width: 1025px) {
	.snow-drift {
		scale: 1.1;
	}
}
</style>
