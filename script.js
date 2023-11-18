const fetchData = async (searchQuery) => {
  const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${searchQuery}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "YOUR_API_KEY_HERE", // Get yours for free at https://rapidapi.com/apidojo/api/imdb8
      "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
    },
  };
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    /* console.log(result); */
    const movies = result.d;
    movies.map((item) => {
      const name = item.l;
      const image = item.i.imageUrl;
      const rank = item.rank;
      const stars = item.s;
      const movie = `<li><img src="${image}"> <h1>${name}</h1><h2>${stars}</h2><p>Rank: ${rank}</p></li>`;
      document.querySelector(".movies").innerHTML += movie;
    });
  } catch (error) {
    console.error(error);
  }
};

const getMovieName = () => {
  const searchQuery = document.getElementById("searchInput").value;
  document.querySelector(".movies").innerHTML = "";
  fetchData(searchQuery || "Spider");
};
document.getElementById("searchInput").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    getMovieName();
  }
});
getMovieName();
