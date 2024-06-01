const db = firebase.database();
const b1 = document.querySelector(".b1");
const b2 = document.querySelector(".b2");
const b3 = document.querySelector(".b3");
var backgroundImagesArray;
// setTimeout(checkScreenWidth, 2000);

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

      b1.style.backgroundSize = 'cover';
      b1.style.display='block';
      document.querySelector(".tx1").style.display='block';
      document.querySelector(".smalltext1").style.textAlign='left';

      b2.style.backgroundSize = 'cover';
      b2.style.display='block';
      document.querySelector(".tx2").style.display='block';
      document.querySelector(".smalltext2").style.textAlign='left';

      document.querySelector(".bigtext3").style.textAlign='left';
      document.querySelector(".smalltext3").style.textAlign='left';
      document.querySelector(".tx3").style.width='82%';

}


function displayTextContent(language) {
    db.ref(`/${language}`)
      .once("value")
      .then((snapshot) => {
        const textData = snapshot.val();
        if (textData) {
          document.querySelector(".bigtext1").textContent = textData.bigtext1;
          document.querySelector(".smalltext1").textContent = textData.smalltext1;
          document.querySelector(".btn-text1").textContent = textData.buttonText1;
          document.querySelector(".bigtext2").textContent = textData.bigtext2;
          document.querySelector(".smalltext2").textContent = textData.smalltext2;
          document.querySelector(".bigtext3").textContent = textData.bigtext3;
          document.querySelector(".smalltext3").textContent = textData.smalltext3;
          document.querySelector(".link1").textContent = textData.link1;
          document.querySelector(".link2").textContent = textData.link2;
          document.querySelector(".link3").textContent = textData.link3;
          document.querySelector(".smalltext5").textContent = textData.smalltext5;
        }
      })
      .catch((error) => {
        console.error("Error fetching text content: ", error);
      });
      
}


setTimeout(displayBackgroundImages, 1000);
// setTimeout(displayTextContent("Hindi"), 5000);
//setTimeout(displayTextContent("Chinese"),8000);

function checkScreenWidth() {
    var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  
    if (screenWidth < 700) {
      yourFunction();
    } else {
      // Reset background image for b1 when screen width is >= 700 pixels
      displayBackgroundImages();
    }


    //grid changing
    if (screenWidth < 700){
        b3.style.flexDirection='column';
        document.querySelector(".channeldiv").style.gridTemplateColumns = 'repeat(2, 1fr)';
        document.getElementById("hehe").style.columnGap='36px !important';
        document.querySelector(".channeldiv").style.gap='13px';

        document.querySelector(".bigtext1").style.maxWidth='100%';
        document.querySelector(".smalltext1").style.maxWidth='none';

        document.querySelector(".bigtext2").style.maxWidth='100%';
        document.querySelector(".smalltext2").style.maxWidth='none';
    }
    else if (screenWidth < 1000) {
        document.querySelector(".bigtext1").style.maxWidth='70%';
        document.querySelector(".smalltext1").style.maxWidth='50%';

        document.querySelector(".bigtext2").style.maxWidth='65%';
        document.querySelector(".smalltext2").style.maxWidth='50%';

        b3.style.flexDirection='row';
        document.querySelector(".channeldiv").style.gridTemplateColumns = 'repeat(2, 1fr)';
        document.querySelector(".channeldiv").style.columnGap = '72px !important';
        document.querySelector(".channeldiv").style.gap='6px';
    }
    else{
        document.querySelector(".bigtext1").style.maxWidth='none';
        document.querySelector(".smalltext1").style.maxWidth='100%';

        document.querySelector(".bigtext2").style.maxWidth='none';
        document.querySelector(".smalltext2").style.maxWidth='100%';

        b3.style.flexDirection='row';
        document.querySelector(".channeldiv").style.gridTemplateColumns = 'repeat(3, 1fr)';
        document.querySelector(".channeldiv").style.columnGap = '90px !important';
        document.querySelector(".channeldiv").style.gap='6px';
    }
}
  
function yourFunction() {

      b1.style.backgroundImage = `linear-gradient(to top,#000 66%,transparent 80%), url('${backgroundImagesArray[2]}')`;
      b1.style.backgroundSize = 'contain';
      b1.style.display='flex';
      document.querySelector(".tx1").style.display='flex';
      document.querySelector(".smalltext1").style.textAlign='center';

      b2.style.backgroundImage = `linear-gradient(to top,#000 66%,transparent 80%), url('${backgroundImagesArray[3]}')`;
      b2.style.backgroundSize = 'contain';
      b2.style.display='flex';
      document.querySelector(".tx2").style.display='flex';
      document.querySelector(".smalltext2").style.textAlign='center';

      document.querySelector(".tx3").style.width='100%';
      document.querySelector(".bigtext3").style.textAlign='center';
      document.querySelector(".smalltext3").style.textAlign='center';

    console.log("Screen width is less than 700 pixels");
}

checkScreenWidth();
window.addEventListener('resize', checkScreenWidth);

//languages
//Hindi
