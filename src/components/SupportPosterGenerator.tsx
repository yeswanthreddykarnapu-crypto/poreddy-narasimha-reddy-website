import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Camera,
  Upload,
  Download,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  CheckCircle2,
  AlertCircle,
  X,
  Sparkles,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import type { TranslationData } from '../data/translations';

interface SupportPosterGeneratorProps {
  t: TranslationData;
  lang: 'en' | 'te';
}

// Target export canvas dimensions (exact 1080x1080 square)
const CANVAS_SIZE = 1080;
const CIRCLE_CENTER_X = 540;
const CIRCLE_CENTER_Y = 485;
const CIRCLE_RADIUS = 265; // Diameter = 530px

export const SupportPosterGenerator: React.FC<SupportPosterGeneratorProps> = ({ lang }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // User uploaded photo state
  const [userImage, setUserImage] = useState<HTMLImageElement | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const initialPanRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Camera modal state
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null);
  const [cameraFacing, setCameraFacing] = useState<'user' | 'environment'>('user');

  // Status & Notification state
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // Pre-loaded campaign assets for canvas rendering
  const fanLogoRef = useRef<HTMLImageElement | null>(null);
  const candidatePhotoRef = useRef<HTMLImageElement | null>(null);

  // Pre-load assets
  useEffect(() => {
    const fanImg = new Image();
    fanImg.crossOrigin = 'anonymous';
    fanImg.src = '/images/ysrcp-fan-symbol.png';
    fanImg.onload = () => {
      fanLogoRef.current = fanImg;
      drawCanvas();
    };

    const candImg = new Image();
    candImg.crossOrigin = 'anonymous';
    candImg.src = '/images/poreddy-narasimha-reddy-namaste.jpg';
    candImg.onload = () => {
      candidatePhotoRef.current = candImg;
      drawCanvas();
    };
  }, []);

  // Calculate base scale to fill the circular frame completely
  const getBaseScale = useCallback((img: HTMLImageElement) => {
    const diameter = CIRCLE_RADIUS * 2;
    return Math.max(diameter / img.width, diameter / img.height);
  }, []);

  // Main Canvas Rendering Function (WYSIWYG 1080x1080)
  const drawCanvas = useCallback(
    (isExportMode = false) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Clear Canvas
      ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // 2. Background: Deep Navy Campaign Gradient (#091e42 to #0f2a5a)
      const bgGrad = ctx.createLinearGradient(0, 0, 0, CANVAS_SIZE);
      bgGrad.addColorStop(0, '#091e42');
      bgGrad.addColorStop(0.3, '#0b2450');
      bgGrad.addColorStop(0.7, '#0f2a5a');
      bgGrad.addColorStop(1, '#07162e');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // 2b. Subtle Ambient Radial Lights (Navy Blue + Emerald Glow)
      const radialGlow = ctx.createRadialGradient(
        CIRCLE_CENTER_X,
        CIRCLE_CENTER_Y,
        50,
        CIRCLE_CENTER_X,
        CIRCLE_CENTER_Y,
        520
      );
      radialGlow.addColorStop(0, 'rgba(26, 122, 74, 0.22)');
      radialGlow.addColorStop(0.5, 'rgba(47, 91, 183, 0.15)');
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // 3. Top & Bottom YSRCP Tricolor Stripes (12px each)
      const drawTricolorStripe = (y: number, height: number) => {
        const stripeGrad = ctx.createLinearGradient(0, 0, CANVAS_SIZE, 0);
        stripeGrad.addColorStop(0, '#2f5bb7');
        stripeGrad.addColorStop(0.333, '#2f5bb7');
        stripeGrad.addColorStop(0.333, '#ffffff');
        stripeGrad.addColorStop(0.666, '#ffffff');
        stripeGrad.addColorStop(0.666, '#1a7a4a');
        stripeGrad.addColorStop(1, '#1a7a4a');
        ctx.fillStyle = stripeGrad;
        ctx.fillRect(0, y, CANVAS_SIZE, height);
      };
      drawTricolorStripe(0, 14);
      drawTricolorStripe(CANVAS_SIZE - 14, 14);

      // 4. Top Header Content (Safe Area 14px to 190px)
      // Top Organization Bar
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Party Badge Pill
      const pillWidth = 520;
      const pillHeight = 36;
      const pillX = CIRCLE_CENTER_X - pillWidth / 2;
      const pillY = 32;

      ctx.save();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.strokeStyle = 'rgba(52, 211, 153, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(pillX, pillY, pillWidth, pillHeight, 18);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#34d399';
      ctx.font = '700 16px "Noto Sans Telugu", Poppins, sans-serif';
      ctx.fillText(
        'వైఎస్సార్ కాంగ్రెస్ పార్టీ • ప్రొద్దుటూరు',
        CIRCLE_CENTER_X,
        pillY + pillHeight / 2 + 1
      );
      ctx.restore();

      // Main Upper Campaign Slogan: "VOTE FOR CHANGE"
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 3;
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 46px Poppins, "Noto Sans Telugu", sans-serif';
      ctx.letterSpacing = '3px';
      ctx.fillText('VOTE FOR CHANGE', CIRCLE_CENTER_X, 106);
      ctx.restore();

      // Upper Telugu Motto: "మన ప్రొద్దుటూరు — మన బాధ్యత"
      ctx.save();
      ctx.fillStyle = '#34d399';
      ctx.font = '800 24px "Noto Sans Telugu", Poppins, sans-serif';
      ctx.fillText('మన ప్రొద్దుటూరు — మన బాధ్యత', CIRCLE_CENTER_X, 152);
      ctx.restore();

      // 5. Circular Photo Frame & Image Clipping Layer
      // Circular Opening at (CIRCLE_CENTER_X, CIRCLE_CENTER_Y), radius CIRCLE_RADIUS

      // Outer glow of the frame
      ctx.save();
      ctx.beginPath();
      ctx.arc(CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS + 16, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(26, 122, 74, 0.25)';
      ctx.fill();
      ctx.restore();

      // Clip visitor photo inside genuine circular opening
      ctx.save();
      ctx.beginPath();
      ctx.arc(CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS, 0, Math.PI * 2);
      ctx.clip();

      if (userImage) {
        // Draw user photo transformed by baseScale * zoom and pan offset
        const baseScale = getBaseScale(userImage);
        const currentScale = baseScale * zoom;
        const drawWidth = userImage.width * currentScale;
        const drawHeight = userImage.height * currentScale;
        const drawX = CIRCLE_CENTER_X - drawWidth / 2 + pan.x;
        const drawY = CIRCLE_CENTER_Y - drawHeight / 2 + pan.y;

        ctx.drawImage(userImage, drawX, drawY, drawWidth, drawHeight);
      } else if (!isExportMode) {
        // Interactive Placeholder inside circle (ONLY in preview mode, NEVER in exported poster)
        ctx.fillStyle = 'rgba(15, 42, 90, 0.85)';
        ctx.fillRect(
          CIRCLE_CENTER_X - CIRCLE_RADIUS,
          CIRCLE_CENTER_Y - CIRCLE_RADIUS,
          CIRCLE_RADIUS * 2,
          CIRCLE_RADIUS * 2
        );

        // Circular dash guide
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.6)';
        ctx.lineWidth = 3;
        ctx.setLineDash([12, 10]);
        ctx.beginPath();
        ctx.arc(CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS - 20, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Camera Icon symbol drawn cleanly
        ctx.fillStyle = '#34d399';
        const iconY = CIRCLE_CENTER_Y - 40;
        // Camera body
        ctx.beginPath();
        ctx.roundRect(CIRCLE_CENTER_X - 44, iconY - 26, 88, 62, 12);
        ctx.fill();
        // Camera top flash bump
        ctx.beginPath();
        ctx.roundRect(CIRCLE_CENTER_X - 20, iconY - 40, 40, 18, 5);
        ctx.fill();
        // Camera lens cutout
        ctx.fillStyle = '#0f2a5a';
        ctx.beginPath();
        ctx.arc(CIRCLE_CENTER_X, iconY + 5, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.arc(CIRCLE_CENTER_X, iconY + 5, 12, 0, Math.PI * 2);
        ctx.fill();

        // Placeholder Text
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 24px "Noto Sans Telugu", Poppins, sans-serif';
        ctx.fillText('మీ ఫొటోను ఇక్కడ జోడించండి', CIRCLE_CENTER_X, CIRCLE_CENTER_Y + 50);

        ctx.fillStyle = '#94b5f0';
        ctx.font = '500 16px Poppins, sans-serif';
        ctx.fillText('Click to Upload / Take Photo', CIRCLE_CENTER_X, CIRCLE_CENTER_Y + 84);
      }
      ctx.restore();

      // 6. Draw Layered Circular Border Rings OVER the photo
      // Outer Emerald Ring (14px)
      ctx.save();
      ctx.beginPath();
      ctx.arc(CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS + 7, 0, Math.PI * 2);
      ctx.strokeStyle = '#1a7a4a';
      ctx.lineWidth = 14;
      ctx.stroke();

      // Bright Green Highlight Ring (4px)
      ctx.beginPath();
      ctx.arc(CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS + 14, 0, Math.PI * 2);
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Crisp White Inner Ring (6px)
      ctx.beginPath();
      ctx.arc(CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS, 0, Math.PI * 2);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.restore();

      // 7. Decorative Badges Overlapping Frame
      // A. Candidate Portrait Stamp (Top-Left of frame)
      if (candidatePhotoRef.current) {
        const badgeX = CIRCLE_CENTER_X - CIRCLE_RADIUS + 15;
        const badgeY = CIRCLE_CENTER_Y - CIRCLE_RADIUS + 25;
        const badgeR = 64;

        ctx.save();
        // Glow
        ctx.beginPath();
        ctx.arc(badgeX, badgeY, badgeR + 5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(52, 211, 153, 0.4)';
        ctx.fill();

        // White border
        ctx.beginPath();
        ctx.arc(badgeX, badgeY, badgeR, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.strokeStyle = '#1a7a4a';
        ctx.lineWidth = 4;
        ctx.stroke();

        // Candidate photo clipped
        ctx.beginPath();
        ctx.arc(badgeX, badgeY, badgeR - 4, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(
          candidatePhotoRef.current,
          badgeX - badgeR + 4,
          badgeY - badgeR + 4,
          (badgeR - 4) * 2,
          (badgeR - 4) * 2
        );
        ctx.restore();

        // Mini banner ribbon on candidate badge
        ctx.save();
        ctx.fillStyle = '#0f2a5a';
        ctx.strokeStyle = '#34d399';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(badgeX - 60, badgeY + badgeR - 16, 120, 24, 12);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#34d399';
        ctx.font = '800 11px "Noto Sans Telugu", Poppins, sans-serif';
        ctx.fillText('నరసింహారెడ్డి', badgeX, badgeY + badgeR - 3);
        ctx.restore();
      }

      // B. Official YSRCP Fan Symbol Emblem Badge (Bottom-Right of frame)
      const fanBadgeX = CIRCLE_CENTER_X + CIRCLE_RADIUS - 20;
      const fanBadgeY = CIRCLE_CENTER_Y + CIRCLE_RADIUS - 30;
      const fanBadgeR = 68;

      ctx.save();
      // Glow
      ctx.beginPath();
      ctx.arc(fanBadgeX, fanBadgeY, fanBadgeR + 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(26, 122, 74, 0.4)';
      ctx.fill();

      // White circle background
      ctx.beginPath();
      ctx.arc(fanBadgeX, fanBadgeY, fanBadgeR, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 4;
      ctx.stroke();

      // Fan Logo
      if (fanLogoRef.current) {
        ctx.drawImage(
          fanLogoRef.current,
          fanBadgeX - 44,
          fanBadgeY - 48,
          88,
          68
        );
      }

      // Text underneath fan symbol
      ctx.fillStyle = '#0f2a5a';
      ctx.font = '900 13px Poppins, sans-serif';
      ctx.fillText('YSRCP', fanBadgeX, fanBadgeY + 28);
      ctx.fillStyle = '#1a7a4a';
      ctx.font = '800 13px "Noto Sans Telugu", sans-serif';
      ctx.fillText('ఫ్యాన్ గుర్తు', fanBadgeX, fanBadgeY + 44);
      ctx.restore();

      // 8. Lower Campaign Text & Candidate Branding (780px to 1060px)
      // Primary Call to Action: "VOTE FOR POREDDY NARASIMHA REDDY"
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetY = 4;
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 44px Poppins, "Noto Sans Telugu", sans-serif';
      ctx.letterSpacing = '1px';
      ctx.fillText('VOTE FOR POREDDY NARASIMHA REDDY', CIRCLE_CENTER_X, 820);
      ctx.restore();

      // Telugu Candidate Full Name
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#34d399';
      ctx.font = '900 40px "Noto Sans Telugu", Poppins, sans-serif';
      ctx.fillText('శ్రీ పోరెడ్డి నరసింహారెడ్డి', CIRCLE_CENTER_X, 880);
      ctx.restore();

      // Official Candidate Designation
      ctx.save();
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '700 24px "Noto Sans Telugu", Poppins, sans-serif';
      ctx.fillText(
        'ప్రొద్దుటూరు మున్సిపల్ చైర్పర్సన్ అభ్యర్థి',
        CIRCLE_CENTER_X,
        930
      );
      ctx.restore();

      // Supporter declaration pill
      ctx.save();
      const supportWidth = 460;
      const supportHeight = 38;
      const supportX = CIRCLE_CENTER_X - supportWidth / 2;
      const supportY = 964;

      ctx.fillStyle = 'rgba(26, 122, 74, 0.35)';
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.roundRect(supportX, supportY, supportWidth, supportHeight, 19);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = '700 17px "Noto Sans Telugu", Poppins, sans-serif';
      ctx.fillText(
        '★ మార్పు కోసం పోరెడ్డి గారికి నా మద్దతు ★',
        CIRCLE_CENTER_X,
        supportY + supportHeight / 2 + 1
      );
      ctx.restore();

      // Official Website Domain Footer
      ctx.save();
      ctx.fillStyle = '#94b5f0';
      ctx.font = '600 16px Poppins, sans-serif';
      ctx.fillText('voteforporeddynarasimhareddy.com', CIRCLE_CENTER_X, 1030);
      ctx.restore();
    },
    [userImage, zoom, pan, getBaseScale]
  );

  // Redraw canvas whenever userImage, zoom, or pan updates
  useEffect(() => {
    drawCanvas(false);
  }, [drawCanvas]);

  // Handle Photo File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage(
        lang === 'te'
          ? 'దయచేసి JPEG, PNG లేదా WebP ఫొటోను మాత్రమే ఎంచుకోండి.'
          : 'Please select a JPEG, PNG, or WebP image.'
      );
      return;
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage(
        lang === 'te'
          ? 'ఫైల్ పరిమాణం చాలా పెద్దదిగా ఉంది. దయచేసి 15MB లోపు ఫొటోను ఎంచుకోండి.'
          : 'File size exceeds 15MB limit. Please choose a smaller image.'
      );
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setUserImage(img);
        setZoom(1);
        setPan({ x: 0, y: 0 });
        setSuccessMessage(
          lang === 'te'
            ? 'ఫొటో విజయవంతంగా జోడించబడింది! అవసరమైతే సర్దుబాటు చేయండి.'
            : 'Photo added successfully! Adjust position and zoom if desired.'
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);

    // Reset input so re-selecting same file triggers change
    e.target.value = '';
  };

  // Drag handlers for mouse and touch repositioning
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!userImage) {
      fileInputRef.current?.click();
      return;
    }
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    initialPanRef.current = { ...pan };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !userImage) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scaleFactor = CANVAS_SIZE / canvas.clientWidth;
    const deltaX = (e.clientX - dragStartRef.current.x) * scaleFactor;
    const deltaY = (e.clientY - dragStartRef.current.y) * scaleFactor;

    setPan({
      x: initialPanRef.current.x + deltaX,
      y: initialPanRef.current.y + deltaY,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!userImage) {
      fileInputRef.current?.click();
      return;
    }
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      initialPanRef.current = { ...pan };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging || !userImage || e.touches.length !== 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scaleFactor = CANVAS_SIZE / canvas.clientWidth;
    const deltaX = (e.touches[0].clientX - dragStartRef.current.x) * scaleFactor;
    const deltaY = (e.touches[0].clientY - dragStartRef.current.y) * scaleFactor;

    setPan({
      x: initialPanRef.current.x + deltaX,
      y: initialPanRef.current.y + deltaY,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Reset Photo Position and Zoom
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  // Camera Management
  const startCamera = async (facing: 'user' | 'environment' = 'user') => {
    setErrorMessage(null);

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMessage(
        lang === 'te'
          ? 'మీ బ్రౌజర్‌లో కెమెరా సదుపాయం అందుబాటులో లేదు. దయచేసి ఫొటో అప్‌లోడ్ ఆప్షన్‌ను ఉపయోగించండి.'
          : 'Camera access is not supported by your browser. Please use photo upload.'
      );
      fileInputRef.current?.click();
      return;
    }

    try {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facing,
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      });

      setCameraStream(stream);
      setCameraFacing(facing);
      setIsCameraOpen(true);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error('Camera error:', err);
      setErrorMessage(
        lang === 'te'
          ? 'కెమెరా అనుమతి లభించలేదు. దయచేసి బ్రౌజర్ సెట్టింగ్స్‌లో కెమెరాను అనుమతించండి లేదా ఫొటో అప్‌లోడ్ చేయండి.'
          : 'Camera access denied or unavailable. Please enable permissions or upload a file.'
      );
      setIsCameraOpen(false);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
    setIsCameraOpen(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;

    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = video.videoWidth || 640;
    tempCanvas.height = video.videoHeight || 480;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    // Flip horizontally if front camera for natural mirror feeling
    if (cameraFacing === 'user') {
      ctx.translate(tempCanvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
    const dataUrl = tempCanvas.toDataURL('image/jpeg', 0.95);

    const img = new Image();
    img.onload = () => {
      setUserImage(img);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      stopCamera();
      setSuccessMessage(
        lang === 'te'
          ? 'కెమెరాతో ఫొటో విజయవంతంగా తీయబడింది!'
          : 'Photo captured successfully!'
      );
    };
    img.src = dataUrl;
  };

  const toggleCameraFacing = () => {
    const nextFacing = cameraFacing === 'user' ? 'environment' : 'user';
    startCamera(nextFacing);
  };

  // High-Resolution 1080x1080 Export & Download
  const handleDownload = async () => {
    if (!userImage) return;

    setIsExporting(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      // Ensure canvas is drawn in export mode (clean without any editor placeholder)
      drawCanvas(true);

      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Canvas not found');

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png', 1.0)
      );

      if (!blob) throw new Error('Could not generate image blob');

      const filename = 'Vote-for-Poreddy-My-Support-Poster.png';
      const file = new File([blob], filename, { type: 'image/png' });

      // If mobile supports Web Share API with files, allow direct sharing to WhatsApp/Instagram
      if (
        navigator.canShare &&
        navigator.canShare({ files: [file] }) &&
        /Mobi|Android|iPhone/i.test(navigator.userAgent)
      ) {
        try {
          await navigator.share({
            files: [file],
            title: 'Vote for Poreddy Narasimha Reddy',
            text: 'మార్పు కోసం పోరెడ్డి నరసింహారెడ్డి గారికి నా మద్దతు! Vote for Change - Vote for Poreddy Narasimha Reddy.',
          });
          setSuccessMessage(
            lang === 'te'
              ? 'పోస్టర్ షేర్ చేయడానికి సిద్ధంగా ఉంది!'
              : 'Poster shared successfully!'
          );
          setIsExporting(false);
          // Restore canvas for preview
          drawCanvas(false);
          return;
        } catch (shareErr) {
          // If user cancels share sheet, fall back to standard download
          console.log('Share dismissed, triggering file download');
        }
      }

      // Standard Download Fallback
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = filename;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(url);

      setSuccessMessage(
        lang === 'te'
          ? 'మీ పోస్టర్ విజయవంతంగా డౌన్‌లోడ్ చేయబడింది! మీ వాట్సాప్ స్టేటస్‌లో షేర్ చేయండి.'
          : 'Your poster has been downloaded! Share it on WhatsApp Status and Social Media.'
      );
    } catch (err) {
      console.error('Export error:', err);
      setErrorMessage(
        lang === 'te'
          ? 'పోస్టర్ డౌన్‌లోడ్ చేయడంలో సమస్య ఏర్పడింది. దయచేసి మళ్లీ ప్రయత్నించండి.'
          : 'Failed to download poster. Please try again.'
      );
    } finally {
      setIsExporting(false);
      // Restore canvas preview
      drawCanvas(false);
    }
  };

  return (
    <section
      id="support-poster"
      className="py-14 sm:py-20 bg-gradient-to-b from-warmBg via-white to-warmBg border-b border-slate-200/70 relative overflow-hidden"
    >
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      {/* Decorative ambient background glows */}
      <div
        className="absolute top-10 left-10 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400 text-emerald-800 text-xs sm:text-sm font-extrabold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>{lang === 'te' ? 'మార్పు కోసం మనమంతా' : 'UNITED FOR CHANGE'}</span>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-navy tracking-tight mb-3">
            {lang === 'te' ? 'మీ ఫొటోతో మీ మద్దతు తెలపండి' : 'Show Your Support with Your Photo'}
          </h2>

          {/* Description */}
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl mx-auto">
            {lang === 'te'
              ? 'మీ ఫొటోను జోడించి, పోరెడ్డి నరసింహారెడ్డికి మద్దతుగా మీ ప్రత్యేక పోస్టర్ను రూపొందించండి. డౌన్లోడ్ చేసుకుని మీ వాట్సాప్ స్టేటస్లో, సోషల్ మీడియాలో షేర్ చేయండి.'
              : 'Add your photo and create your personalized campaign poster for Poreddy Narasimha Reddy. Download and share on your WhatsApp status and social media.'}
          </p>

          {/* 3 Simple Steps */}
          <div className="inline-flex flex-wrap items-center justify-center gap-2 mt-4 px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-navy shadow-subtle">
            <span>
              {lang === 'te'
                ? 'ఫొటో జోడించండి → సర్దుబాటు చేయండి → డౌన్లోడ్ చేసుకోండి'
                : '1. Add Photo → 2. Adjust & Crop → 3. Download Poster'}
            </span>
          </div>
        </div>

        {/* Responsive Layout: 2-Column on Desktop, 1-Column on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Column 1: Live Interactive Canvas Poster Preview */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="relative w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900/10 bg-slate-900 group">
              
              {/* The Master Canvas Element (1080x1080) rendered responsively */}
              <canvas
                ref={canvasRef}
                width={CANVAS_SIZE}
                height={CANVAS_SIZE}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="w-full h-full object-contain cursor-grab active:cursor-grabbing select-none"
                style={{ touchAction: 'none' }}
                title={
                  userImage
                    ? lang === 'te'
                      ? 'ఫొటోను జరపడానికి డ్రాగ్ చేయండి'
                      : 'Drag to reposition photo'
                    : lang === 'te'
                    ? 'ఫొటోను జోడించడానికి క్లిక్ చేయండి'
                    : 'Click to add photo'
                }
              />

              {/* Drag indicator pill floating on top of canvas when photo is loaded */}
              {userImage && (
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full pointer-events-none flex items-center gap-1.5 border border-white/20">
                  <Move className="w-3 h-3 text-emerald-400" />
                  <span>{lang === 'te' ? 'డ్రాగ్ చేయండి' : 'Drag to Move'}</span>
                </div>
              )}

            </div>

            {/* Canvas Subtitle Hint */}
            <p className="text-xs text-slate-500 mt-3 text-center">
              {userImage
                ? lang === 'te'
                  ? 'సర్కిల్ లోపల ఫొటోను జరపడానికి డ్రాగ్ చేయండి. క్రింద జూమ్ స్లైడర్ ఉపయోగించండి.'
                  : 'Drag inside the circular frame to reposition. Use zoom slider below.'
                : lang === 'te'
                ? 'సర్కిల్‌పై క్లిక్ చేసి లేదా క్రింది బటన్లతో ఫొటోను ఎంచుకోండి.'
                : 'Click inside the circle or use the buttons below to select your photo.'}
            </p>

          </div>

          {/* Column 2: Controls & Actions */}
          <div className="lg:col-span-6 flex flex-col gap-5 text-left">
            
            {/* Control Panel Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-elevated">
              
              <h3 className="text-lg sm:text-xl font-extrabold text-navy mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-civicGreen" />
                <span>{lang === 'te' ? 'పోస్టర్ కంట్రోల్స్' : 'Poster Controls'}</span>
              </h3>

              {/* Step 1: Upload or Camera Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-civicBlue hover:bg-civicBlue-dark text-white font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <Upload className="w-4 h-4" />
                  <span>
                    {userImage
                      ? lang === 'te'
                        ? 'ఫొటో మార్చండి'
                        : 'Change Photo'
                      : lang === 'te'
                      ? 'ఫొటో అప్లోడ్ చేయండి'
                      : 'Upload Photo'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => startCamera('user')}
                  className="inline-flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-sm shadow-sm transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <Camera className="w-4 h-4 text-emerald-400" />
                  <span>{lang === 'te' ? 'కెమెరాతో ఫొటో తీసుకోండి' : 'Take Photo with Camera'}</span>
                </button>
              </div>

              {/* Step 2: Photo Adjustment Controls (Active when photo is loaded) */}
              {userImage ? (
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 mb-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <ZoomIn className="w-4 h-4 text-civicBlue" />
                      <span>{lang === 'te' ? 'జూమ్ సర్దుబాటు' : 'Zoom Level'}</span>
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {zoom.toFixed(2)}x
                    </span>
                  </div>

                  {/* Zoom Slider */}
                  <div className="flex items-center gap-3">
                    <ZoomOut className="w-4 h-4 text-slate-500 shrink-0" />
                    <input
                      type="range"
                      min="1"
                      max="3"
                      step="0.02"
                      value={zoom}
                      onChange={(e) => setZoom(parseFloat(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-civicGreen"
                      aria-label="Zoom photo"
                    />
                    <ZoomIn className="w-4 h-4 text-slate-500 shrink-0" />
                  </div>

                  {/* Reset Position Button */}
                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-navy px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{lang === 'te' ? 'రీసెట్' : 'Reset Position'}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5 mb-5">
                  <AlertCircle className="w-4 h-4 text-civicBlue shrink-0 mt-0.5" />
                  <span>
                    {lang === 'te'
                      ? 'మొదట మీ ఫొటోను అప్‌లోడ్ చేయండి లేదా కెమెరాతో తీసుకోండి. ఆ తర్వాత జూమ్ మరియు క్రాప్ సర్దుబాట్లు చేయవచ్చు.'
                      : 'Please upload a photo or take one with your camera. You can then adjust positioning and zoom.'}
                  </span>
                </div>
              )}

              {/* Status Messages */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Step 3: Main Download Button */}
              <button
                type="button"
                disabled={!userImage || isExporting}
                onClick={handleDownload}
                className={`w-full py-4 px-6 rounded-2xl font-extrabold text-base flex items-center justify-center gap-3 shadow-lg transition-all duration-200 ${
                  userImage && !isExporting
                    ? 'bg-civicGreen hover:bg-civicGreen-dark text-white cursor-pointer hover:scale-[1.01] active:scale-[0.99] shadow-glow-green'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-300/60'
                }`}
              >
                {isExporting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin text-white" />
                    <span>{lang === 'te' ? 'పోస్టర్ తయారవుతోంది...' : 'Generating 1080p Poster...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>{lang === 'te' ? 'మీ పోస్టర్ను డౌన్లోడ్ చేసుకోండి' : 'Download Your Poster (1080p)'}</span>
                  </>
                )}
              </button>

              {/* Privacy Assurance Note */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-civicGreen shrink-0" />
                <span>
                  {lang === 'te'
                    ? 'మీ ఫొటో మీ డివైస్లోనే ప్రాసెస్ అవుతుంది. సర్వర్లో సేవ్ చేయబడదు.'
                    : 'Your photo is processed locally on your device and is never uploaded or saved to our servers.'}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Live Camera Capture Modal */}
      {isCameraOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-5 sm:p-6 max-w-md w-full text-white shadow-2xl flex flex-col items-center">
            
            <div className="w-full flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-400" />
                <span>{lang === 'te' ? 'కెమెరా' : 'Camera'}</span>
              </h4>
              <button
                type="button"
                onClick={stopCamera}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video stream container with circular guide */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-black border border-slate-800 flex items-center justify-center">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${
                  cameraFacing === 'user' ? 'scale-x-[-1]' : ''
                }`}
              />

              {/* Circular framing overlay guide */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="w-64 h-64 rounded-full border-2 border-emerald-400/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] flex items-center justify-center">
                  <span className="text-[10px] text-white/70 font-semibold bg-black/40 px-2 py-0.5 rounded">
                    {lang === 'te' ? 'మీ ముఖాన్ని సర్కిల్‌లో ఉంచండి' : 'Fit face in circle'}
                  </span>
                </div>
              </div>
            </div>

            {/* Camera Actions */}
            <div className="flex items-center justify-between w-full mt-5 gap-3">
              <button
                type="button"
                onClick={toggleCameraFacing}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors flex items-center gap-1.5"
                title="Switch Camera"
              >
                <RefreshCw className="w-4 h-4" />
                <span>{lang === 'te' ? 'ఫ్లిప్' : 'Flip'}</span>
              </button>

              <button
                type="button"
                onClick={capturePhoto}
                className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
              >
                <Camera className="w-5 h-5" />
                <span>{lang === 'te' ? 'ఫొటో తీయండి' : 'Capture'}</span>
              </button>

              <button
                type="button"
                onClick={stopCamera}
                className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors"
              >
                {lang === 'te' ? 'రద్దు' : 'Cancel'}
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
