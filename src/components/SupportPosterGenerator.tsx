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

// Target export canvas dimensions (exact 1080x1080 square for highest quality social sharing)
const CANVAS_SIZE = 1080;

// Coordinates of the central circular opening in the official campaign frame:
// In 1024x1024: Center is (511, 448), Radius is 238
// Scaled to 1080x1080 (1080 / 1024 = 1.0546875):
// Center X = 511 * 1080 / 1024 = 539.0
// Center Y = 448 * 1080 / 1024 = 472.5
// Radius = 238 * 1080 / 1024 = 251.0 (Diameter = 502px)
const CIRCLE_CENTER_X = 539;
const CIRCLE_CENTER_Y = 473;
const CIRCLE_RADIUS = 251;

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

  // Pre-loaded official campaign poster frame asset
  const frameImageRef = useRef<HTMLImageElement | null>(null);

  // Pre-load the official campaign poster frame
  useEffect(() => {
    const frameImg = new Image();
    frameImg.crossOrigin = 'anonymous';
    // Use the transparent-window PNG version of the official frame uploaded by user
    frameImg.src = '/images/official-campaign-poster-frame.png';
    frameImg.onload = () => {
      frameImageRef.current = frameImg;
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

      // 2. Base Background underneath user photo
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

      // 3. User Photo Layer (Clipped to the circular frame opening)
      ctx.save();
      ctx.beginPath();
      ctx.arc(CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS + 2, 0, Math.PI * 2);
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
        ctx.fillStyle = '#0f2a5a';
        ctx.fillRect(
          CIRCLE_CENTER_X - CIRCLE_RADIUS,
          CIRCLE_CENTER_Y - CIRCLE_RADIUS,
          CIRCLE_RADIUS * 2,
          CIRCLE_RADIUS * 2
        );

        // Circular dashed guide
        ctx.strokeStyle = 'rgba(52, 211, 153, 0.7)';
        ctx.lineWidth = 3;
        ctx.setLineDash([12, 10]);
        ctx.beginPath();
        ctx.arc(CIRCLE_CENTER_X, CIRCLE_CENTER_Y, CIRCLE_RADIUS - 18, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        // Camera Icon
        ctx.fillStyle = '#34d399';
        const iconY = CIRCLE_CENTER_Y - 40;
        ctx.beginPath();
        ctx.roundRect(CIRCLE_CENTER_X - 44, iconY - 26, 88, 62, 12);
        ctx.fill();
        ctx.beginPath();
        ctx.roundRect(CIRCLE_CENTER_X - 20, iconY - 40, 40, 18, 5);
        ctx.fill();
        ctx.fillStyle = '#0f2a5a';
        ctx.beginPath();
        ctx.arc(CIRCLE_CENTER_X, iconY + 5, 22, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#34d399';
        ctx.beginPath();
        ctx.arc(CIRCLE_CENTER_X, iconY + 5, 12, 0, Math.PI * 2);
        ctx.fill();

        // Placeholder Text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#ffffff';
        ctx.font = '700 24px "Noto Sans Telugu", Poppins, sans-serif';
        ctx.fillText('మీ ఫొటోను ఇక్కడ జోడించండి', CIRCLE_CENTER_X, CIRCLE_CENTER_Y + 46);

        ctx.fillStyle = '#94b5f0';
        ctx.font = '500 16px Poppins, sans-serif';
        ctx.fillText('Click to Upload / Take Photo', CIRCLE_CENTER_X, CIRCLE_CENTER_Y + 78);
      }
      ctx.restore();

      // 4. Draw Official Campaign Poster Frame on TOP
      // The frame already has the full artwork:
      // - "VOTE FOR CHANGE" with YSRCP flag
      // - "మన ప్రొద్దుటూరు — మన బాధ్యత"
      // - Sri Poreddy Narasimha Reddy on the left
      // - Sri Y.S. Jagan Mohan Reddy on the right
      // - Official YSRCP fan logo badge at the bottom of the circle
      // - "VOTE FOR POREDDY NARASIMHA REDDY"
      // - "శ్రీ పోరెడ్డి నరసింహారెడ్డి — ప్రొద్దుటూరు మున్సిపల్ చైర్మన్ అభ్యర్థి"
      // - "★ మార్పు కోసం పోరెడ్డి గారికే నా మద్దతు ★"
      // - "voteforporeddynarasimhareddy.com"
      if (frameImageRef.current) {
        ctx.drawImage(frameImageRef.current, 0, 0, CANVAS_SIZE, CANVAS_SIZE);
      }
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
            ? 'ఫొటో విజయవంతంగా జోడించబడింది! జూమ్ మరియు స్థానాన్ని సర్దుబాటు చేయవచ్చు.'
            : 'Photo added! You can now adjust zoom and position.'
        );
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Drag and Reposition Handlers (Mouse & Touch)
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
      console.error('Camera access error:', err);
      setErrorMessage(
        lang === 'te'
          ? 'కెమెరా తెరవడంలో సమస్య ఏర్పడింది. దయచేసి బ్రౌజర్ అనుమతులను తనిఖీ చేయండి లేదా ఫొటో అప్‌లోడ్ ఆప్షన్ ఉపయోగించండి.'
          : 'Could not access camera. Please check permissions or use photo upload.'
      );
      fileInputRef.current?.click();
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
    tempCanvas.width = video.videoWidth || 720;
    tempCanvas.height = video.videoHeight || 720;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    if (cameraFacing === 'user') {
      ctx.translate(tempCanvas.width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, tempCanvas.width, tempCanvas.height);
    const dataUrl = tempCanvas.toDataURL('image/png');

    const img = new Image();
    img.onload = () => {
      setUserImage(img);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      stopCamera();
      setSuccessMessage(
        lang === 'te'
          ? 'కెమెరా ద్వారా ఫొటో విజయవంతంగా తీయబడింది!'
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
      // Ensure canvas is drawn in export mode
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
          drawCanvas(false);
          return;
        } catch {
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
                      ? 'ఫొటో అప్‌లోడ్ చేయండి'
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
                    <span>{lang === 'te' ? 'మీ పోస్టర్‌ను డౌన్‌లోడ్ చేసుకోండి' : 'Download Your Poster (1080p)'}</span>
                  </>
                )}
              </button>

              {/* Privacy Assurance Note */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-civicGreen shrink-0" />
                <span>
                  {lang === 'te'
                    ? 'మీ ఫొటో మీ డివైస్‌లోనే ప్రాసెస్ అవుతుంది. సర్వర్లో సేవ్ చేయబడదు.'
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
