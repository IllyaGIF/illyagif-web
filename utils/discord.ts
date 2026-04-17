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
  elapsed?: number
  duration?: number
  remaining?: number
  isPlaying?: boolean
  device?: string
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

export interface IPodApiResponse {
  success: boolean
  updatedAt?: number | null
  music: {
    device: string
    service: string
    track: string
    artist: string
    album: string
    albumArt: string
    elapsed: number
    duration: number
    remaining: number
    start: number
    end: number
    isPlaying: boolean
    track_id: string
  } | null
}

const DISCORD_USER_ID = '1348261371653128255'
const LANYARD_URL = `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`
const IPOD_API_URL = 'https://ipod-api.gta-emulator-x.workers.dev/api/ipod-presence'

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

export function normalizeIPodActivity(music: MusicActivity): ActivityEntry {
  return {
    name: music.service || 'iPod',
    type: 2,
    details: music.track || '',
    state: music.artist || '',
    service: music.service || 'iPod',
    track: music.track || '',
    artist: music.artist || '',
    album: music.album || '',
    albumArt: music.albumArt || '',
  }
}

export async function getIPodMusic(): Promise<MusicActivity | null> {
  const response = await fetch(IPOD_API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`iPod API returned status ${response.status}`)
  }

  const raw = (await response.json()) as IPodApiResponse

  if (!raw.success || !raw.music) {
    return null
  }

  return {
    service: raw.music.service || 'iPod',
    track: raw.music.track || '',
    artist: raw.music.artist || '',
    album: raw.music.album || '',
    albumArt: raw.music.albumArt || '',
    start: raw.music.start || 0,
    end: raw.music.end || 0,
    track_id: raw.music.track_id || '',
    elapsed: raw.music.elapsed || 0,
    duration: raw.music.duration || 0,
    remaining: raw.music.remaining || 0,
    isPlaying: !!raw.music.isPlaying,
    device: raw.music.device || 'iPod touch 3.1.3',
  }
}

export async function getDiscordData(): Promise<DiscordResponse> {
  const response = await fetch(LANYARD_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Lanyard returned status ${response.status}`)
  }

  const raw = (await response.json()) as LanyardResponse

  if (!raw.success) {
    throw new Error('Lanyard returned success=false')
  }

  const lanyardMusic = extractMusic(raw)

  if (lanyardMusic) {
    return {
      success: true,
      status: raw.data.discord_status || 'offline',
      activities: raw.data.activities || [],
      music: lanyardMusic,
    }
  }

  try {
    const ipodMusic = await getIPodMusic()

    if (ipodMusic) {
      return {
        success: true,
        status: ipodMusic.isPlaying ? 'online' : 'idle',
        activities: [
          {
            name: ipodMusic.service || 'iPod',
            type: 2,
            details: ipodMusic.track || '',
            state: ipodMusic.artist || '',
            sync_id: ipodMusic.track_id || '',
            timestamps: {
              start: ipodMusic.start || 0,
              end: ipodMusic.end || 0,
            },
            assets: {
              large_image: ipodMusic.albumArt || '',
              large_text: ipodMusic.album || '',
            },
          },
        ],
        music: ipodMusic,
      }
    }
  } catch {
    // ignore iPod API errors
  }

  return {
    success: true,
    status: raw.data.discord_status || 'offline',
    activities: raw.data.activities || [],
    music: null,
  }
}

export async function getCurrentActivity(): Promise<ActivityEntry> {
  const response = await fetch(LANYARD_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  })

  if (!response.ok) {
    throw new Error(`Lanyard returned status ${response.status}`)
  }

  const raw = (await response.json()) as LanyardResponse

  if (raw.success) {
    if (raw.data.spotify) {
      return normalizeLanyardActivity(raw)
    }

    for (const act of raw.data.activities || []) {
      if (act.name === 'Spotify' || act.name === 'Apple Music') {
        return normalizeLanyardActivity(raw)
      }
    }
  }

  try {
    const ipodMusic = await getIPodMusic()
    if (ipodMusic) {
      return normalizeIPodActivity(ipodMusic)
    }
  } catch {
    // ignore iPod API errors
  }

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

export function formatSeconds(sec?: number): string {
  const s = Math.max(0, Math.floor(sec || 0))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}
