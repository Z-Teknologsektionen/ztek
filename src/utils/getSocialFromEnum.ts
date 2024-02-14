import type { IconEnum } from "@prisma/client";
import type { IconType } from "react-icons";
import {
  FaCamera,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaQuestionCircle,
  FaSpotify,
  FaTiktok,
  FaTwitch,
  FaYoutube,
} from "react-icons/fa";
import { FaHouse, FaLink, FaThreads, FaXTwitter } from "react-icons/fa6";

export const getSocialIconFromEnum = (type: IconEnum): IconType => {
  switch (type) {
    case "FACEBOOK":
      return FaFacebook;
    case "XTWITTER":
      return FaXTwitter;
    case "INSTAGRAM":
      return FaInstagram;
    case "TIKTOK":
      return FaTiktok;
    case "LINKEDIN":
      return FaLinkedin;
    case "YOUTUBE":
      return FaYoutube;
    case "SPOTIFY":
      return FaSpotify;
    case "TWITCH":
      return FaTwitch;
    case "MAIL":
      return FaEnvelope;
    case "LINK":
      return FaLink;
    case "THREADS":
      return FaThreads;
    case "CAMERA":
      return FaCamera;
    case "QUESTIONMARK":
      return FaQuestionCircle;
    case "HOME":
      return FaHouse;
  }
};

export const getSocialNameFromEnum = (type: IconEnum): string => {
  switch (type) {
    case "FACEBOOK":
      return "Facebook";
    case "XTWITTER":
      return "X (Twitter)";
    case "INSTAGRAM":
      return "Instagram";
    case "TIKTOK":
      return "Tiktok";
    case "LINKEDIN":
      return "Linkedin";
    case "YOUTUBE":
      return "Youtube";
    case "SPOTIFY":
      return "Spotify";
    case "TWITCH":
      return "Twitch";
    case "MAIL":
      return "Epost";
    case "LINK":
      return "Länk";
    case "THREADS":
      return "Threads";
    case "CAMERA":
      return "Bilder";
    case "QUESTIONMARK":
      return "Frågetecken";
    case "HOME":
      return "Hem";
  }
};
