import { useState, useEffect } from "react";
import { fetchWeatherData } from "./weatherApi";

const useTypingEffect = (
  typingSpeed: number,
  pauseTime: number,
  customTexts?: string[],
  shouldRestart?: boolean,
) => {
  const [currentText, setCurrentText] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [texts, setTexts] = useState<string[]>(customTexts || []);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const fallbackLocations = [
    { name: "New York", latitude: 40.7128, longitude: -74.006 },
    { name: "Chicago", latitude: 41.8781, longitude: -87.6298 },
    { name: "Los Angeles", latitude: 34.0522, longitude: -118.2437 },
    { name: "Austin", latitude: 30.2672, longitude: -97.7431 },
    { name: "Miami", latitude: 25.7617, longitude: -80.1918 },
  ];

  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);

  useEffect(() => {
    const cycleLocations = () => {
      setCurrentLocationIndex((prevIndex) => (prevIndex + 1) % fallbackLocations.length);
    };

    const intervalId = setInterval(cycleLocations, 10 * 60 * 1000); // Cycle every 10 minutes

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!customTexts) {
      const updateTextsWithWeather = async (latitude: number, longitude: number) => {
        const weatherData = await fetchWeatherData(latitude, longitude);
        if (weatherData) {
          const tempCelsius = Math.round(weatherData.main.temp - 273.15); // Convert Kelvin to Celsius
          const tempFahrenheit = Math.round((tempCelsius * 9) / 5 + 32); // Convert Celsius to Fahrenheit
          let greeting = "";

          const currentHour = new Date().getHours();

          if (currentHour >= 5 && currentHour < 12) {
            greeting = "Have a wonderful day!";
          } else if (currentHour >= 12 && currentHour < 17) {
            greeting = "Good afternoon!";
          } else if (currentHour >= 17 && currentHour < 21) {
            greeting = "Good evening!";
          } else if (currentHour >= 2 && currentHour < 4) {
            greeting = "Is it insomnia, inspiration, or just a caffeine-fueled adventure? Whatever it is, I'm here for it!"; // Use line during 2 AM to 4 AM
          } else {
            greeting = "Good night!";
          }

          setTexts([
            `Location: ${weatherData.name}`,
            `Temperature: ${tempFahrenheit}°F`, // ${tempCelsius}°C
            `Weather: ${weatherData.weather[0].description}`,
            `Wind speed: ${weatherData.wind.speed} m/s`,
            `Date: ${weatherData.date}`,
            `Time: ${weatherData.time12Hour}`, // ${weatherData.time24Hour}
            greeting,
          ]);
        } else {
          setTexts(["Failed to load weather data."]);
        }
      };

      const handleLocationError = () => {
        console.error("Failed to get user location. Using fallback location.");
        const { latitude, longitude } = fallbackLocations[currentLocationIndex];
        updateTextsWithWeather(latitude, longitude);
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateTextsWithWeather(latitude, longitude);  // Uses the location name from weatherData
        },
        () => {
          handleLocationError();
        }
      );
    }
  }, [customTexts, currentLocationIndex]); // Re-run when currentLocationIndex changes

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const handleTyping = () => {
      const fullText = texts[loopNum % texts.length];

      if (isPaused) {
        timeout = setTimeout(() => {
          setIsPaused(false);
          setIsDone(true);
        }, pauseTime); // adjust pause time
      } else if (isDone) {
        setCurrentText("");
        setIsDone(false);
        setLoopNum((prev) => prev + 1);
        setIndex(0);
        timeout = setTimeout(handleTyping, pauseTime);
      } else {
        setCurrentText(fullText.substring(0, index + 1));
        setIndex((prev) => prev + 1);

        if (index === fullText.length) {
          setIsPaused(true);
        } else {
          timeout = setTimeout(handleTyping, typingSpeed);
        }
      }
    };

    if (texts.length > 0) {
      timeout = setTimeout(handleTyping, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isDone, isPaused, loopNum, texts, index, typingSpeed, pauseTime]);

  useEffect(() => {
    if (shouldRestart) {
      setCurrentText("");
      setIsDone(false);
      setLoopNum(0);
      setIndex(0);
      setIsPaused(false);
    }
  }, [shouldRestart]);

  return currentText;
};

export default useTypingEffect;
