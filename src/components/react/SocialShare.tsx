import React from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

interface Props {
  url: string;
  title: string;
}

const SocialShare = ({ url, title }: Props) => {
  return (
    <div>
      <div className="flex items-center justify-center gap-4">
        <div className="">
          <FacebookShareButton url={url} title={title}>
            <FacebookIcon size={32} round={true} />
          </FacebookShareButton>
        </div>
        <div className="">
          <TwitterShareButton url={url} title={title}>
            <TwitterIcon size={32} round={true} />
          </TwitterShareButton>
        </div>
        <div className="">
          <TelegramShareButton url={url} title={title}>
            <TelegramIcon size={32} round={true} />
          </TelegramShareButton>
        </div>
        <div className="">
          <PocketShareButton url={url} title={title}>
            <PocketIcon size={32} round={true} />
          </PocketShareButton>
        </div>
        <div className="">
          <RedditShareButton url={url} title={title}>
            <RedditIcon size={32} round={true} />
          </RedditShareButton>
        </div>
        <div className="">
          <WhatsappShareButton url={url} title={title}>
            <WhatsappIcon size={32} round={true} />
          </WhatsappShareButton>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
