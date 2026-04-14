export interface WeatherInfo {
  country: string
  city: string
  temperature: number
  description: string
  updatedAt: string
}

interface GeocodingResponse {
  results?: Array<{
    name: string
    country: string
    latitude: number
    longitude: number
  }>
}

interface ForecastResponse {
  current?: {
    temperature_2m: number
    weather_code: number
  }
}

const WEATHER_CITY = 'Kropyvnytskyi'

function weatherCodeToDescription(code: number): string {
  const map: Record<number, string> = {
    0: 'Ясно',
    1: 'Преимущественно ясно',
    2: 'Переменная облачность',
    3: 'Пасмурно',
    45: 'Туман',
    48: 'Изморозь',
    51: 'Морось',
    53: 'Морось',
    55: 'Сильная морось',
    61: 'Дождь',
    63: 'Дождь',
    65: 'Ливень',
    71: 'Снег',
    73: 'Снег',
    75: 'Сильный снег',
    80: 'Ливень',
    81: 'Ливень',
    82: 'Сильный ливень',
    95: 'Гроза',
    96: 'Гроза',
    99: 'Сильная гроза',
  }

  return map[code] || 'Нет данных'
}

export async function getWeather(): Promise<WeatherInfo> {
  const geoUrl =
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(WEATHER_CITY)}&count=1&language=ru&format=json`

  const geoRes = await fetch(geoUrl)
  if (!geoRes.ok) {
    throw new Error(`Geocoding API returned status ${geoRes.status}`)
  }

  const geoData = (await geoRes.json()) as GeocodingResponse
  const place = geoData.results?.[0]

  if (!place) {
    throw new Error('City not found')
  }

  const forecastUrl =
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,weather_code`

  const forecastRes = await fetch(forecastUrl)
  if (!forecastRes.ok) {
    throw new Error(`Forecast API returned status ${forecastRes.status}`)
  }

  const forecastData = (await forecastRes.json()) as ForecastResponse

  return {
    country: 'UA',
    city: 'Кропивницкий',
    temperature: forecastData.current?.temperature_2m ?? 0,
    description: weatherCodeToDescription(forecastData.current?.weather_code ?? -1),
    updatedAt: new Date().toISOString(),
  }
}