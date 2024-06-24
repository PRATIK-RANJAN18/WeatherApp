const container = document.querySelector('.container');
const search = document.querySelector('.search-box');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
	const APIKey = '8b7cc4fe43cdd6013cdd598c6d1e54fd';
	const city = document.querySelector('.search-box input').value;

	if (city == '') return;

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
	)
		.then((response) => response.json())
		.then((json) => {
			if (json.cod === '404') {
				container.style.height = '500px';
				weatherBox.style.display = 'none';
				weatherDetails.style.display = 'none';
				error404.style.display = 'block';
				error404.classList.add('fadeIn');
				return;
			}

			error404.style.display = 'none';
			error404.classList.remove('fadeIn');

			const image = document.querySelector('.weather-box img');
			const temprature = document.querySelector('.weather-box .temprature');
			const description = document.querySelector('.weather-box .description');
			const humidity = document.querySelector(
				'.weather-details .humidity span'
			);
			const wind = document.querySelector('.weather-details .wind span');

			switch (json.weather[0].main) {
				case 'Clear':
					image.src = 'img/clear.png';
					break;

				case 'Rain':
					image.src = 'img/rain.png';
					break;

				case 'Clouds':
					image.src = 'img/cloud.png';
					break;

				case 'Snow':
					image.src = 'img/snow.png';
					break;

				case 'Mist':
					image.src = 'img/mist.png';
					break;

				default:
					image.src = '';
			}

			temprature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span`;
			description.innerHTML = `${json.weather[0].description}`;
			humidity.innerHTML = `${json.main.humidity}%`;
			wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

			weatherBox.style.display = '';
			weatherDetails.style.display = '';
			weatherBox.classList.add('fadeIn');
			weatherDetails.classList.add('fadeIn');
			container.style.height = '600px';
		});
});