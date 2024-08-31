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
              greeting =  "Is it insomnia, inspiration, or just a caffeine-fueled adventure? Whatever it is, I'm here for it!" // Use line during 2 AM to 4 AM
            } else {
              greeting = "Good night!";
            }
    

          setTexts([
            `Your location: ${weatherData.name}`,
            `Temperature: ${tempFahrenheit}°F`, //   ${tempCelsius}°C
            `Weather: ${weatherData.weather[0].description}`,
            `Wind speed: ${weatherData.wind.speed} m/s`,
            `Date: ${weatherData.date}`,
            `Time: ${weatherData.time12Hour}`,  // ${weatherData.time24Hour}
            greeting,
          ]);
        } else {
          setTexts(["Failed to load weather data."]);
        }
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateTextsWithWeather(latitude, longitude);
        },
        (error) => {
          console.error("Failed to get user location:", error);
          setTexts(["Failed to get user location."]);
        }
      );
    }
  }, [customTexts]);

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
