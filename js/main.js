//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/
//control for date ranges
// pictures only!

// ! set todays date
let today = new Date().toISOString().slice(0, 10);
console.log(today);
console.log(process.env.API_KEY);
// !target date input and set it's max and initial value to todays date
const val = document.querySelector('input');
val.max = today;
val.value = today;

// !run the fetch function
document.querySelector('button').addEventListener('click', getPicture);
function getPicture() {
	// * add query parameter for date, that accepts the input value - checked docs for formatting - made sure to include '&key=' syntax for query param
	const url = `https://api.nasa.gov/planetary/apod?api_key=APIKEY=${val.value}`;
	fetch(url)
		.then(res => res.json())
		// *pass in data received to a display function
		.then(data => displayElement(data))
		.catch(err => console.log(`error ${err}`));
}

// !target html elements and block iframe and video from rendering on page load
const iframeVideo = document.querySelector('iframe');
iframeVideo.style.display = 'none';
const image = document.querySelector('img');
const video = document.querySelector('video');
video.style.display = 'none';
function displayElement(data) {
	console.log(data);
	document.querySelector('h2').innerText = data.title;
	document.querySelector('h3').innerText = data.explanation;
	// *non youtube media_type="video" was causing errors => still broken af!
	if (data.media_type === 'video' && !data.url.includes('youtube')) {
		image.src = 'https://apod.nasa.gov/apod/image/1803/AstroSoM/hudf.html/';
	}
	// *check if type is video and if the url contains youtube - was getting error otherwise - see above
	else if (data.media_type === 'video' && data.url.includes('youtube')) {
		image.style.display = 'none';
		iframeVideo.style.display = 'block';
		iframeVideo.src = data.url;
		image.src = '';
	}
	// *if media is img we set img source
	else if (data.media_type === 'image') {
		iframeVideo.style.display = 'none';
		image.style.display = 'block';
		image.src = data.url;
		iframeVideo.src = '';
	}
}
