import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { 
  MousePointer2, 
  Square, 
  Type, 
  PenTool, 
  Hand, 
  Layout, 
  Layers,
  Search,
  Plus,
  Briefcase,
  GraduationCap,
  Sparkles,
  Command,
  ChevronDown,
  Move,
  GripVertical,
  Trash2,
  Undo2
} from "lucide-react";
import { cn } from "../lib/utils";

// --- DRAWING COLORS ---
const DRAW_COLORS = [
  { name: "Cyan", value: "#06b6d4" },
  { name: "Emerald", value: "#10b981" },
  { name: "Slate", value: "#334155" },
  { name: "Rose", value: "#f43f5e" },
  { name: "Amber", value: "#f59e0b" },
];

// --- TOOLBAR COMPONENT ---
const Toolbar = ({ activeTool, onToolChange, drawColor, onColorChange, onClear, onUndo, hasDrawing }) => {
  const tools = [
    { icon: <MousePointer2 className="w-4 h-4" />, name: "Select", label: "Select — drag frames" },
    { icon: <Hand className="w-4 h-4" />, name: "Hand", label: "Hand tool" },
    { icon: <Square className="w-4 h-4" />, name: "Frame", label: "Frame — draw rectangles" },
    { icon: <PenTool className="w-4 h-4" />, name: "Pen", label: "Pen — freehand draw" },
    { icon: <Type className="w-4 h-4" />, name: "Text", label: "Text — click to type" },
    { icon: <Layout className="w-4 h-4" />, name: "Section", label: "Section tool" },
  ];

  const isDrawTool = activeTool === "Pen" || activeTool === "Frame" || activeTool === "Text";

  const toolButtonVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.05,
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }
    }),
    hover: { scale: 1.1, backgroundColor: "rgba(241, 245, 249, 0.5)" }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      whileHover={{ y: -2 }}
      className="absolute top-4 md:top-6 left-1/2 -ml-[130px] md:-ml-[145px] z-30 flex items-center gap-1 p-1 glass-premium rounded-xl shadow-liquid border border-slate-200/50 scale-90 md:scale-100"
      style={{
        animation: "float-liquid 6s ease-in-out infinite"
      }}
    >
      {tools.map((tool, i) => (
        <motion.button
          key={tool.name}
          custom={i}
          variants={toolButtonVariants}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          aria-label={tool.label}
          title={tool.label}
          onClick={() => onToolChange(tool.name)}
          className={cn(
            "p-1.5 md:p-2 rounded-lg transition-colors cursor-pointer",
            activeTool === tool.name ? "bg-cyan-500/15 text-cyan-600 shadow-sm ring-1 ring-cyan-500/20" : "text-slate-500"
          )}
        >
          {tool.icon}
        </motion.button>
      ))}
      
      <div className="w-px h-6 bg-slate-200 mx-1" />

      {/* Color picker + actions — visible when any draw tool is active */}
      <AnimatePresence>
        {isDrawTool && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="flex items-center gap-1.5 overflow-hidden px-1"
          >
            {DRAW_COLORS.map((color) => (
              <button
                key={color.name}
                aria-label={`Color: ${color.name}`}
                title={color.name}
                onClick={() => onColorChange(color.value)}
                className={cn(
                  "w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-200 shrink-0 cursor-pointer",
                  drawColor === color.value 
                    ? "ring-2 ring-offset-1 ring-cyan-400 scale-110" 
                    : "hover:scale-125 opacity-70 hover:opacity-100"
                )}
                style={{ backgroundColor: color.value }}
              />
            ))}
            <div className="w-px h-4 bg-slate-200 mx-0.5" />
            <motion.button 
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Undo" 
              title="Undo"
              onClick={onUndo}
              className="p-1 text-slate-400 hover:text-cyan-600 transition-colors cursor-pointer"
            >
              <Undo2 className="w-3 h-3" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 10 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Clear all" 
              title="Clear canvas"
              onClick={onClear}
              className={cn(
                "p-1 transition-colors cursor-pointer",
                hasDrawing ? "text-rose-400 hover:text-rose-600" : "text-slate-300"
              )}
            >
              <Trash2 className="w-3 h-3" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ rotate: 15 }}
        aria-label="Toggle layers" 
        className="p-1.5 md:p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
      >
        <Layers className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
};

// --- TOOL HINT TOAST ---
const ToolHint = ({ show, text, icon: Icon }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.9 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
        className="absolute top-20 md:top-24 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg pointer-events-none"
      >
        {Icon && <Icon className="w-3 h-3" />}
        {text}
      </motion.div>
    )}
  </AnimatePresence>
);

