const axios = require("axios")

// Make a request for a user with a given ID
axios.get("https://jsonplaceholder.typicode.com/todos/1")
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .finally(function () {
    //always excuted
  });

(async () => {
  // Make a request for a user with given ID
  try {
    const response = await axios.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
})();