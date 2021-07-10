const pickIcon = (id, sunrise, sunset) => {
  const now = new Date();
  const dayOrNight = now > sunrise && now < sunset ? 'day' : 'night';
  return `wi-owm-${dayOrNight}-${id}`;
};

export default pickIcon;
