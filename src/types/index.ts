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
export type CsvOutput = {
  following: boolean
  blocking: boolean
  is_feed_favorite: boolean
  followed_by: boolean
  full_name: string
  is_private: boolean
  username: string
  pk: string
  profile_pic_url: string
  hd_profile_pic_url_info: string
  is_unpublished: boolean
  latest_reel_media: number
  follower_count: number
  is_verified: boolean
  profile_context_links: Array<string>
  address_street: string
  city_name: string
  is_business: boolean
  zip: string
  biography_with_entities: [
    { hashtag: null | any; user: { username: string; id: string } },
  ]
  category: string
  bio_links: Array<{
    link_type: string
    link_url: string
    title: string
    url: string
  }>
  external_lynx_url:string; 
  external_url:string;
  prononuns:Array<string>;
  biography:string; 
  following_count:number; 
  media_count:number; 
  total_clips_count:number; 
  id:string; 
  lts_post: string
  
}

type UserPage = {
  friendship_status: Record<string, any>
  full_name: string
  gating: null | unknown
  is_memorialized: boolean
  is_private: boolean
  has_story_archive: null | unknown
  username: string
  supervision_info: null | unknown
  is_regulated_c18: boolean
  regulated_news_in_locations: any[]
  text_post_app_badge_label: null | unknown
  show_text_post_app_badge: boolean
  eligible_for_text_app_activation_badge: boolean
  hide_text_app_activation_badge_on_text_app: null | unknown
  pk: string
  live_broadcast_visibility: null | unknown
  live_broadcast_id: null | unknown
  profile_pic_url: string
  hd_profile_pic_url_info: Record<string, any>
  is_unpublished: boolean
  latest_reel_media: number
  has_profile_pic: null | unknown
  account_type: number
  follower_count: number
  is_verified: boolean
  mutual_followers_count: number
  profile_context_links_with_user_ids: any[]
  address_street: string
  city_name: string
  is_business: boolean
  zip: string
  biography_with_entities: Record<string, any>
  category: string
  should_show_category: boolean
  account_badges: any[]
  ai_agent_type: null | unknown
  bio_links: any[]
  external_lynx_url: string
  external_url: string
  pronouns: string[]
  biography: string
  transparency_label: null | unknown
  transparency_product: null | unknown
  has_chaining: boolean
  remove_message_entrypoint: boolean
  fbid_v2: string
  interop_messaging_user_fbid: string
  show_account_transparency_details: boolean
  is_embeds_disabled: boolean
  is_professional_account: null | unknown
  following_count: number
  media_count: number
  total_clips_count: number
  latest_besties_reel_media: number
  reel_media_seen_timestamp: null | unknown
  id: string
  lts_post: string
}

type Viewer = {
  user: Record<string, any>
}

export type ApiUSerResponse = {
  data: {
    user: UserPage
    viewer: Viewer
  }
  extensions: Extensions
  status: string
}
