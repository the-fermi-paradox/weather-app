const dayOrNight = (data) => {
  const now = new Date();
  const sunset = new Date(data.sunset);
  const sunrise = new Date(data.sunrise);
  if (now > sunrise && now < sunset) {
    return 'day';
  }

  return 'night';
};

export default dayOrNight;
