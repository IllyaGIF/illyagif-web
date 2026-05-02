export interface LanyardActivity {
  name: string
  type: number
  details?: string
  state?: string
  sync_id?: string
  timestamps?: {
    start?: number
    end?: number
  }
  assets?: {
    large_image?: string
    large_text?: string
    small_image?: string
    small_text?: string
  }
  flags?: number
}

export interface SpotifyData {
  album: string
  album_art_url: string
  artist: string
  song: string
  track_id: string
  timestamps: {
    start: number
    end: number
  }
}

export interface LanyardResponse {
  success: boolean
  data: {
    discord_status: string
    activities: LanyardActivity[]
    spotify?: SpotifyData | null
  }
}

export interface MusicActivity {
  service: string
  track: string
  artist: string
  album: string
  albumArt: string
  start: number
  end: number
  track_id: string
}

export interface DiscordResponse {
  success: boolean
  status: string
  activities: LanyardActivity[]
  music: MusicActivity | null
}

export interface ActivityEntry {
  name: string
  type: number
  details: string
  state: string
  service: string
  track: string
  artist: string
  album: string
  albumArt: string
}

const DISCORD_USER_ID = '1348261371653128255'
const LANYARD_URL = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`

export function fixImageURL(img?: string): string {
  if (!img) return ''

  if (img.startsWith('spotify:')) {
    const id = img.replace('spotify:', '')
    return `https://i.scdn.co/image/${id}`
  }

  if (img.startsWith('mp:external/')) {
    const httpsIndex = img.indexOf('/https/')
    if (httpsIndex !== -1) {
      return `https://${img.slice(httpsIndex + '/https/'.length).replace(/^\/+/, '')}`
    }

    const httpIndex = img.indexOf('/http/')
    if (httpIndex !== -1) {
      return `http://${img.slice(httpIndex + '/http/'.length).replace(/^\/+/, '')}`
    }

    const rawHttpsIndex = img.indexOf('https://')
    if (rawHttpsIndex !== -1) {
      return img.slice(rawHttpsIndex)
    }

    const rawHttpIndex = img.indexOf('http://')
    if (rawHttpIndex !== -1) {
      return img.slice(rawHttpIndex)
    }
  }

  return img
}

export function normalizeLanyardActivity(resp: LanyardResponse): ActivityEntry {
  if (resp.data.spotify) {
    const sp = resp.data.spotify
    return {
      name: 'Spotify',
      type: 2,
      details: sp.song || '',
      state: sp.artist || '',
      service: 'Spotify',
      track: sp.song || '',
      artist: sp.artist || '',
      album: sp.album || '',
      albumArt: sp.album_art_url || '',
    }
  }

  for (const act of resp.data.activities || []) {
    if (act.name === 'Spotify' || act.name === 'Apple Music') {
      return {
        name: act.name || '',
        type: typeof act.type === 'number' ? act.type : 0,
        details: act.details || '',
        state: act.state || '',
        service: act.name || '',
        track: act.details || '',
        artist: act.state || '',
        album: act.assets?.large_text || '',
        albumArt: fixImageURL(act.assets?.large_image),
      }
    }
  }

  for (const act of resp.data.activities || []) {
    if (!act?.name?.trim()) continue
    if (act.name === 'Spotify' || act.name === 'Apple Music') continue

    return {
      name: act.name || '',
      type: typeof act.type === 'number' ? act.type : 0,
      details: act.details || '',
      state: act.state || '',
      service: '',
      track: '',
      artist: '',
      album: '',
      albumArt: '',
    }
  }

  return {
    name: '',
    type: 0,
    details: '',
    state: '',
    service: '',
    track: '',
    artist: '',
    album: '',
    albumArt: '',
  }
}

export function extractMusic(resp: LanyardResponse): MusicActivity | null {
  if (resp.data.spotify) {
    const sp = resp.data.spotify
    return {
      service: 'Spotify',
      track: sp.song || '',
      artist: sp.artist || '',
      album: sp.album || '',
      albumArt: sp.album_art_url || '',
      start: sp.timestamps?.start || 0,
      end: sp.timestamps?.end || 0,
      track_id: sp.track_id || '',
    }
  }

  for (const act of resp.data.activities || []) {
    if (act.name !== 'Spotify' && act.name !== 'Apple Music') continue

    return {
      service: act.name || '',
      track: act.details || '',
      artist: act.state || '',
      album: act.assets?.large_text || '',
      albumArt: fixImageURL(act.assets?.large_image),
      start: act.timestamps?.start || 0,
      end: act.timestamps?.end || 0,
      track_id: act.sync_id || '',
    }
  }

  return null
}

export async function getDiscordData(): Promise<DiscordResponse> {
  const response = await fetch(LANYARD_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Lanyard returned status ${response.status}`)
  }

  const raw = (await response.json()) as LanyardResponse

  if (!raw.success) {
    throw new Error('Lanyard returned success=false')
  }

  return {
    success: true,
    status: raw.data.discord_status || 'offline',
    activities: raw.data.activities || [],
    music: extractMusic(raw),
  }
}

export async function getCurrentActivity(): Promise<ActivityEntry> {
  const response = await fetch(LANYARD_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Lanyard returned status ${response.status}`)
  }

  const raw = (await response.json()) as LanyardResponse

  if (!raw.success) {
    return {
      name: '',
      type: 0,
      details: '',
      state: '',
      service: '',
      track: '',
      artist: '',
      album: '',
      albumArt: '',
    }
  }

  return normalizeLanyardActivity(raw)
}
