import { Footer, FooterDefinition } from "./definitions/Footer";
import { Navigation, NavigationDefinition } from "./definitions/Navigation";
import { HomePage, HomePageDefinition } from "./definitions/HomePage";
import { CVPage, CVPageDefinition } from "./definitions/CVPage";
import { PortfolioPage, PortfolioPageDefinition } from "./definitions/PortfolioPage";
import { BlogPost, BlogPostDefinition } from "./definitions/BlogPost";
import { GalleryPost, GalleryPostDefinition } from "./definitions/GalleryPost";
import { BlogPage, BlogPageDefinition } from "./definitions/BlogPage";
import { MediaPage, MediaPageDefinition } from "./definitions/MediaPage";
import { AboutPage, AboutPageDefinition } from "./definitions/AboutPage";

export type ContentTypeMapping = SingleContentTypeMapping | RepeatableContentTypeMapping;

export interface SingleContentTypeMapping {
  footer: Footer;
  navigation: Navigation;
  home_page: HomePage;
  cv_page: CVPage;
  portfolio_page: PortfolioPage;
  blog_page: BlogPage;
  media_page: MediaPage;
  about_page: AboutPage;
}

export interface RepeatableContentTypeMapping {
  post: BlogPost;
  gallery_post: GalleryPost;
}

export const ContentTypeDefinitions = [
  FooterDefinition,
  NavigationDefinition,
  HomePageDefinition,
  CVPageDefinition,
  PortfolioPageDefinition,
  BlogPostDefinition,
  GalleryPostDefinition,
  BlogPageDefinition,
  MediaPageDefinition,
  AboutPageDefinition,
];
