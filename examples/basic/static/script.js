const prefix = '/http';

const redirectTo = url => window.location.pathname = `${prefix}/${url}`;

const go = () => {
	const url = document.getElementById('search').value;

	if (url !== '') {
		if (url.includes('.') && !url.includes(' '))
			redirectTo(url.substring(0, 4) === 'http' ? url : 'https://' + url);
		else if (url.includes('.') && !url.includes(' '))
			redirectTo(url.substring(0, 4) === 'http' ? url : 'https://' + url);
		else
			redirectTo(`https://search.brave.com/search?q=${url.replace(/ /g, '+')}`);
	}
}

const $ = document.querySelector.bind(document);

const tc = () => {
	localStorage.setItem('tc', localStorage.getItem("tc") ? "" : "true")
	handleToggle()
}

const handleToggle = () => {
	localStorage.getItem("tc").remove(tc ? "disabled" : "enabled")
	$(".istc").classList.add(tc ? "enabled" : "disabled")
	$(".istc").innerHTML = tc ? "enabled" : "disabled"
}

const tabCloaking = localStorage.getItem("tc") || ""

handleToggle();

window.addEventListener("load", () => {
	$(".settings").addEventListener("click", () => {
		$("#settings-tab").style.display = "block"
	})
	$("#tc").addEventListener("click", tc);
	$(".go").addEventListener("click", go);

	const search = document.getElementById("search")
	
	search.addEventListener("keyup", event => {
		event.preventDefault()
		event.keyCode === 13 && search.value !== "" && go();
	})
});

function colors() {
	const search = document.getElementById("search")
	search.style.color = '#' + Math.random().toString(16).slice(-6)
}

window.onload = function() {
	const search = document.getElementById("search")
	search.style.color = '#' + Math.random().toString(16).slice(-6)
}

function hideSugg() {
	document.getElementById("search").style.borderRadius = "15px 0 0 15px";
	document.getElementsByClassName("go")[0].style.borderRadius = "0 15px 15px 0"
	document.getElementById("suggestions").style.display = "none"
}

function showSugg() {
	document.getElementById("search").style.borderRadius = "15px 0 0 0";
	document.getElementsByClassName("go")[0].style.borderRadius = "0 15px 0 0"
	document.getElementById("suggestions").style.display = "inherit"
}

function suggGo(suggtext) {
	go(suggText)
	document.getElementById("search").value = ""
}

window.addEventListener('load', function() {
	const search = document.getElementById('search');

	search.addEventListener("keyup", function(event) {
		event.preventDefault();
		if (event.keyCode === 13 && this.value !== '') {
			go(this.value);
			this.value = "";
		}
	});

	search.addEventListener('keyup', function(event) {
		event.preventDefault()
		if (search.value.trim().length !== 0) {
			document.getElementById('suggestions').innerText = ""
			showSugg()
			async function getSuggestions() {
				const term = search.value || '';
				const response = await fetch(`${prefix}/https://duckduckgo.com/ac/?q=${term}&type=list`);
				const result = await response.json();
				const suggestions = result.slice(0, 8);
				for (sugg in suggestions) {
					const suggestion = suggestions[sugg];
					const sugg = document.createElement("div");
					sugg.innerText = suggestion;
					sugg.setAttribute("onclick", "sugggo(this.innerText)");
					sugg.className = "sugg";
					document.getElementById("suggestions").appendChild(sugg);
				}
			}
			getSuggestions();
		} else {
			hideSugg();
		}
	});

	search.addEventListener("click", function(event) {
		if (search.value.trim().length !== 0) {
			showSugg();
		}
	})

})

function suggClick() {
	if (window.event.srcElement.id !== 'search' && window.event.srcElement.id !== 'suggestions') {
		hideSugg()
	}
}

// Use addeventlistener
document.onclick = suggClick;
