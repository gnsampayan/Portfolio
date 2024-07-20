import moment from "moment-timezone";

const API_KEY: string = import.meta.env.VITE_REACT_APP_OPEN_WEATHER_MAP_API_KEY || '';

export const fetchWeatherData = async (latitude: number, longitude: number) => {
    if (!API_KEY) {
        throw new Error("API_KEY is not defined");
    }
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();

        // Convert timezone offset to hours and format the date using moment-timezone
        const timezoneOffset = data.timezone; // in seconds

        // Get the current date and time in the specified timezone using moment-timezone
        const dateTime = moment().utcOffset(timezoneOffset / 60);
        const date = dateTime.format('YYYY-MM-DD');
        const time24Hour = dateTime.format('HH:mm:ss');
        const time12Hour = dateTime.format('hh:mm:ss A');

        return { ...data, date, time24Hour, time12Hour };
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        return null;
    }
};
