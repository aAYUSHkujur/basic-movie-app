import { Badge } from "@mui/material";
import { img_300, unavailable } from "../../config/config"
import ContentModal from "../ContentModal/ContentModal";
import "./SingleContent.css";
import React from 'react';

const SingleContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average,

}) => {
    return (
        <ContentModal media_type={media_type} id={id}>
          <Badge badgeContent={vote_average} color={vote_average > 6 ? "primary" : "secondary"} />
          <img alt="poster" className="poster" src={poster ? `${img_300}/${poster}` : unavailable} />
          <b className="title">{title}</b>
          <span className="subTitle">
            {media_type === "tv" ? "TV Series" : "Movies"}
            <span className="subTitle">{date}</span>
          </span>
        </ContentModal>
    )
}

export default SingleContent