// --- DRAG HINT COMPONENT ---
const DragHint = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="absolute -top-10 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg backdrop-blur-sm whitespace-nowrap pointer-events-none"
      >
        <Move className="w-3 h-3 animate-pulse" />
        Drag to move
      </motion.div>
    )}
  </AnimatePresence>
);

// --- TEXT INPUT OVERLAY ---
const TextInput = ({ position, color, onSubmit, onCancel }) => {
  const inputRef = useRef(null);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = () => {
    if (value.trim()) {
      onSubmit(value.trim());
    } else {
      onCancel();
    }
  };

  return (
    <div 
      className="absolute z-50"
      style={{ left: position.cssX, top: position.cssY }}
    >
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSubmit();
          if (e.key === "Escape") onCancel();
        }}
        onBlur={handleSubmit}
        placeholder="Type here..."
        className="bg-transparent border-b-2 border-dashed outline-none font-display font-bold text-sm md:text-base px-1 py-0.5 min-w-[120px]"
        style={{ color, borderColor: color }}
      />
    </div>
  );
};

// --- FRAME ENTRANCE ANIMATION VARIANTS ---
const frameVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(8px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.23, 1, 0.32, 1],
    },
  }),
};

const toolbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: 0.1, ease: [0.23, 1, 0.32, 1] },
  },
};

const hudVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: 0.6 + i * 0.1 },
  }),
};

// --- BENTO FRAME COMPONENTS ---

const ProfileFrame = ({ personal, containerRef, onDrag, canDrag }) => {
  const [hovered, setHovered] = useState(false);
  const [dragged, setDragged] = useState(false);

  return (
    <motion.div
      custom={0}
      variants={frameVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      drag={canDrag}
      dragConstraints={containerRef}
      dragElastic={0.1}
      onDragStart={() => { setDragged(true); onDrag?.(); }}
      whileDrag={{ scale: 1.02, zIndex: 50, boxShadow: "0 0 0 2px white, 0 0 0 4px #06b6d4" }}
      whileTap={canDrag ? { scale: 1.02, zIndex: 50, boxShadow: "0 0 0 2px white, 0 0 0 4px #06b6d4" } : {}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ touchAction: "pan-y" }}
      className={cn(
        "glass-premium relative p-6 rounded-[2rem] w-full max-w-[450px] shadow-node border border-white/80 group active:selection-ring transition-shadow",
        canDrag ? "cursor-grab active:cursor-grabbing hover:shadow-liquid" : "cursor-default"
      )}
      animate={canDrag ? {
        y: [0, -5, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1
        }
      } : { y: 0 }}
    >
      <div className={cn(
        "absolute top-3 right-3 p-1 rounded-md transition-all duration-300",
        hovered && !dragged && canDrag ? "opacity-100 text-slate-400" : "opacity-0"
      )}>
        <GripVertical className="w-4 h-4" />
      </div>
      {canDrag && <DragHint show={hovered && !dragged} />}

      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500 flex items-center justify-center border border-cyan-500/20 shadow-lg pr-0.5">
          <span className="text-xl font-black text-white">IF</span>
        </div>
        <div>
          <h3 className="text-lg font-display font-bold text-slate-900 leading-tight">{personal.name}</h3>
          <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-[0.2em] mt-0.5">{personal.roles.join(" & ")}</p>
        </div>
      </div>
      <p className="text-sm text-slate-600 font-medium leading-relaxed opacity-90 italic">
        "{personal.who_is_irfan}"
      </p>
      <div className="mt-6 flex gap-2">
         {["Creative", "Systematic", "Scaled"].map(tag => (
           <span key={tag} className="text-[9px] font-bold py-1 px-3 bg-slate-50 text-slate-400 rounded-full border border-slate-100 uppercase tracking-widest">{tag}</span>
         ))}
      </div>
    </motion.div>
  );
};

