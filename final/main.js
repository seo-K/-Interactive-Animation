const btnEl = document.querySelector(".btn");

btnEl.addEventListener("click", () => {
  btnEl.classList.add("loading");

  // 3초 후에 로딩 상태를 해제합니다.
  setTimeout(() => {
    btnEl.classList.remove("loading");
  }, 3000);
});
