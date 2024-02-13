const gen_data = () => {
    const size = 100;
    const num_array = new Array(size);
    for (let i = 0; i < size; ++i) {
        num_array[i] = i;
    }

    for (let i = size - 1; i > 0; --i) {
        const pos = Math.floor(Math.random() * (i + 1));
        const temp = num_array[i];
        num_array[i] = num_array[pos];
        num_array[pos] = temp;
    }

    const width = 1 / (size * 2) * 100;
    const dataset_elem = document.getElementById("dataset");
    const elem_styles = [
        "background-color: powderblue", 
        "Width: " + width + '%']


    for (const num0 of num_array) {
        for (const num of [num0, 0]) {
            const new_elem = document.createElement("div");
            const h = 'Height:' + num + "px";
            new_elem.setAttribute("style", (elem_styles.concat(h)).join(';'));
            // new_elem.innerHTML = JSON.stringify(num);
            dataset_elem.appendChild(new_elem);
        }
    }
};