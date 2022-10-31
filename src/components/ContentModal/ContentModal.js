import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import axios from 'axios';
import {  useEffect , useState } from "react";
import { img_500, unavailable, unavailableLandscape } from '../../config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import "./ContentModal.css";



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "90%",
  height: "80%",
  bgcolor: "#39445a",
  border: "1px solid #282c34",
  borderRadius: 10,
  color: "white",
  boxShadow: 5,
  pt: 1,
  px: 1,
  pb: 3,
};

export default function ContentModal({ children, media_type, id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();

  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

      setContent(data);
  };

  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`);

     
      setVideo(data.results[0]?.key);
  };

  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
}, []);

  return (
    <>
      <div className="media" onClick={handleOpen}>{children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {content && (
              
              <div className="ContentModal">
                <img alt={content.name || content.title}
                     className="ContentModal_portrait"
                     src={ content.poster_path ? `${img_500}/${content.poster_path}` : unavailable } 
                />

                <img alt={content.name || content.title}
                     className="ContentModal_landscape"
                     src={ content.backdrop_path ? `${img_500}/${content.backdrop_path}` : unavailableLandscape } 
                />

              <div className="ContentModal_about">
                <span className="ContentModal_title">
                  {content.name || content.title} (
                  {(
                    content.first_air_date ||
                    content.release_date ||
                    "-----"
                  ).substring(0, 4)}
                  )
                 </span>
                 {content.tagline &&(
                  <i className="tagline">{content.tagline}</i>
                 )}
                 <span className="ContentModal_description">
                  {content.overview}
                 </span>
                 <div></div>
                 <Button 
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__black"
                    href={`https://www.youtube.com/watch?v=${video}`}
                    >
                  Watch the Trailer
                  </Button>
              </div>
             </div>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  );
};