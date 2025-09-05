export default  function getTitle(tab) {
  const base = "Karol Leszyński";
  const map = {
    'about': 'About me',
    'projects': 'My projects',
    'photos': 'My photos',
    'about Website': 'About this website',
    'contact': 'Contact me',
  };
  return map[tab] ? `${map[tab]} | ${base}` : base;
}