const dayOrNight = (dSunset, dSunrise, now = new Date()) => {
  const sunset = new Date(dSunset);
  const sunrise = new Date(dSunrise);
  if (now > sunrise && now < sunset) {
    return 'day';
  }

  return 'night';
};

export default dayOrNight;
