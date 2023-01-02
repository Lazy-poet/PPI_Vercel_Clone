import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

interface SignatureCanvasProps {
    sendRef: (result: string) => void;
    reset: boolean;
    debounceReset: Dispatch<SetStateAction<boolean>>;
}

const SignatureCanvas = ({
    sendRef,
    reset,
    debounceReset,
}: SignatureCanvasProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const [isDrawing, setIsDrawing] = useState<boolean>(false);

    const passRef = () => {
        if (!canvasRef.current) return;
        var toSave = canvasRef.current.toDataURL("image/png");
        sendRef(toSave);
    };

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;

        if (containerRef.current) {
            canvas.width = containerRef.current.offsetWidth;
            canvas.height = (containerRef.current.offsetWidth / 1.618) - 55;
        }

        canvas.style.borderTopLeftRadius = "0.5rem";
        canvas.style.borderTopRightRadius = "0.5rem";
        canvas.style.mixBlendMode = "exclusion";

        const context = canvas.getContext("2d");
        context!.scale(1, 1);
        context!.lineCap = "round";
        context!.lineJoin = "round";
        context!.strokeStyle = "white";
        context!.lineWidth = 1;

        contextRef.current = context;
    }, []);

    useEffect(() => {
        if (
            typeof window === "undefined" ||
            !containerRef.current ||
            !canvasRef.current
        )
            return;

        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, [containerRef.current]);

    useEffect(() => {
        if (reset) {
            clear();
            debounceReset(false);
        }
    }, [reset]);

    const handleResize = () => {
        if (!containerRef.current || !canvasRef.current) return;
        const canvas: HTMLCanvasElement = canvasRef.current;

        canvas.width = containerRef.current.offsetWidth;
        canvas.height = (containerRef.current.offsetWidth / 1.618) - 55;
        canvas.style.mixBlendMode = "normal";
        clear();
        if (reset) debounceReset(false);
    };

    const startDrawing = ({ nativeEvent }: any) => {
        if (!contextRef.current) return;
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);

        setIsDrawing(true);
    };

    const startDrawingMobile = (e: any) => {
        let currentTouch = e.touches[0];
        if (!contextRef.current) return;

        const rect = currentTouch.target.getBoundingClientRect();

        contextRef.current.beginPath();
        contextRef.current.moveTo(
            currentTouch.clientX - rect.left,
            currentTouch.clientY - rect.top
        );
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        if (!contextRef.current) return;
        if (!isDrawing) return;

        contextRef.current.closePath();
        setIsDrawing(false);

        passRef();
    };

    const draw = ({ nativeEvent }: any) => {
        if (isDrawing && contextRef.current) {
            const { offsetX, offsetY } = nativeEvent;

            contextRef.current.lineCap = "round";
            contextRef.current.lineWidth = 3;
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
    };

    const drawMobile = (e: any) => {
        if (isDrawing && contextRef.current) {
            let currentTouch = e.touches[0];

            const rect = currentTouch.target.getBoundingClientRect();

            contextRef.current.lineCap = "round";
            contextRef.current.lineWidth = 3;
            contextRef.current.lineTo(
                currentTouch.clientX - rect.left,
                currentTouch.clientY - rect.top
            );
            contextRef.current.stroke();
        }
    };

    const clear = () => {
        if (!contextRef.current || !canvasRef.current) return;

        contextRef.current.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
        );

        sendRef(null as any);
    };

    return (
        <div className="w-full" ref={containerRef}>
            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onTouchStart={startDrawingMobile}
                onMouseUp={finishDrawing}
                onTouchEnd={finishDrawing}
                onMouseMove={draw}
                onTouchMove={drawMobile}
                onMouseLeave={finishDrawing}
                // onTouchCancel={finishDrawing}
                style={{ touchAction: "none" }}
            />
        </div>
    );
};

export default SignatureCanvas;
