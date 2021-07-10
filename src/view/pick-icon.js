import dayOrNight from '../controller/day-or-night';

const pickIcon = (data) => `wi-owm-${dayOrNight(data)}-${data.iconId}`;

export default pickIcon;
