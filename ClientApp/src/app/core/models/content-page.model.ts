export interface ContentPageModel {
  id?: number;
  title: 'Home' | 'AboutUs' | 'Services' | 'ContactUs' | string;
  subTitle?: string;
  description?: string; // HTML content
}
