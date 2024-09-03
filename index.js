
async function loadPyodideAndPackages() {
    let pyodide = await loadPyodide();
    return pyodide;
}



document.getElementById('modeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});


let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {

    if(index===slides.length || index>=slides.length){
        currentSlide=slides.length-1
        return (
            alert(" THERE IS NO SLIDES, PLEASE GO BACK ")
        );
    }

    if(index<0){
        currentSlide=0
        return (
            alert("THERE IS NO SLIDES , PLEASE MOVE FORWARD")
        );
    }
    // Hide all slides
    slides.forEach((slide, idx) => {
        slide.style.display = 'none';
    });
    // Show the selected slide
    slides[index].style.display = 'block';
}

function nextSlide() {
    currentSlide = (currentSlide + 1);
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = currentSlide - 1;
    showSlide(currentSlide);
}

const myDiv = document.querySelector('.right-arrow');
const myLeft= document.querySelector('.left-arrow');
myDiv.addEventListener('click', nextSlide);

myLeft.addEventListener('click', prevSlide);

showSlide(currentSlide);



//chart bar  table

const xValues = ["India", "Australia", "England", "Newzeland", "South Africa"];
const yValues = [55, 49, 44, 34, 25];
const barColors = ["green", "red","blue","orange","brown"];

new Chart("myChart", {
  type: "bar",
  data: {
    labels: xValues,
    datasets: [{
      backgroundColor: barColors,
      data: yValues
    }]
  },
  options: {
    legend: {display: false},
    title: {
      display: true,
      text: "World Cricket Teams ODI Points Table 2024"
    }
  }
});

document.getElementById('runButton').addEventListener('click', async function() {
    const pythonCode = document.getElementById('pythonCode').value;
    const outputElement = document.getElementById('output');
    
    try {
        // Load Pyodide if not already loaded
        let pyodide = await loadPyodideAndPackages();
        console.log(pyodide)
        let result = await pyodide.runPython(pythonCode);
        console.log(result);
        outputElement.textContent = result;
    } catch (error) {
        outputElement.textContent = error.message;
    }
});

document.querySelector('.copy-btn').addEventListener('click', function () {
    const codeElement = document.getElementById('codeBlock');
    const range = document.createRange();
    range.selectNode(codeElement);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges();
    alert('Code copied to clipboard!');
});