// global variables
const size = 100;
const num_array = new Array(size);
const frames = new Array();
const delay = 10;
let sorted = false;

const animate = (num_array) => {
    const width = 1 / (size * 2) * 100;
    const dataset_elem = document.getElementById("dataset");
    while (!(dataset_elem.lastChild === null)) {
        dataset_elem.removeChild(dataset_elem.lastChild);
    }

    const elem_styles = [
        "background-color: powderblue",
        "Width: " + width + '%',
    ];

    for (const item of num_array) {
        for (const num of [item, 0]) {
            const new_elem = document.createElement("div");
            const h = "Height:" + num + "px";
            if (num != 0) {
                new_elem.setAttribute("id", JSON.stringify(num));
            }
            new_elem.setAttribute("style", (elem_styles.concat(h)).join(';'));
            dataset_elem.appendChild(new_elem);
        }
    }
};

const gen_data = () => {
    for (let i = 0; i < size; ++i) {
        num_array[i] = i + size;
    }

    for (let i = size - 1; i > 0; --i) {
        const pos = Math.floor(Math.random() * (i + 1));
        const temp = num_array[i];
        num_array[i] = num_array[pos];
        num_array[pos] = temp;
    }
    sorted = false;
    animate(num_array);
};

// merge sort button
const merge_sort_btn = () => {
    if (!sorted) {
        merge_sort(num_array, 0, num_array.length - 1);

        const sleeper = (i) => {
            if (i < frames.length) {
                animate(frames[i]);
                setTimeout(sleeper, delay, ++i);
            } else {
                alert("Merge Sort Successful");
            }
        };

        let i = 0;
        if (i < frames.length) {
            sleeper(i);
            sorted = true;
        }
    } else {
        alert("Data Already Sorted");
    }
};

const merge = (array, left, half, end) => {
    let right_start = half + 1;

    if (array[half] <= array[right_start]) {
        return;
    }

    while (left <= half && right_start <= end) {
        if (array[left] <= array[right_start]) {
            ++left;
        }
        else {
            const temp = array[right_start];
            let i = right_start;

            while (i != left) {
                array[i] = array[i - 1];
                --i;
            }
            array[left] = temp;
            ++left;
            ++half;
            ++right_start;
        }
        frames.push(array.slice(0, array.length));
    }
};

const merge_sort = (array, left, right) => {
    if (left < right) {
        let half = left + Math.floor((right - left) / 2);
        merge_sort(array, left, half);
        merge_sort(array, half + 1, right);
        merge(array, left, half, right);
    }
};