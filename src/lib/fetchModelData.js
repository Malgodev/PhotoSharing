function fetchModel(url) {
  return new Promise(function(resolve, reject) {
    console.log("Fetching data from:", url);

    const request = new XMLHttpRequest();
    request.onreadystatechange = function() {
      if (this.readyState === 4) {
        if (this.status === 200) {
          resolve({ data: JSON.parse(this.responseText) });
        } else {
          reject(new Error(`Request failed with status ${this.status}: ${this.statusText}`));
        }
      }
    };

    request.onerror = function() {
      reject(new Error('Network error'));
    };

    request.open("GET", url, true);
    request.send();
  });
}

const server = {
  fetchModel
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { server };
} else {
  window.server = server;
}
