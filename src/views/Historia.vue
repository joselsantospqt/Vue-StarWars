<template>
  <div class="historia">
    <div id="intro">
      A long time ago, in a galaxy far,
      <br />far away....
    </div>
    <div id="logo"></div>
    <div id="scroller">
      <div>
        <p>
          It is a period of civil war.
          Rebel spaceships, striking
          from a hidden base, have won
          their first victory against
          the evil Galactic Empire.
        </p>
        <p>
          During the battle, Rebel
          spies managed to steal secret
          plans to the Empire's
          ultimate weapon, the DEATH
          STAR, an armored space
          station with enough power to
          destroy an entire planet.
        </p>
        <p>
          Pursued by the Empire's
          sinister agents, Princess
          Leia races home aboard her
          starship, custodian of the
          stolen plan that can save
          her people and restore
          freedom to the galaxy....
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Historia"
};
</script>
<style>
@import url(https://fonts.googleapis.com/css?family=News+Cycle:400);
#intro {
  opacity: 0;
  position: absolute;
  width: 50%;
  height: 50%;
  top: 70%;
  left: 25%;
  transform: translateY(-50%);
  text-align: center;
  color: rgb(75, 213, 238);
  font-size: 200%;
  animation: intro 100s ease-out infinite;
}

#logo {
  opacity: 0;
  position: absolute;
  width: 50%;
  left: 50%;
  height: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  animation: logo 100s ease-out infinite;
}
#scroller {
  position: absolute;
  width: 60%;
  margin: 0 20% 0 20%;
  height: 100%;
  font-size: 250%;
  text-align: justify;
  color: #ff6;
  transform: perspective(200px) rotateX(30deg);
}

#scroller div {
  position: absolute;
  top: 100%;
  animation: scroller 100s linear infinite;
}

#scroller p {
  margin: 1.35em 0 1.85em 0;
  line-height: 1.35em;
  color: yellow;
}

/* ANIMATIONS */

@keyframes intro {
  0% {
    opacity: 0;
  }
  1% {
    opacity: 0;
  }
  1.5% {
    opacity: 1;
  }
  5.5% {
    opacity: 1;
  }
  6% {
    opacity: 0;
  }
}

@keyframes logo {
  9% {
    transform: translateX(-50%) translateY(-50%) scale(2);
    opacity: 0;
  }
  9.1% {
    opacity: 1;
  }
  14% {
    opacity: 1;
  }
  18% {
    transform: translateX(-50%) translateY(-50%) scale(0.1);
    opacity: 0;
  }
}

@keyframes scroller {
  0% {
    top: 100%;
    opacity: 0;
  }
  7% {
    top: 100%;
    opacity: 1;
  }
  95% {
    opacity: 1;
  }
  100% {
    top: -250%;
    opacity: 0;
  }
}
</style>