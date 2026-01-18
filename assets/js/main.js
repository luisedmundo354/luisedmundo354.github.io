(() => {
  const navLinks = [...document.querySelectorAll(".side-link")];
  if (!navLinks.length) return;

  const sectionIds = [
    ...new Set(
      navLinks
        .map((a) => a.getAttribute("href"))
        .filter((href) => href && href.startsWith("#"))
        .map((href) => href.slice(1))
    ),
  ];

  const linkById = new Map(navLinks.map((a) => [a.getAttribute("href")?.slice(1), a]));

  const setActive = (id) => {
    navLinks.forEach((a) => a.classList.remove("active"));
    const active = linkById.get(id);
    if (active) active.classList.add("active");
  };

  const markers = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  if (!markers.length) return;

  const sections = markers.map((marker, index) => {
    const id = marker.id;
    const nextMarker = markers[index + 1] ?? null;

    const section = document.createElement("section");
    section.className = "section";
    section.id = id;
    section.setAttribute("data-section-id", id);

    marker.removeAttribute("id");
    marker.parentNode.insertBefore(section, marker);

    let node = marker;
    while (node && node !== nextMarker) {
      const next = node.nextSibling;
      section.appendChild(node);
      node = next;
    }

    return section;
  });

  const topOffset = 110;
  const updateActive = () => {
    let activeId = sections[0]?.id;
    for (const section of sections) {
      if (section.getBoundingClientRect().top <= topOffset) activeId = section.id;
      else break;
    }
    if (activeId) setActive(activeId);
  };

  let ticking = false;
  const scheduleUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      updateActive();
    });
  };

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("hashchange", scheduleUpdate);

  window.requestAnimationFrame(() => window.requestAnimationFrame(updateActive));
})();
