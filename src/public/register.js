const theme = localStorage.getItem("theme");

if (theme === "dark") {
	document.body.style.backgroundColor = "black";
	document.body.style.color = "white";
} else {
	document.body.style.backgroundColor = "white";
	document.body.style.color = "black";
}

const mode = document.getElementById("mode");

mode.addEventListener("click", () => {
	if (mode.innerText === "Dark") {
		localStorage.setItem("theme", "dark");
		document.body.style.backgroundColor = "black";
		document.body.style.color = "white";
		mode.innerText = "Light";
	} else {
		localStorage.setItem("theme", "light");
		document.body.style.backgroundColor = "white";
		document.body.style.color = "black";
		mode.innerText = "Dark";
	}
});