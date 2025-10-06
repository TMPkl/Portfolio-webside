export default  function getTitle(tab) {
  const base = "Karol Leszyński";
  const map = {
    'about': 'Developer & Photographer',
    'projects': 'My projects',
    'photos': 'My photos',
  'website': 'About this website',
    'contact': 'Contact me',
  };
  return map[tab] ? `${map[tab]} | ${base}` : base;
}