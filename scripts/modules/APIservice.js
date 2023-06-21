const API_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "9f560fbebfea76e7a84674c335f73f66";

export const fetchWeather = async (city) => {
  try {
    const res = await fetch(
      `${API_URL}/weather?q=${city}&appid=${API_KEY}&lang=ru`
    );

    if (!res.ok) {
      throw new Error("Ошибка запроса");
    }

    const data = await res.json();

    return { success: true, data };
  } catch (err) {
    return { success: false, err };
  }
};
