<template>
  <div>
    <h1>Your Are Loged In</h1>
    <span class="countdown">
      <span
        style="--value:59;"
        aria-live="polite"
        aria-label="59"
      >59</span>
    </span>
  </div>
</template>

<style>
.countdown > span {
  display: inline-block;
  width: 1.4em;
  background: url("data:image/svg+xml,%3Csvg xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27 width%3D%2714%27 height%3D%2714%27 viewBox%3D%270 0 14 14%27 fill%3D%27none%27 xmlns%3D%27http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%27%3E%3Crect x%3D%270%22 y%3D%220%22 width%3D%2214%22 height%3D%2214%22 fill%3D%22%23fff%22 rx%3D%221%22%2F%3E%3C%2Fsvg%3E")
    no-repeat;
  background-size: 100% 100%;
  color: #fff;
  font: 700 1.4em / 1.1 "Digital-7";
  text-align: center;
}

.countdown > span::before {
  content: attr(style);
  display: block;
  overflow: hidden;
  width: inherit;
  height: 50%;
  animation: countdown 60s steps(60) infinite;
}

@keyframes countdown {
  100% {
    transform: translateY(-50%);
  }
}
</style>
