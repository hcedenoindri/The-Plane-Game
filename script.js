
let plane = { 
  image: new Image(),
  s_h: 120,
  s_w: 125,
  s_i: 0,
  x: 25,
  y: 129,
  dx: 90,
  dy: 93,
  rect: {
    dx: 0,
    up_dy: 0,
    center_dy: 0,
    down_dy: 0
  }
}; plane.image.src="plane.png";

let bckg = {
  image: new Image(),
  width: 600,
  height: 375,
  i: 600,
  w_i: 0,
  dx: 600,
  dy: 350
}; bckg.image.src = "background.png";

let obs = {
  image: new Image(),
  width: 150,
  height: 140,
  i: 600,
  y: 105,
  dx: 75,
  dy: 70,
  circle: {radius: 34, x: 0, y: 0}
}; obs.image.src = "obstacle.png";

let coin =  {
  image: new Image(),
  s_w: 47,
  s_h: 60,
  s_i: 0,
  i: 600,
  x: 0,
  y: 55,
  dx: 47,
  dy: 60,
  circle: {radius: 15, x: 0, y: 0}
}; coin.image.src = "coins.png";

let start_button = document.querySelector("#start-button");
let c = document.querySelector("canvas");
c.style.backgroundColor = "rgb(205, 240, 255)";
c.width = "600";
c.height = "350"; 
let ctx = c.getContext("2d");
let draw_1;
let draw_2;
let lives = 3;
let points = 0;
let gamma = 0;
let endGame;
let end_interval;

plane.image.addEventListener("load", () => {

  let getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  let calc_distance = (str, obj) => {
    let distances = [];
    if (str == "coin") {
      obj.circle.x = obj.i + 24;
      obj.circle.y = obj.y + 30;

    }
    else if (str == "obs") {
      obs.circle.x = obs.i + 41;
      obs.circle.y = obs.y + 36; 
    }
    plane.rect.dx = obj.circle.x - 108;
    plane.rect.up_dy = obj.circle.y - (plane.y+32);
    plane.rect.center_dy = obj.circle.y - (plane.y+44);
    plane.rect.down_dy = obj.circle.y - (plane.y+57);
    d_0 = Math.sqrt(plane.rect.dx*plane.rect.dx + plane.rect.up_dy*plane.rect.up_dy);
    d_1 = Math.sqrt(plane.rect.dx*plane.rect.dx + plane.rect.center_dy*plane.rect.center_dy);
    d_2 = Math.sqrt(plane.rect.dx*plane.rect.dx + plane.rect.down_dy*plane.rect.down_dy);
    distances.push(d_0, d_1, d_2);
    return distances;
  };

  draw_2 = () => {
    ctx.font = "bold 50px Courier New";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER!", 300, 100);
    ctx.fillText("Score: " + parseInt(points), 300, 175);
    ctx.font = "25px Courier New";
    start_button.style.transform = "translate(200px, 205px)";
    start_button.style.clipPath = "inset(0px 0px 85px 0px)";
    document.body.prepend(start_button);
  }

  let key_1;
  let frames_1 = 0;
  let c_1 = 0;
  let distances;
  let flag_1;
  let dmg_flag = false;
  let dmg_c = 0;
  obs.y = getRandomInt(280);
  coin.y = getRandomInt(290);

  draw_1 = () => {
    frames_1 += 2;
    points += 0.1;
    if (frames_1%10 == 0) {
      // calculate
      if (dmg_flag == true) {
        if (plane.x < 0) {
          plane.x = 25;
        }
        else plane.x = -100;
        dmg_c++;
        
        if (dmg_c == 50) {
          dmg_flag = false;
          dmg_c = 0;
        }
      }
      c_1++;
      if (plane.s_i == 1) {flag_1 = true}
      if (plane.s_i == 0) {flag_1 = false}
      if (flag_1 == true) {plane.s_i -= 1;}
      else {plane.s_i += 1;}
      bckg.w_i = bckg.w_i == 597 ? 0 : bckg.w_i += 3;
      bckg.i = bckg.i == 3 ? 600 : bckg.i -= 3;
      // render
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.drawImage(bckg.image, bckg.w_i, 0, bckg.width, bckg.height, 0, 0, bckg.dx, bckg.dy);
      ctx.drawImage(bckg.image, 0, 0, bckg.width, bckg.height, bckg.i, 0, bckg.dx, bckg.dy);
      ctx.drawImage(plane.image, plane.s_w*plane.s_i, 0, plane.s_w, plane.s_h, plane.x, plane.y, plane.dx, plane.dy);
      ctx.font = 'bold 20px Courier New';
      ctx.textAlign = "start";
      ctx.fillText("Lives: " + lives, 15, 25);
      ctx.textAlign = "center";
      ctx.fillText("Score: " + parseInt(points), 300, 25);

      if (c_1 >= 10) {
        ctx.drawImage(obs.image, 0, 0, obs.width, obs.height, obs.i, obs.y, obs.dx, obs.dy);
        obs.i -= 9;
        if (obs.i < (0-obs.dx)) {
          obs.i = 600;
          obs.y = getRandomInt(280);
        }
      }
      if (c_1 >= 20) {
        ctx.drawImage(coin.image, coin.s_w*coin.s_i, 0, coin.s_w, coin.s_h, coin.i, coin.y, coin.dx, coin.dy);
        coin.i -= 12;
        coin.s_i = coin.s_i == 5 ? 0 : coin.s_i += 1;
        if (coin.i < (0-50)) {
          coin.i = 600;
          coin.y = getRandomInt(290);
        }
      }

      if (!window.DeviceOrientationEvent) {}
      else {
        if (gamma < -75) {
          plane.y += 3;
        }
        if (gamma > -15){
          plane.y -= 3;
        }
      }
    }
    
    distances = calc_distance("obs", obs);
    distances.some( (distance) => {
      if (distance <= obs.circle.radius) {
        obs.i = 600;
        obs.y = getRandomInt(280);
        dmg_flag = true;
        lives--;
        return true;
      }
    });

    distances = calc_distance("coin", coin);
    distances.forEach( (distance) => {
      if (distance <= coin.circle.radius) {
        coin.i = 600;
        coin.y = getRandomInt(290);
        points += 200;
      }
    });
  
    key_1 = window.requestAnimationFrame(draw_1);
  };

  let control = (k) => {
    let key = k.which || k.keyCode;
    if (key == 87) {
      plane.y -= 3;
    }
    if (key == 83) {
      plane.y += 3;
    }

    if (plane.y <= 0) {
      plane.y = 0;
    }
    if (plane.y >= 260) {
      plane.y = 260;
    }
  };
  document.addEventListener("keydown", (event) => {control(event);});

  let control2 = (event) => {
    gamma = event.gamma;
  };
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (event) => {control2(event)});
  }

  endGame = () => {
    if (lives <= 0) {
      window.cancelAnimationFrame(key_1);
      clearInterval(end_interval);
      draw_2();
    }
  };
});


