
let plane = new Image();
plane.src="plane.png";
let bckg = new Image();
bckg.src = "background.png";
let obstacle = new Image();
obstacle.src = "obstacle.png";
let coins = new Image();
coins.src = "coins.png";

let c = document.querySelector("canvas");
c.style.backgroundColor = "rgb(205, 240, 255)";
c.width = "600";
c.height = "350"; 

let ctx = c.getContext("2d");

let sH = 120;
let sW = 125;
let dx = 90;
let dy = 93;
const x = 25;
let y = 129; 
let num_images = 4;
let index = 0;
let bckg_index = 0;
let obs_i = 650;
let coins_i = 650;
let frames = 0;
let counter = 0;
plane.addEventListener("load", () => {

  let draw = () => {
    frames += 2;
    if (frames%10 == 0) {
      counter++;
      index = index == 3 ? 0 : index += 1;
      bckg_index = bckg_index == 620 ? 0 : bckg_index += 5;
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(bckg, bckg_index, 0, 600, 375, 0, 0, 600, 350);
      ctx.drawImage(bckg, bckg_index-625, 0, 600, 375, 0, 0, 600, 350);
      ctx.drawImage(plane, sW*index, 0, sW, sH, x, y, dx, dy);

      if (counter >= 10) {
        ctx.drawImage(
          obstacle, 0, 0, 
          obstacle.width, obstacle.height,
          obs_i-75, 105,
          75, 70
        );
        obs_i -= 5;

        if (obs_i == 0) {
          obs_i = 650;
        }
      }

      if (counter >= 20) {
        ctx.drawImage();
      }
      // y += 2;
    }

    window.requestAnimationFrame(draw);
  };

  draw();
});



