const db = firebase.database();
const b1 = document.querySelector(".b1");
const b2 = document.querySelector(".b2");
const b3 = document.querySelector(".b3");
var backgroundImagesArray;

function displayBackgroundImages() {
    db.ref("/BackgroundImages")
      .once("value")
      .then((snapshot) => {
        const backgroundImagesData = snapshot.val();
        if (backgroundImagesData) {
          backgroundImagesArray = Object.values(backgroundImagesData);
          if (backgroundImagesArray.length >= 2) {
            b1.style.backgroundImage = `linear-gradient(to right,#000 40%,transparent 58%), url('${backgroundImagesArray[0]}')`;
            b2.style.backgroundImage = `linear-gradient(to right,#000 40%,transparent 58%), url('${backgroundImagesArray[1]}')`;
          } else if (backgroundImagesArray.length === 1) {
            b1.style.backgroundImage = `linear-gradient(to right,#000 40%,transparent 58%), url('${backgroundImagesArray[0]}')`;
            b2.style.backgroundImage = ""; 
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching background images: ", error);
      });
}

setTimeout(displayBackgroundImages, 1000);

function checkScreenWidth() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
    if (screenWidth < 700) {
      yourFunction();
    } else {
      // Reset background image for b1 when screen width is >= 680 pixels
      displayBackgroundImages();
    }


    //grid
    if (screenWidth < 1000) {
        document.querySelector(".channeldiv").style.gridTemplateColumns = 'repeat(2, 1fr)';
        document.querySelector(".channeldiv").style.columnGap = '72px';
        b3.style.height= '101vh';
    }
    else{
        document.querySelector(".channeldiv").style.gridTemplateColumns = 'repeat(3, 1fr)';
        document.querySelector(".channeldiv").style.columnGap = '90px';
        b3.style.height= '84vh';
    }
}
  
function yourFunction() {
    // Check if backgroundImagesArray is defined and contains at least 4 elements
    if (backgroundImagesArray && backgroundImagesArray.length >= 4) {
      b1.style.backgroundImage = `linear-gradient(to top,#000 40%,transparent 58%), url('${backgroundImagesArray[2]}')`;
      b1.style.backgroundSize = 'cover';
    }


    console.log("Screen width is less than 680 pixels");
}

checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);


//languages
//Hindi
