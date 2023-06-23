const addZero = (num) => (num < 10 ? `0${num}` : num);

export const getCurrentDateTime = () => {
  const months = [
    "янв",
    "фев",
    "мар",
    "апр",
    "май",
    "июн",
    "июл",
    "авг",
    "сен",
    "окт",
    "ноя",
    "дек",
  ];

  const weekDays = [
    "воскресенье",
    "понедельник",
    "вторник",
    "среда",
    "четверг",
    "пятница",
    "суббота",
  ];

  const date = new Date();
  const dayOfMonth = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  const dayOfWeek = weekDays[date.getDay()];

  const hours = addZero(date.getHours());
  const minutes = addZero(date.getMinutes());

  return { month, year, dayOfMonth, dayOfWeek, hours, minutes };
};

export const calculateDewPoint = (temp, humidity) => {
  const a = 17.27;
  const b = 237.7;

  const ft = (a * temp) / (b + temp) + Math.log(humidity / 100);

  const dewPoint = (b * ft) / (a - ft);

  return dewPoint.toFixed(1);
};

export const convertPressure = (pressure) => {
  const mmHg = pressure * 0.750063755419211;

  return mmHg.toFixed(2);
};

export const getWeatherForecastData = (data) => {
  const foreCast = data.list.filter(
    (item) =>
      new Date(item.dt_txt).getHours() === 12 &&
      new Date(item.dt_txt).getDate() > new Date().getDate() &&
      new Date(item.dt_txt).getDate() < new Date().getDate() + 5
  );

  const forecastData = foreCast.map((item) => {
    const date = new Date(item.dt_txt);
    const weekDaysShort = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

    const dayOfWeek = weekDaysShort[date.getDay()];
    const weatherIcon = item.weather[0].icon;

    let minTemp = Infinity;
    let maxTemp = -Infinity;

    for (let i = 0; i < data.list.length; i++) {
      const temp = data.list[i].main.temp;
      const tempDate = new Date(data.list[i].dt_txt);

      if (tempDate.getDay() === date.getDay()) {
        if (temp < minTemp) {
          minTemp = temp;
        }

        if (temp > maxTemp) {
          maxTemp = temp;
        }
      }
    }

    return {
      dayOfWeek,
      weatherIcon,
      minTemp,
      maxTemp,
    };
  });

  return forecastData;
};

export const getCity = async () => {
  const url = "https://ipapi.co/city/";

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Ошибка получения города");
    }

    const city = await res.text();

    return { success: true, city };
  } catch (error) {
    console.error(error);

    return { success: false, error };
  }
};
