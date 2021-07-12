const createRequest = (options = {}) => {
    let formData = new FormData();
        for (let field in options.data) {
            formData.append(field, options.data[field]);
        }
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    try {
        xhr.open(options.method, options.url);
        xhr.send(formData);
    }
    catch (e) {
    options.callback(e);
  }

    xhr.onload = function() {
        let response = null;
        let error = null;
        if (xhr.status != 200) {
            error = xhr.statusText;
        } else {
            response = xhr.response;
        }
        options.callback(error, response);
    }
};