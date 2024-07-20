import { useState, useEffect } from "react";
import { fetchWeatherData } from "./weatherApi";
import streamText from "./streamText";

const useTypingEffect = (typingSpeed: number, pauseTime: number) => {
    const [currentText, setCurrentText] = useState("");
    const [isDone, setIsDone] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [texts, setTexts] = useState<string[]>(["Loading weather data..."]);
    const [index, setIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const updateTexts = async (latitude: number, longitude: number) => {
            const weatherData = await fetchWeatherData(latitude, longitude);
            if (weatherData) {
                const tempCelsius = Math.round(weatherData.main.temp - 273.15); // Convert Kelvin to Celsius
                const tempFahrenheit = Math.round((tempCelsius * 9) / 5 + 32); // Convert Celsius to Fahrenheit
                setTexts([
                    `Your location: ${weatherData.name}`,
                    `Temperature: ${tempCelsius}°C or ${tempFahrenheit}°F`,
                    `Weather: ${weatherData.weather[0].description}`,
                    `Wind speed: ${weatherData.wind.speed} m/s`,
                    `Date: ${weatherData.date}`,
                    `Time: ${weatherData.time24Hour} or ${weatherData.time12Hour}`,
                    ...streamText,
                ]);
            } else {
                setTexts(["Failed to load weather data."]);
            }
        };

        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            console.log("Fetched location:", latitude, longitude);
            updateTexts(latitude, longitude);
        }, (error) => {
            console.error("Failed to get user location:", error);
            setTexts(["Failed to get user location."]);
        });
    }, []);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        const handleTyping = () => {
            const fullText = texts[loopNum % texts.length];

            if (isPaused) {
                timeout = setTimeout(() => {
                    setIsPaused(false);
                    setIsDone(true);
                }, 3000);
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

    return currentText;
};

export default useTypingEffect;
