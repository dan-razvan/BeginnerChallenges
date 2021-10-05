let kelvinToFahrenheit = kelvin => {
    const celsius = kelvin - 273;
    let fahrenheit = celsius * (9 / 5) + 32;
    return fahrenheit
}

kelvinToFahrenheit()