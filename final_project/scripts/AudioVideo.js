
// video

video = document.createElement('video');
video_image = document.createElement('canvas');
video_image.width = 400;
video_image.height = 226;
video_imageContext = video_image.getContext('2d');
video_imageContext.fillStyle = '#000000';
video_imageContext.fillRect(0, 0, video_image.width, video_image.height);
video_texture = new THREE.Texture(video_image);
video_texture.minFilter = THREE.LinearFilter;
video_texture.magFilter = THREE.LinearFilter;
video_texture.format = THREE.RGBFormat;
video_texture.generateMipmaps = false;