const JourneyFrame = ({ journey, containerRef, onDrag, canDrag }) => {
  const [hovered, setHovered] = useState(false);
  const [dragged, setDragged] = useState(false);

  return (
    <motion.div
      custom={2}
      variants={frameVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      drag={canDrag}
      dragConstraints={containerRef}
      dragElastic={0.1}
      onDragStart={() => { setDragged(true); onDrag?.(); }}
      whileDrag={{ scale: 1.02, zIndex: 50, boxShadow: "0 0 0 2px white, 0 0 0 4px #06b6d4" }}
      whileTap={canDrag ? { scale: 1.02, zIndex: 50, boxShadow: "0 0 0 2px white, 0 0 0 4px #06b6d4" } : {}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ touchAction: "pan-y" }}
      className={cn(
        "glass-premium relative p-8 rounded-[2.5rem] w-full max-w-[420px] shadow-node border border-white/80 group active:selection-ring transition-shadow",
        canDrag ? "cursor-grab active:cursor-grabbing hover:shadow-liquid" : "cursor-default"
      )}
      animate={canDrag ? {
        y: [0, -5, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }
      } : { y: 0 }}
    >
      <div className={cn(
        "absolute top-4 right-4 p-1 rounded-md transition-all duration-300",
        hovered && !dragged && canDrag ? "opacity-100 text-slate-400" : "opacity-0"
      )}>
        <GripVertical className="w-4 h-4" />
      </div>
      {canDrag && <DragHint show={hovered && !dragged} />}

      <div className="flex items-center gap-2 mb-8">
        <GraduationCap className="w-5 h-5 text-cyan-500" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600">Career Journey</span>
      </div>
      <div className="space-y-8">
        {journey.map((item) => (
          <div key={item.id} className="relative pl-6 border-l-2 border-slate-100 flex flex-col gap-1">
            <div className="absolute top-0 left-0 -translate-x-1/2 w-2.5 h-2.5 bg-cyan-500 rounded-full border-2 border-white shadow-sm" />
            <h4 className="text-[13px] font-bold text-slate-900 leading-tight">{item.label}</h4>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.period}</p>
            <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-0.5">{item.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const ExperienceFrame = ({ experience, containerRef, onDrag, canDrag }) => {
  const [hovered, setHovered] = useState(false);
  const [dragged, setDragged] = useState(false);

  return (
    <motion.div
      custom={1}
      variants={frameVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      drag={canDrag}
      dragConstraints={containerRef}
      dragElastic={0.1}
      onDragStart={() => { setDragged(true); onDrag?.(); }}
      whileDrag={{ scale: 1.02, zIndex: 50, boxShadow: "0 0 0 2px white, 0 0 0 4px #06b6d4" }}
      whileTap={canDrag ? { scale: 1.02, zIndex: 50, boxShadow: "0 0 0 2px white, 0 0 0 4px #06b6d4" } : {}}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ touchAction: "pan-y" }}
      className={cn(
        "glass-premium relative p-8 rounded-[2.5rem] w-full max-w-[420px] shadow-node border border-white/80 group active:selection-ring transition-shadow",
        canDrag ? "cursor-grab active:cursor-grabbing hover:shadow-liquid" : "cursor-default"
      )}
      animate={canDrag ? {
        y: [0, -5, 0],
        transition: {
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }
      } : { y: 0 }}
    >
      <div className={cn(
        "absolute top-4 right-4 p-1 rounded-md transition-all duration-300",
        hovered && !dragged && canDrag ? "opacity-100 text-slate-400" : "opacity-0"
      )}>
        <GripVertical className="w-4 h-4" />
      </div>
      {canDrag && <DragHint show={hovered && !dragged} />}

      <div className="flex items-center gap-2 mb-8">
        <Briefcase className="w-5 h-5 text-cyan-600" />
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-600">Experience</span>
      </div>
      <div className="space-y-8">
        {experience.map((item) => (
          <div key={item.id} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <h4 className="text-md font-display font-bold text-slate-900">{item.title}</h4>
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/10" />
            </div>
            <p className="text-[12px] text-slate-500 font-medium leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// --- MAIN CANVAS COMPONENT ---

const AboutCanvas = ({ journey, experience_projects, personal }) => {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const drawCanvasRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeTool, setActiveTool] = useState("Select");
  const [drawColor, setDrawColor] = useState(DRAW_COLORS[0].value);

  // Drawing state — stored in refs for stable callbacks + state for UI
  const strokesRef = useRef([]);
  const [strokeCount, setStrokeCount] = useState(0);
  const currentStrokeRef = useRef(null);
  const isMouseDownRef = useRef(false);
  const frameStartRef = useRef(null); // For Frame tool
  const lastDimsRef = useRef({ w: 0, h: 0 });

  // Text placement
  const [textInput, setTextInput] = useState(null); // { canvasX, canvasY, cssX, cssY }

  const [toolHint, setToolHint] = useState(null);

  const isPenActive = activeTool === "Pen";
  const isFrameActive = activeTool === "Frame";
  const isTextActive = activeTool === "Text";
  const isDrawMode = isPenActive || isFrameActive || isTextActive;
  const canDrag = activeTool === "Select" || activeTool === "Hand";

  // --- Canvas helpers ---
  const getPos = useCallback((e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY,
      cssX: clientX - rect.left,
      cssY: clientY - rect.top,
    };
  }, []);

  const redrawAll = useCallback((ctx, canvas, allStrokes) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    allStrokes.forEach((stroke) => {
      ctx.globalAlpha = 0.85;
      if (stroke.type === "pen") {
        if (stroke.points.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          const prev = stroke.points[i - 1];
          const curr = stroke.points[i];
          const midX = (prev.x + curr.x) / 2;
          const midY = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
        }
        ctx.stroke();
      } else if (stroke.type === "frame") {
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.width;
        ctx.lineJoin = "round";
        ctx.setLineDash([8, 4]);
        ctx.strokeRect(stroke.x, stroke.y, stroke.w, stroke.h);
        ctx.setLineDash([]);
        // Corner handles
        const handleSize = 6;
        ctx.fillStyle = stroke.color;
        [[stroke.x, stroke.y], [stroke.x + stroke.w, stroke.y], [stroke.x, stroke.y + stroke.h], [stroke.x + stroke.w, stroke.y + stroke.h]].forEach(([cx, cy]) => {
          ctx.fillRect(cx - handleSize / 2, cy - handleSize / 2, handleSize, handleSize);
        });
      } else if (stroke.type === "text") {
        ctx.fillStyle = stroke.color;
        ctx.font = `bold ${stroke.fontSize || 28}px "Outfit", sans-serif`;
        ctx.fillText(stroke.text, stroke.x, stroke.y);
      }
      ctx.globalAlpha = 1;
    });
  }, []);

  // --- Resize canvas ---
  useEffect(() => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const handleResize = () => {
      const rect = parent.getBoundingClientRect();
      const newW = Math.round(rect.width * 2);
      const newH = Math.round(rect.height * 2);
      if (lastDimsRef.current.w === newW && lastDimsRef.current.h === newH) return;
      lastDimsRef.current = { w: newW, h: newH };
      canvas.width = newW;
      canvas.height = newH;
      const ctx = canvas.getContext("2d");
      redrawAll(ctx, canvas, strokesRef.current);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(parent);
    // Initial size
    handleResize();
    return () => resizeObserver.disconnect();
  }, [redrawAll]);

  // --- Mouse/Touch handlers ---
  const handlePointerDown = useCallback((e) => {
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const pos = getPos(e, canvas);

    if (isTextActive) {
      setTextInput({ canvasX: pos.x, canvasY: pos.y, cssX: pos.cssX, cssY: pos.cssY });
      return;
    }

    isMouseDownRef.current = true;

    if (isPenActive) {
      currentStrokeRef.current = { type: "pen", points: [pos], color: drawColor, width: 3 };
    } else if (isFrameActive) {
      frameStartRef.current = pos;
      currentStrokeRef.current = { type: "frame", x: pos.x, y: pos.y, w: 0, h: 0, color: drawColor, width: 2 };
    }
  }, [isPenActive, isFrameActive, isTextActive, drawColor, getPos]);

  const handlePointerMove = useCallback((e) => {
    if (!isMouseDownRef.current || !currentStrokeRef.current) return;
    const canvas = drawCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const pos = getPos(e, canvas);

    if (currentStrokeRef.current.type === "pen") {
      currentStrokeRef.current.points.push(pos);
    } else if (currentStrokeRef.current.type === "frame") {
      const start = frameStartRef.current;
      currentStrokeRef.current.x = Math.min(start.x, pos.x);
      currentStrokeRef.current.y = Math.min(start.y, pos.y);
      currentStrokeRef.current.w = Math.abs(pos.x - start.x);
      currentStrokeRef.current.h = Math.abs(pos.y - start.y);
    }

    // Redraw everything + current in-progress stroke
    redrawAll(ctx, canvas, strokesRef.current);
    // Draw in-progress
    const s = currentStrokeRef.current;
    ctx.globalAlpha = 0.85;
    if (s.type === "pen" && s.points.length >= 2) {
      ctx.beginPath();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.moveTo(s.points[0].x, s.points[0].y);
      for (let i = 1; i < s.points.length; i++) {
        const prev = s.points[i - 1];
        const curr = s.points[i];
        ctx.quadraticCurveTo(prev.x, prev.y, (prev.x + curr.x) / 2, (prev.y + curr.y) / 2);
      }
      ctx.stroke();
    } else if (s.type === "frame" && s.w > 0 && s.h > 0) {
      ctx.strokeStyle = s.color;
      ctx.lineWidth = s.width;
      ctx.setLineDash([8, 4]);
      ctx.strokeRect(s.x, s.y, s.w, s.h);
      ctx.setLineDash([]);
      const hs = 6;
      ctx.fillStyle = s.color;
      [[s.x, s.y], [s.x + s.w, s.y], [s.x, s.y + s.h], [s.x + s.w, s.y + s.h]].forEach(([cx, cy]) => {
        ctx.fillRect(cx - hs / 2, cy - hs / 2, hs, hs);
      });
    }
    ctx.globalAlpha = 1;
  }, [getPos, redrawAll]);

  const handlePointerUp = useCallback(() => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    const s = currentStrokeRef.current;
    if (!s) return;

    let valid = false;
    if (s.type === "pen" && s.points.length > 1) valid = true;
    if (s.type === "frame" && s.w > 5 && s.h > 5) valid = true;

    if (valid) {
      strokesRef.current = [...strokesRef.current, { ...s }];
      setStrokeCount(strokesRef.current.length);
    }
    currentStrokeRef.current = null;
    frameStartRef.current = null;
  }, []);

  // --- Text submit ---
  const handleTextSubmit = useCallback((text) => {
    if (!textInput) return;
    const stroke = {
      type: "text",
      text,
      x: textInput.canvasX,
      y: textInput.canvasY,
      color: drawColor,
      fontSize: 28,
    };
    strokesRef.current = [...strokesRef.current, stroke];
    setStrokeCount(strokesRef.current.length);
    setTextInput(null);
    // Redraw
    const canvas = drawCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      redrawAll(ctx, canvas, strokesRef.current);
    }
  }, [textInput, drawColor, redrawAll]);

  // --- Undo / Clear ---
  const handleUndo = useCallback(() => {
    strokesRef.current = strokesRef.current.slice(0, -1);
    setStrokeCount(strokesRef.current.length);
    const canvas = drawCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      redrawAll(ctx, canvas, strokesRef.current);
    }
  }, [redrawAll]);

  const handleClear = useCallback(() => {
    strokesRef.current = [];
    setStrokeCount(0);
    const canvas = drawCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, []);

  // Auto-dismiss drag hint after 6 seconds in view
  useEffect(() => {
    if (isInView && !hasInteracted) {
      const timer = setTimeout(() => setHasInteracted(true), 6000);
      return () => clearTimeout(timer);
    }
  }, [isInView, hasInteracted]);

  // Show tool hint when switching to draw tools
  useEffect(() => {
    const hints = {
      Pen: "Freehand draw!",
      Frame: "Drag to create a frame!",
      Text: "Click to place text!",
    };
    if (hints[activeTool]) {
      setToolHint(hints[activeTool]);
      const timer = setTimeout(() => setToolHint(null), 2000);
      return () => clearTimeout(timer);
    } else {
      setToolHint(null);
    }
  }, [activeTool]);

  const handleDrag = () => setHasInteracted(true);

  const cursorClass = isPenActive ? "cursor-crosshair" : isFrameActive ? "cursor-crosshair" : isTextActive ? "cursor-text" : activeTool === "Hand" ? "cursor-grab" : "cursor-default";


  return (
    <section aria-label="About me" id="about" ref={sectionRef} className="relative py-20 bg-white">
      <motion.div 
        className="container mx-auto px-6 mb-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      >
         <span className="text-cyan-600 font-bold tracking-[0.2em] text-xs uppercase mb-4 flex items-center justify-center gap-2">
           Workspace Archive
           <span className="relative flex h-2 w-2">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
           </span>
         </span>
         <h2 className="text-4xl md:text-5xl font-display font-bold text-slate-900 leading-[1.1]">
           My Creative <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-500">Journeys.</span>
         </h2>
      </motion.div>

      <div className="container mx-auto px-4 lg:px-12">
        <motion.div 
          className="relative min-h-[600px] md:min-h-[750px] h-auto w-full border border-slate-200/60 rounded-[2rem] md:rounded-[3rem] bg-white canvas-dot-grid p-4 md:p-8 shadow-sm transition-all overflow-visible"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.9, ease: [0.23, 1, 0.32, 1] }}
        >
          {/* Internal Canvas Surface */}
          <div ref={containerRef} className="relative w-full h-full p-4 lg:p-20 overflow-visible flex flex-col items-center">
            
            <motion.div
              variants={toolbarVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Toolbar 
                activeTool={activeTool} 
                onToolChange={setActiveTool}
                drawColor={drawColor}
                onColorChange={setDrawColor}
                onClear={handleClear}
                onUndo={handleUndo}
                hasDrawing={strokeCount > 0}
              />
            </motion.div>

            {/* Tool hint toast */}
            <ToolHint 
              show={!!toolHint} 
              text={toolHint} 
              icon={isPenActive ? PenTool : isFrameActive ? Square : isTextActive ? Type : null} 
            />

            {/* DRAWING CANVAS OVERLAY */}
            <canvas
              ref={drawCanvasRef}
              className={cn(
                "absolute inset-0 w-full h-full rounded-[2rem] md:rounded-[3rem] z-20 pointer-events-auto",
                cursorClass
              )}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}

              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={(e) => { if (isDrawMode) { e.preventDefault(); handlePointerDown(e); } }}
              onTouchMove={(e) => { if (isDrawMode) { e.preventDefault(); handlePointerMove(e); } }}
              onTouchEnd={handlePointerUp}
            />

            {/* Text input overlay */}
            {textInput && (
              <TextInput 
                position={textInput} 
                color={drawColor} 
                onSubmit={handleTextSubmit} 
                onCancel={() => setTextInput(null)} 
              />
            )}

            {/* STRUCTURED GRID LAYOUT ON CANVAS */}
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 max-w-7xl w-full h-fit mt-20 md:mt-24 pb-12 md:pb-20">
              {/* Left Column: About + Experience */}
              <div className="flex flex-col gap-10 lg:gap-16 items-center lg:items-start">
                <ProfileFrame personal={personal} containerRef={containerRef} onDrag={handleDrag} canDrag={canDrag} />
                <ExperienceFrame experience={experience_projects} containerRef={containerRef} onDrag={handleDrag} canDrag={canDrag} />
              </div>

              {/* Right Column: Journey */}
              <div className="flex justify-center lg:justify-end">
                <JourneyFrame journey={journey} containerRef={containerRef} onDrag={handleDrag} canDrag={canDrag} />
              </div>
            </div>

             {/* UI HUD DECORATIONS */}
            <motion.div 
              custom={0}
              variants={hudVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute top-6 left-6 md:top-8 md:left-8 hidden sm:flex items-center gap-3"
            >
              <div className="glass-premium p-1.5 md:p-2 px-2.5 md:px-3 rounded-lg text-slate-500 border border-slate-100 flex items-center gap-2">
                <Command className="w-3.5 h-3.5" />
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-slate-900">About_v4</span>
              </div>
              <div className="glass-premium p-1.5 md:p-2 px-2.5 md:px-3 rounded-lg text-slate-400 border border-slate-100 flex items-center gap-2">
                <span className="text-[8px] md:text-[9px] font-bold uppercase tracking-widest text-slate-900">Artboard 1</span>
                <ChevronDown className="w-3 h-3" />
              </div>
            </motion.div>

            <motion.div 
              custom={1}
              variants={hudVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute bottom-6 left-6 md:bottom-10 md:right-10 hidden sm:flex items-center gap-4 md:gap-6 glass-premium p-2 md:p-2.5 px-4 md:px-5 rounded-xl md:rounded-2xl text-slate-400 text-[8px] md:text-[9px] font-bold uppercase tracking-widest"
            >
              <div className="flex items-center gap-3 md:gap-4">
                <button aria-label="Search canvas" className="p-1 hover:text-cyan-600 transition-colors"><Search className="w-3 h-3" /></button>
                <span className="text-cyan-600 font-black">100%</span>
                <button aria-label="Zoom in" className="p-1 hover:text-cyan-600 transition-colors"><Plus className="w-3 h-3" /></button>
              </div>
              <div className="w-px h-4 md:h-5 bg-slate-200" />
              <span className="flex items-center gap-2">
                <Layout className="w-3 h-3" /> 
                Live
              </span>
            </motion.div>
            
            <motion.div 
              custom={2}
              variants={hudVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute top-6 right-6 md:top-8 md:right-8 hidden xl:flex items-center gap-3 glass-premium p-2 px-3 rounded-lg text-slate-400 border border-slate-100"
            >
               <span className="text-[9px] font-bold uppercase tracking-widest">Published</span>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
            </motion.div>


          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCanvas;
