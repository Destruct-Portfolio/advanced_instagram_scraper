export interface IConfigService {
  get(key: string): string
}

export interface ScrapperInterface {
  navigate(url: string): Promise<void>
  exists(selector: string): Promise<boolean>
  restart(): Promise<void>
}

type ExtenralLink = {
  url: string
}

export type ExportedUser = {
  username: string | null
  location: string | null
  country: string | null
  recent_post: string | null
  following_count: number
  follower_acount: number
  bioLinks: Array<ExtenralLink>
  websitelinks: Array<string>
  bio: string | string
}

interface Hashtag {
  // Define the structure of each hashtag object here
}

interface Place {
  // Define the structure of each place object here
}

export interface TopSearchConnection {
  see_more: null
  inform_module: null
  hashtags: Hashtag[]
  places: Place[]
  users: User[]
  rank_token: string
}

interface Data {
  xdt_api__v1__fbsearch__topsearch_connection: TopSearchConnection
}

interface Extensions {
  is_final: boolean
}

export interface ApiResponse {
  data: Data
  extensions: Extensions
}

export interface Userd {
  username: string
  is_verified: boolean
  full_name: string
  search_social_context: any // Adjust this type if you know what it should be
  unseen_count: any // Adjust this type if you know what it should be
  pk: string
  live_broadcast_visibility: any // Adjust this type if you know what it should be
  live_broadcast_id: any // Adjust this type if you know what it should be
  profile_pic_url: string
  hd_profile_pic_url_info: any // Adjust this type if you know what it should be
  is_unpublished: any // Adjust this type if you know what it should be
  id: any // Adjust this type if you know what it should be
}

export interface User {
  position: number
  user: Userd
}

export interface QueryParams {
  av: string
  __d: string
  __user: string
  __a: string
  __req: string
  __hs: string
  dpr: string
  __ccg: string
  __rev: string
  __s: string
  __hsi: string
  __dyn: string
  __csr: string
  __comet_req: string
  fb_dtsg: string
  jazoest: string
  lsd: string
  __spin_r: string
  __spin_b: string
  __spin_t: string
  fb_api_caller_class: string
  fb_api_req_friendly_name: string
  variables: string
  server_timestamps: string
  doc_id: string
}
interface Variables {
  id: string
  render_surface: string
}

export interface RequestDataUserPage {
  av: string
  __d: string
  __user: string
  __a: string
  __req: string
  __hs: string
  dpr: string
  __ccg: string
  __rev: string
  __s: string
  __hsi: string
  __dyn: string
  __csr: string
  __comet_req: string
  fb_dtsg: string
  jazoest: string
  lsd: string
  __spin_r: string
  __spin_b: string
  __spin_t: string
  fb_api_caller_class: string
  fb_api_req_friendly_name: string
  variables: Variables
  server_timestamps: string
  doc_id: string
}