bckg.image.addEventListener("load", () => {
  let frames_0 = 0;
  let key_0;
  let draw_0 = () => {
    frames_0 += 2;
    if (frames_0%10 == 0) {
      // calculate
      bckg.w_i = bckg.w_i == 597 ? 0 : bckg.w_i += 3;
      bckg.i = bckg.i == 3 ? 600 : bckg.i -= 3;
      // render
      ctx.clearRect(0, 0, c.width, c.height);
      ctx.font = 'bold 30px Courier New';
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.drawImage(bckg.image, bckg.w_i, 0, bckg.width, bckg.height, 0, 0, bckg.dx, bckg.dy);
      ctx.drawImage(bckg.image, 0, 0, bckg.width, bckg.height, bckg.i, 0, bckg.dx, bckg.dy);
      ctx.fillText("Welcome to The Plane Game!", 300, 30);
      ctx.font = '20px Courier New';
      if (window.DeviceOrientationEvent) {
        ctx.fillText("Tilt your device to move up and down.", 300, 80);  
      }
      else {
        ctx.fillText("This game uses W to move up,", 300, 80);
        ctx.fillText("and S to move down.", 300, 100);  
      }
      ctx.fillText("Push the \"START\" button to begin.", 300, 140);
      ctx.fillText("Have fun!", 300, 160);
    }
  key_0 = window.requestAnimationFrame(draw_0);
};

  start_button.addEventListener("click", () => {
    start_button.style.transform = "translate(200px, 120px)";
    start_button.style.clipPath = "inset(85px 0px 0px 0px)";
    setTimeout(() => { 
      start_button.remove();
      window.cancelAnimationFrame(key_0);
      lives = 3;
      points = 0;
      dmg_flag = true;
      obs.i = 600;
      coin.i = 600;
      end_interval = setInterval(endGame, 2000);
      draw_1();
    }, 100);
  });
  draw_0();
});

