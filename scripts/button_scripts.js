// global variables
const size = 150;
const num_array = new Array(size);
let frames = new Array();
const delay = 100 / size;
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
    // reset global values
    sorted = false;
    frames = [];
    animate(num_array);
};

const sleeper = (i) => {
    if (i < frames.length) {
        animate(frames[i]);
        setTimeout(sleeper, delay, ++i);
    } else {
        alert("Sort Successful");
    }
};

const sort_animate = () => {
    let i = 0;
    if (i < frames.length) {
        sleeper(i);
        sorted = true;
    }
};

// merge sort button
const merge_sort_btn = () => {
    if (!sorted) {
        merge_sort(num_array, 0, num_array.length - 1);
        sort_animate();
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


// quick sort button
const quick_sort_btn = () => {
    if (!sorted) {
        quick_sort(num_array, 0, num_array.length);
        sort_animate();
    }
    else {
        alert("Data is sorted");
    }
};

const quick_sort = (array, i, j) => {
    if (i < j) {
        pivot = partition(array, i, j);
        quick_sort(array, i, pivot - 1);
        quick_sort(array, pivot + 1, j);
    }
};

const partition = (array, left, right) => {
    const pivot = array[left];
    let i = left + 1;
    for (let j = left + 1; j <= right; ++j) {
        if (array[j] < pivot) {
            swap(array, j, i);
            // take note of every time a swap happens
            frames.push(array.slice(0));
            ++i;
        }
    }
    swap(array, left, i - 1)
    return i - 1;
};

const swap = (array, i, j) => {
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
};


// bubble sort button
const bubble_sort_btn = () => {
    if (!sorted) {
        bubble_sort();
        sort_animate();
    } else {
        alert("Data is sorted");
    }
    
};

const bubble_sort = () => {
    for (let i = 0; i < num_array.length - 1; ++i) {
        let swapped = false;
        for (let j = 0; j < num_array.length - i - 1; ++j) {
            if (num_array[j] > num_array[j + 1]) {
                swap(num_array, j, j + 1);
                frames.push(num_array.slice(0));
                swapped = true;
            }
        }

        if (!swapped) {
            break;
        }
    }
};

//insertion sort button
const insertion_sort_btn = () => {
    if (!sorted) {
        insertion_sort();
        sort_animate();
    } else {
        alert("Data is sorted");
    }
};

const insertion_sort = () => {
    for (let i = 1; i < num_array.length; ++i){
        insert(i);
    }
};

const insert = (index) => {
    let val = num_array[index];
    let i = index - 1;
    for (; (i >= 0 && num_array[i] > val); --i) {
        // shift values down
        num_array[i + 1] = num_array[i];
        frames.push(num_array.slice(0));
    }
    num_array[i + 1] = val;
    frames.push(num_array.slice(0));
};