// const baseURL = 'http://localhost:4001';
const baseURL = "https://app-callback-latest.onrender.com"
const incrementCountServer = (element, count) =>{
  element.textContent = count;
}
const useDebounce = (fn, path, time) =>{
  return debounce(()=>{
    fetch(path)
      .then(response => response.json())
      .then(data => {
        fn(data.count);
      })
      .catch(error => console.error('Error fetching count:', error));
  },time)
}
//Good Example
const defaultFullText = document.getElementById('default-full');
let defaultFullCount = 0;


const updateDefaultFullText = ()=>{
  defaultFullCount++;
  incrementCountServer(defaultFullText, defaultFullCount);
} 
//Cheat

function updateDebounceFullText(count) {
  const debounceFullText = document.getElementById('debounce-full');
  debounceFullText.textContent = count;
}

function updateThrottleFullText(count) {
  const throttleFullText = document.getElementById('throttle-full');
  throttleFullText.textContent = count;
}

const debounceClickFull = useDebounce(updateDebounceFullText,'/debounce-full', 2000);
const throttleClickFull = throttle(() => {
  fetch('/throttle-full')  
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Throttle count incremented:', data.count)
      updateThrottleFullText(data.count);
    })
    .catch(error => console.error('Error fetching throttle count:', error));
}, 2000);

document.getElementById('incrementFullButton').addEventListener('click', () => {
  updateDefaultFullText();
  debounceClickFull()
  throttleClickFull()

});

// Wrong Example
const defaultMixedText = document.getElementById('default-wrong');
const debounceMixedText = document.getElementById('debounce-wrong');
const throttleMixedText = document.getElementById('throttle-wrong');
let defaultMixedCount = 0;



// ...esto te llevara al infierno 👽🔫


const updateDefaultMixedText = ()=>{
  defaultMixedCount++;
  incrementCountServer(defaultMixedText, defaultMixedCount);
} 
const debounceClickMixed = useDebounce((count)=>debounceMixedText.textContent = count, '/debounce-wrong',200);
const throttleClickMixed = useDebounce((count)=>throttleMixedText.textContent = count, '/throttle-wrong',200);

document.getElementById('incrementWrongButton').addEventListener('click', () => {
  updateDefaultMixedText();

  debounceClickMixed()
  throttleClickMixed()
  });


// Client Example
const defaultClientText = document.getElementById("default-client");
const debounceClientText = document.getElementById("debounce-client");
const throttleClientText = document.getElementById("throttle-client");

const updateDebounceText = debounce(() => {
  incrementCount(debounceClientText);
});
const updateThrottleText = throttle(() => {
  incrementCount(throttleClientText);
}); // Adjust throttle delay if needed

document.getElementById('incrementButtonClient').addEventListener('click', () => {
  incrementCount(defaultClientText);
  updateDebounceText();
  updateThrottleText();
});

function debounce(cb, delay = 2000) {
  let timeout;

  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

// function throttle(cb, delay = 2000) {
//   let shouldWait = false;
//   let waitingArgs;
  
//   return (...args) => {
//     if (!shouldWait) {
//       cb(...args);
//       shouldWait = true;
      
//       setTimeout(() => {
//         shouldWait = false;
//         if (waitingArgs) {
//           cb(...waitingArgs);
//           waitingArgs = null;
//         }
//       }, delay);
//     } else {
//       waitingArgs = args;
//     }
//   };
// }
// function throttle(cb, delay = 2000) {
//   let shouldWait = null;

//   return function(...args){
//     if(!shouldWait){
//       cb(...args);
//       // shouldWait = true;
//       setTimeout(() => {
//         shouldWait = false;
//       }, delay);
//     }
//   }
// }
function throttle(func, delay = 2000) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last < delay) return
    last = now;
    return func(...args);
  };
}
function incrementCount(element) {
  element.textContent = (parseInt(element.innerText) || 0) + 1;
}
