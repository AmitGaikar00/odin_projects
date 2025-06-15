const getWeatherData = async (query) => {
  //   let data =
  const key = "";
  const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=us&key=${key}&contentType=json`;

  const response = await fetch(url);
  const data = await response.json();

  return data;
};

const form = document.querySelector("form");
const queryDiv = form.querySelector("#city");
const gifDiv = document.querySelector(".gif");

form.onsubmit = (e) => {
  e.preventDefault();
  if (!queryDiv.value) return;

  gifDiv.innerHTML = "<h1>Loading ...</h1>";

  getWeatherData(queryDiv.value)
    .then((res) => {
      gifDiv.textContent = "";
      const { conditions, icon } = res.currentConditions;

      const conditionsEle = document.createElement("h1");
      const iconEle = document.createElement("h2");

      conditionsEle.textContent = conditions;
      iconEle.textContent = icon;

      gifDiv.appendChild(conditionsEle);
      gifDiv.appendChild(iconEle);
    })
    .catch((e) => {
      gifDiv.textContent = "City not found , Please try again.";
      gifDiv.style.color = "red";
      console.error(e);
    });

  form.reset();
};
