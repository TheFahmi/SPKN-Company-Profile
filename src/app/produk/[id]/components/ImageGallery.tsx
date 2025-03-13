import React, { useState } from "react";
import {
  Box,
  IconButton,
  Modal,
  Card,
  CardContent,
} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import { ProductDetailIllustration } from "../../../components/illustrations";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  defaultImage?: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images = [],
  productName,
  defaultImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(
    defaultImage || (images.length > 0 ? images[0] : "")
  );
  const [zoomOpen, setZoomOpen] = useState(false);
  
  // Check if we have any images to display
  const hasImages = images.length > 0 || defaultImage;
  
  // Function to navigate to the next image
  const handleNextImage = () => {
    if (images.length <= 1) return;
    
    const currentIndex = images.indexOf(selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
  };
  
  // Function to navigate to the previous image
  const handlePrevImage = () => {
    if (images.length <= 1) return;
    
    const currentIndex = images.indexOf(selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
  };

  if (!hasImages) {
    return (
      <Box sx={{ height: 400, position: "relative", mb: 4 }}>
        <ProductDetailIllustration index={0} />
      </Box>
    );
  }

  return (
    <Card sx={{ mb: 4, borderRadius: 3 }}>
      <CardContent sx={{ p: 4 }}>
        <Box sx={{ position: "relative" }}>
          {/* Main Image Display with Zoom Effect */}
          <Box
            sx={{
              height: 450,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 2,
              bgcolor: "background.paper",
              borderRadius: 2,
              p: 2,
              position: "relative",
              overflow: "hidden",
              boxShadow: "inset 0 0 10px rgba(0,0,0,0.05)",
              "&:hover .zoom-icon": {
                opacity: 1,
              },
              "&:hover img": {
                transform: "scale(1.05)",
              },
            }}
          >
            <img
              src={selectedImage || defaultImage}
              alt={productName}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                transition: "transform 0.3s ease",
              }}
            />
            <Box
              className="zoom-icon"
              onClick={() => setZoomOpen(true)}
              sx={{
                position: "absolute",
                right: 16,
                bottom: 16,
                bgcolor: "rgba(0,0,0,0.6)",
                color: "white",
                borderRadius: "50%",
                width: 40,
                height: 40,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                transition: "opacity 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "primary.main",
                },
              }}
            >
              <ZoomInIcon />
            </Box>
          </Box>

          {/* Zoom Modal */}
          <Modal
            open={zoomOpen}
            onClose={() => setZoomOpen(false)}
            aria-labelledby="image-zoom-modal"
            aria-describedby="zoomed-product-image"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "90%",
                maxWidth: 1000,
                maxHeight: "90vh",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 2,
                outline: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={() => setZoomOpen(false)}
                sx={{
                  position: "absolute",
                  right: 8,
                  top: 8,
                  bgcolor: "rgba(0,0,0,0.1)",
                  "&:hover": {
                    bgcolor: "rgba(0,0,0,0.2)",
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
              <Box
                sx={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "auto",
                }}
              >
                <img
                  src={selectedImage || defaultImage}
                  alt={productName}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80vh",
                    objectFit: "contain",
                  }}
                />
              </Box>
            </Box>
          </Modal>

          {/* Thumbnail Navigation with Arrows */}
          {images.length > 1 && (
            <Box sx={{ position: "relative", mt: 2, mb: 4 }}>
              {/* Left Navigation Arrow */}
              <IconButton
                onClick={handlePrevImage}
                sx={{
                  position: "absolute",
                  left: -20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "background.paper",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  zIndex: 2,
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                }}
                size="small"
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>

              {/* Thumbnails */}
              <Box
                sx={{
                  display: "flex",
                  gap: 2,
                  overflowX: "auto",
                  px: 2,
                  py: 1,
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    display: "none",
                  },
                  mx: 2,
                }}
              >
                {images.map((image, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    sx={{
                      width: 80,
                      height: 80,
                      flexShrink: 0,
                      cursor: "pointer",
                      borderRadius: 2,
                      overflow: "hidden",
                      border:
                        selectedImage === image
                          ? "2px solid"
                          : "2px solid transparent",
                      borderColor:
                        selectedImage === image
                          ? "primary.main"
                          : "transparent",
                      boxShadow:
                        selectedImage === image
                          ? "0 0 0 2px rgba(25, 118, 210, 0.2)"
                          : "none",
                      transition: "all 0.2s ease",
                      position: "relative",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                      },
                      "&:hover::after": {
                        opacity: selectedImage !== image ? 0.3 : 0,
                      },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0,0,0,0)",
                        opacity: 0,
                        transition: "opacity 0.2s ease",
                      },
                    }}
                  >
                    <img
                      src={image}
                      alt={`${productName} ${index + 1}`}
                      style={{
                        height: "100%",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Right Navigation Arrow */}
              <IconButton
                onClick={handleNextImage}
                sx={{
                  position: "absolute",
                  right: -20,
                  top: "50%",
                  transform: "translateY(-50%)",
                  bgcolor: "background.paper",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  zIndex: 2,
                  "&:hover": {
                    bgcolor: "primary.main",
                    color: "white",
                  },
                }}
                size="small"
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ImageGallery;