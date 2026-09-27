(() => {
  document.querySelectorAll("[data-current-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  const printButton = document.querySelector("[data-print]");
  if (printButton) {
    printButton.addEventListener("click", () => window.print());
  }

  const publications = [...document.querySelectorAll("[data-publication]")];
  if (!publications.length) return;

  const search = document.querySelector("[data-publication-search]");
  const filters = [...document.querySelectorAll("[data-filter]")];
  const count = document.querySelector("[data-result-count]");
  const empty = document.querySelector("[data-empty-results]");
  let activeTopic = "all";

  const update = () => {
    const term = search.value.trim().toLocaleLowerCase();
    let visible = 0;

    publications.forEach((publication) => {
      const topicMatches = activeTopic === "all" || publication.dataset.topic.split(" ").includes(activeTopic);
      const textMatches = !term || publication.textContent.toLocaleLowerCase().includes(term);
      const show = topicMatches && textMatches;
      publication.hidden = !show;
      if (show) visible += 1;
    });

    count.textContent = visible;
    empty.hidden = visible !== 0;
  };

  search.addEventListener("input", update);
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      activeTopic = button.dataset.filter;
      filters.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      update();
    });
  });
})();
